// Script to create all products in Stripe
const Stripe = require('stripe');
const { products } = require('../lib/data/products');

// Use your test key for now
const stripe = new Stripe('sk_test_51RxGz1Fu0PdXokF8m8ZPGLCuin9sm1mV2Ak2kf19gZRbEGLFFs9UPIPYrGlGKlQb4Os2OTITlrjdMEf4ByOsGAQC00TlvNEAyg');

async function createProducts() {
  console.log('🚀 Creating products in Stripe...\n');

  // Let's start with just one product to test
  const testProduct = products[0]; // Honey album

  try {
    // Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name: testProduct.title,
      description: `${testProduct.artist} - Digital Album`,
      metadata: {
        artist: testProduct.artist,
        type: testProduct.type,
        category: testProduct.category
      }
    });

    console.log(`✅ Created product: ${stripeProduct.name}`);

    // Create price for the product
    const price = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(testProduct.price * 100), // Convert to cents
      currency: 'usd',
    });

    console.log(`💰 Created price: $${testProduct.price} - Price ID: ${price.id}`);
    console.log('\n📝 Update your products.js file:');
    console.log(`Replace "price_REPLACE_ME" with "${price.id}" for ${testProduct.title}`);

  } catch (error) {
    console.error('Error creating product:', error);
  }
}

createProducts();