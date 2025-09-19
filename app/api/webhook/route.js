export async function POST(request) {
  // Dynamic imports to avoid build-time initialization
  const Stripe = (await import('stripe')).default;
  const jwt = (await import('jsonwebtoken')).default;
  const { Resend } = await import('resend');

  // Initialize services only when needed at runtime
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  const DOWNLOAD_JWT_SECRET = process.env.DOWNLOAD_JWT_SECRET;
  const SITE_URL = process.env.SITE_URL;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const EMAIL_FROM = process.env.EMAIL_FROM;

  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    return Response.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
  const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

  // Get raw body for Stripe signature verification
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return Response.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // prefer customer_details.email; fallback to customer_email
    const email = session.customer_details?.email || session.customer_email;
    if (!email) {
      // nothing to email—just acknowledge
      return Response.json({ received: true });
    }

    // which items did they buy?
    const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 20 });
    const priceIds = items.data
      .map((li) => li.price?.id)
      .filter(Boolean);

    // sign a magic token (30 days validity for re-claiming)
    const token = jwt.sign(
      { email, priceIds, iat: Math.floor(Date.now() / 1000) },
      DOWNLOAD_JWT_SECRET || 'fallback-secret-for-build',
      { expiresIn: '30d' }
    );

    const claimUrl = `${SITE_URL}/api/claim?token=${encodeURIComponent(token)}`;

    // send email only if resend is configured
    if (resend && EMAIL_FROM) {
      try {
        await resend.emails.send({
          from: EMAIL_FROM,
          to: email,
          subject: 'Your downloads are ready',
          html: `
            <p>Thanks for your purchase!</p>
            <p><a href="${claimUrl}">Get your downloads</a></p>
            <p>This link shows your files and generates fresh download links.</p>
          `,
        });
      } catch (emailError) {
        console.error('Email send failed:', emailError);
        // Don't fail the webhook if email fails
      }
    }
  }

  return Response.json({ received: true });
}