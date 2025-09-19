import jwt from 'jsonwebtoken';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Map Stripe Price IDs -> which private ZIP(s) to deliver
// Fill this with your real price IDs and S3 keys
const PRODUCT_MAP = {
  // Example mappings - replace with real Stripe price IDs
  // Albums
  'price_honey': ['albums/honey.zip'],
  'price_wabi_sabi': ['albums/wabi-sabi.zip'],
  'price_white_lotus': ['albums/white-lotus.zip'],
  'price_common_side_effects': ['albums/common-side-effects.zip'],
  'price_artificially_unfavored': ['albums/artificially-unfavored.zip'],
  'price_a_bit_of_red_in_the_blue': ['albums/a-bit-of-red-in-the-blue.zip'],
  'price_battle_of_wolves': ['albums/battle-of-wolves.zip'],
  'price_charlies_doomed_christmas': ['albums/charlies-doomed-christmas.zip'],
  'price_dan_da_damned': ['albums/dan-da-damned.zip'],
  'price_drone_sightings': ['albums/drone-sightings.zip'],
  'price_enlightened_ape': ['albums/enlightened-ape.zip'],
  'price_how_the_grinch_chilled_christmas': ['albums/how-the-grinch-chilled-christmas.zip'],
  'price_kame_house_session_one': ['albums/kame-house-session-one.zip'],

  // Drum Kits
  'price_boombap_drumbreaks_vol1': ['packs/boombap-drumbreaks-vol-1.zip'],

  // Add more mappings as you create Stripe products
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token') || '';

    const DOWNLOAD_JWT_SECRET = process.env.DOWNLOAD_JWT_SECRET || 'fallback-secret-for-build';
    const payload = jwt.verify(token, DOWNLOAD_JWT_SECRET);

    // collect S3 object keys for all purchased items
    const keys = new Set();
    for (const priceId of payload.priceIds) {
      (PRODUCT_MAP[priceId] || []).forEach((k) => keys.add(k));
    }

    if (!keys.size) {
      return new Response('No files found for this purchase.', { status: 404 });
    }

    // Only initialize S3 if we have credentials
    const AWS_REGION = process.env.AWS_REGION;
    const S3_BUCKET = process.env.S3_BUCKET;

    if (!AWS_REGION || !S3_BUCKET || !process.env.AWS_ACCESS_KEY_ID) {
      // Return a simple response if S3 is not configured
      return new Response(`
        <!doctype html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <title>Downloads Pending - JAde Wii</title>
          <style>
            body {
              font-family: system-ui, -apple-system, 'Segoe UI', Arial;
              background: white;
              padding: 40px 20px;
              max-width: 720px;
              margin: 0 auto;
            }
            h1 { font-size: 2.5rem; margin-bottom: 30px; font-weight: 300; }
            .info { padding: 20px; background: #f0f0f0; border-left: 4px solid #666; }
          </style>
        </head>
        <body>
          <h1>Downloads Pending Setup</h1>
          <div class="info">
            <p>Your purchase was successful! Download links will be available once file storage is configured.</p>
            <p>Please contact support if you don't receive your files within 24 hours.</p>
          </div>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    const s3 = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      endpoint: process.env.AWS_ENDPOINT,
    });

    // Generate 24h pre-signed URLs
    const urls = await Promise.all(
      [...keys].map(async (Key) => {
        const url = await getSignedUrl(
          s3,
          new GetObjectCommand({ Bucket: S3_BUCKET, Key }),
          { expiresIn: 60 * 60 * 24 } // 24 hours
        );
        return { name: Key.split('/').pop() || Key, url };
      })
    );

    // Clean HTML response matching site style
    const html = `
      <!doctype html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Your Downloads - JAde Wii</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: system-ui, -apple-system, 'Segoe UI', Arial;
            background: white;
            padding: 40px 20px;
            max-width: 720px;
            margin: 0 auto;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 30px;
            font-weight: 300;
          }
          .file {
            margin: 15px 0;
            padding: 20px;
            border: 1px solid #e5e5e5;
            background: #fafafa;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .file strong {
            font-size: 1.1rem;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #000;
            color: white;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: opacity 0.2s;
          }
          .btn:hover {
            opacity: 0.8;
          }
          .info {
            margin-top: 40px;
            padding: 20px;
            background: #f0f0f0;
            border-left: 4px solid #666;
          }
          .info p {
            color: #666;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <h1>Your Downloads</h1>
        ${urls.map(u => `
          <div class="file">
            <strong>${u.name}</strong>
            <a class="btn" href="${u.url}" download>Download</a>
          </div>
        `).join('')}
        <div class="info">
          <p>Links expire in 24 hours. You can re-open the email any time to generate fresh download links.</p>
          <p style="margin-top: 10px;">Having issues? Reply to your purchase email for support.</p>
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });

  } catch (e) {
    return new Response(
      'Link invalid or expired. Reply to your purchase email to get a fresh link.',
      { status: 401 }
    );
  }
}