/**
 * Async handler to wrap async controller functions
 * This eliminates the need for try-catch blocks in each controller
 * @param {Function} fn - The async controller function
 * @returns {Function} - Express middleware function
 */
exports.asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  /**
   * Format error response
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @returns {Error} - Formatted error object
   */
  exports.errorResponse = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  };
  
  /**
   * Check if a string is a valid MongoDB ObjectId
   * @param {string} id - The id to check
   * @returns {boolean} - Whether the id is valid
   */
  exports.isValidObjectId = (id) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
  };
  
  /**
   * Generate a random string of specified length
   * @param {number} length - Length of the string
   * @returns {string} - Random string
   */
  exports.generateRandomString = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  /**
   * Calculate win rate percentage
   * @param {number} wins - Number of wins
   * @param {number} total - Total number of games
   * @returns {number} - Win rate percentage
   */
  exports.calculateWinRate = (wins, total) => {
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
  };
  