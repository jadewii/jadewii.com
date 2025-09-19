import { NextResponse } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Initialize B2 client (S3 compatible)
const b2Client = new S3Client({
  endpoint: `https://s3.${process.env.B2_REGION || 'us-west-000'}.backblazeb2.com`,
  region: process.env.B2_REGION || 'us-west-000',
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APPLICATION_KEY,
  },
})

export async function POST(request) {
  try {
    const { albumId, sessionId } = await request.json()

    // Verify the session is valid (you'd check this against Stripe)
    if (!sessionId || !albumId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Map album ID to file path in B2
    const albumFiles = {
      'charlies-doomed-christmas': 'mixtapes/charlies-doomed-christmas.zip',
      'common-side-effects': 'mixtapes/common-side-effects.zip',
      'honey': 'mixtapes/honey.zip',
      'battle-of-wolves': 'mixtapes/battle-of-wolves.zip',
      'artificially-unfavored': 'mixtapes/artificially-unfavored.zip',
      'dan-da-damned': 'mixtapes/dan-da-damned.zip',
      'drone-sightings': 'mixtapes/drone-sightings.zip',
      'enlightened-ape': 'mixtapes/enlightened-ape.zip',
      'how-the-grinch-chilled-christmas': 'mixtapes/how-the-grinch-chilled-christmas.zip',
      'a-bit-of-red-in-the-blue': 'modular/a-bit-of-red-in-the-blue.zip',
      'white-lotus': 'modular/white-lotus.zip',
      'kame-house-session-one': 'modular/kame-house-session-one.zip',
      // Add all your albums here
    }

    const filePath = albumFiles[albumId]
    if (!filePath) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    // Generate a signed URL that expires in 24 hours
    const command = new GetObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: filePath,
    })

    const downloadUrl = await getSignedUrl(b2Client, command, {
      expiresIn: 86400, // 24 hours
    })

    return NextResponse.json({ downloadUrl })
  } catch (error) {
    console.error('Download generation error:', error)
    return NextResponse.json({ error: 'Failed to generate download' }, { status: 500 })
  }
}