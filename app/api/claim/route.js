import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { products } from '../../../lib/data/products';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response(createErrorPage('No token provided'), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.DOWNLOAD_JWT_SECRET);

    // Find products matching the price IDs
    const purchasedProducts = products.filter(product =>
      decoded.priceIds.includes(product.stripePriceId)
    );

    if (purchasedProducts.length === 0) {
      return new Response(createErrorPage('No downloads found for your purchase'), {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Generate pre-signed URLs (24 hours)
    const downloads = await Promise.all(
      purchasedProducts.map(async (product) => {
        if (!product.downloadFile) {
          return null;
        }

        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: product.downloadFile,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 86400 }); // 24 hours

        return {
          title: product.title,
          filename: `${product.title}.zip`,
          url
        };
      })
    );

    const validDownloads = downloads.filter(Boolean);

    // Return download page
    return new Response(createDownloadPage(decoded.email, validDownloads), {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Token verification error:', error);

    if (error.name === 'TokenExpiredError') {
      return new Response(createErrorPage('Your download link has expired'), {
        status: 401,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return new Response(createErrorPage('Invalid download link'), {
        status: 401,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return new Response(createErrorPage('Something went wrong. Please contact support.'), {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

function createDownloadPage(email, downloads) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Downloads - JAde Wii</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          padding: 40px 20px;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          font-weight: 300;
        }

        .email {
          color: #666;
          margin-bottom: 30px;
        }

        .info {
          background: #111;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          border-left: 4px solid #4CAF50;
        }

        .downloads {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .download-link {
          display: flex;
          align-items: center;
          padding: 20px;
          background: #111;
          border-radius: 8px;
          text-decoration: none;
          color: #fff;
          transition: background 0.2s;
        }

        .download-link:hover {
          background: #222;
        }

        .download-icon {
          margin-right: 15px;
          font-size: 1.5rem;
        }

        .download-title {
          flex: 1;
          font-size: 1.1rem;
        }

        .warning {
          margin-top: 30px;
          padding: 15px;
          background: #332200;
          border-radius: 8px;
          border: 1px solid #554400;
          font-size: 0.9rem;
          color: #ffcc00;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your Downloads</h1>
        <div class="email">For: ${email}</div>

        <div class="info">
          <p>✓ Your download links are ready!</p>
          <p style="margin-top: 10px; color: #999;">These links will expire in 24 hours.</p>
        </div>

        <div class="downloads">
          ${downloads.map(d => `
            <a href="${d.url}" class="download-link" download>
              <span class="download-icon">🎵</span>
              <span class="download-title">${d.title}</span>
            </a>
          `).join('')}
        </div>

        <div class="warning">
          ⚠️ Important: Save these files to your device. The download links will expire in 24 hours.
        </div>
      </div>
    </body>
    </html>
  `;
}

function createErrorPage(message) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error - JAde Wii</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .container {
          text-align: center;
          max-width: 500px;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #ff4444;
        }

        p {
          font-size: 1.1rem;
          color: #ccc;
          margin-bottom: 30px;
        }

        .home-link {
          display: inline-block;
          padding: 12px 30px;
          background: #fff;
          color: #000;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Error</h1>
        <p>${message}</p>
        <a href="/" class="home-link">Back to Shop</a>
      </div>
    </body>
    </html>
  `;
}