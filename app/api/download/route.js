import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import path from 'path'
import fs from 'fs'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get('id')
    const token = searchParams.get('token')

    // In production, verify the token is valid
    // This could check against a database of purchase records
    // For now, we'll do a simple check
    if (!token || !fileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Path to private downloads folder (NOT in public!)
    // In production, these would be on S3 or another secure storage
    const privatePath = path.join(process.cwd(), 'private-downloads', `${fileId}.zip`)

    // For now, fall back to public folder
    const publicPath = path.join(process.cwd(), 'public', 'downloads', `${fileId}.zip`)

    const filePath = fs.existsSync(privatePath) ? privatePath : publicPath

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const file = fs.readFileSync(filePath)

    return new NextResponse(file, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${fileId}.zip"`,
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}