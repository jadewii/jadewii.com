import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Get customer email
      const email = session.customer_details?.email || session.customer_email;

      if (!email) {
        console.error('No email found in session');
        return NextResponse.json(
          { error: 'No customer email' },
          { status: 400 }
        );
      }

      // Get line items to determine what was purchased
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceIds = lineItems.data.map(item => item.price?.id).filter(Boolean);

      // Create JWT with purchase info
      const token = jwt.sign(
        {
          email,
          priceIds,
          sessionId: session.id,
          iat: Math.floor(Date.now() / 1000),
        },
        process.env.DOWNLOAD_JWT_SECRET,
        { expiresIn: '30d' }
      );

      // Build claim URL
      const claimUrl = `${process.env.SITE_URL}/api/claim?token=${token}`;

      // Send email with download link
      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Your JAde Wii Music Download',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
              h1 { color: #333; }
              .button { display: inline-block; padding: 15px 30px; background: #000; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Thank you for your purchase!</h1>
              <p>Your music is ready for download. Click the button below to access your files:</p>
              <a href="${claimUrl}" class="button">Download Your Music</a>
              <p>This link will be valid for 30 days. Once you click it, the download links will be available for 24 hours.</p>
              <div class="footer">
                <p>If you have any issues, please reply to this email.</p>
                <p>© JAde Wii</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log('Email sent to:', email);
    } catch (error) {
      console.error('Error processing webhook:', error);
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}