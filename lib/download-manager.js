import crypto from 'crypto'

// Generate secure, time-limited download URLs
export function generateDownloadToken(productId, userEmail) {
  const expires = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  const data = `${productId}:${userEmail}:${expires}`

  const hash = crypto
    .createHmac('sha256', process.env.DOWNLOAD_SECRET_KEY || 'dev-secret')
    .update(data)
    .digest('hex')

  return {
    token: hash,
    expires,
    productId,
    userEmail
  }
}

export function verifyDownloadToken(token, productId, userEmail, expires) {
  // Check if token is expired
  if (Date.now() > expires) {
    return false
  }

  const data = `${productId}:${userEmail}:${expires}`
  const expectedHash = crypto
    .createHmac('sha256', process.env.DOWNLOAD_SECRET_KEY || 'dev-secret')
    .update(data)
    .digest('hex')

  return token === expectedHash
}

// Store purchase records (in production, use a database)
export const purchases = new Map()

export function recordPurchase(userEmail, productId, transactionId) {
  const purchaseRecord = {
    userEmail,
    productId,
    transactionId,
    purchasedAt: new Date().toISOString(),
    downloadCount: 0,
    maxDownloads: 5 // Limit downloads per purchase
  }

  const key = `${userEmail}:${productId}`
  purchases.set(key, purchaseRecord)

  return purchaseRecord
}

export function getPurchase(userEmail, productId) {
  const key = `${userEmail}:${productId}`
  return purchases.get(key)
}

export function incrementDownloadCount(userEmail, productId) {
  const key = `${userEmail}:${productId}`
  const purchase = purchases.get(key)

  if (purchase && purchase.downloadCount < purchase.maxDownloads) {
    purchase.downloadCount++
    purchases.set(key, purchase)
    return true
  }

  return false
}