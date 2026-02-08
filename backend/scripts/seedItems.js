const mongoose = require('mongoose');
const Item = require('../models/Item');
require('dotenv').config();

const items = [
  {
    name: 'Laptop',
    description: 'High-performance laptop for work and gaming',
    price: 999.99
  },
  {
    name: 'Smartphone',
    description: 'Latest smartphone with advanced features',
    price: 699.99
  },
  {
    name: 'Headphones',
    description: 'Wireless noise-cancelling headphones',
    price: 199.99
  },
  {
    name: 'Tablet',
    description: '10-inch tablet perfect for reading and browsing',
    price: 399.99
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with health monitoring',
    price: 299.99
  },
  {
    name: 'Camera',
    description: 'Professional DSLR camera for photography',
    price: 1299.99
  },
  {
    name: 'Gaming Mouse',
    description: 'Precision gaming mouse with RGB lighting',
    price: 79.99
  },
  {
    name: 'Keyboard',
    description: 'Mechanical keyboard with RGB backlighting',
    price: 149.99
  }
];

async function seedItems() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-cart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert new items
    await Item.insertMany(items);
    console.log(`Seeded ${items.length} items successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding items:', error);
    process.exit(1);
  }
}

seedItems();
