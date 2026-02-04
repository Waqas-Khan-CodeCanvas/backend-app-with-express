import crypto from 'crypto'

/**
 * Generates a cryptographically secure random token.
 * @param {number} length - number of bytes to generate
 * @returns {string} - hex string token
 * @useCase  const userToken = generateRandomToken(16); // e.g., 32 hex chars 
*/
export const generateRandomToken = (length = 32) => {
  if (typeof length !== 'number' || length <= 0) {
    throw new TypeError('generateRandomToken expects a positive number');
  }
  return crypto.randomBytes(length).toString('hex');
}

// 