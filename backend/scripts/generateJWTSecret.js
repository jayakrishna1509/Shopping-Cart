const crypto = require('crypto');

// Generate a secure random JWT secret
const secret = crypto.randomBytes(64).toString('hex');

console.log('\n========================================');
console.log('Generated JWT Secret:');
console.log('========================================');
console.log(secret);
console.log('========================================');
console.log('\nCopy this secret and paste it into your .env file as JWT_SECRET');
console.log('Make sure to keep this secret secure and never commit it to version control!\n');
