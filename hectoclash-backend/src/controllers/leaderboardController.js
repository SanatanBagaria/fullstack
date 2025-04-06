const User = require('../models/User');
const { asyncHandler } = require('../utils/helpers');

// @desc    Get top players
// @route   GET /api/leaderboard
// @access  Public
exports.getLeaderboard = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  
  const leaderboard = await User.find()
    .sort({ score: -1 })
    .limit(limit)
    .select('name score wins losses');
  
  res.status(200).json({
    status: 'success',
    results: leaderboard.length,
    data: {
      leaderboard
    }
  });
});

// @desc    Get user's rank
// @route   GET /api/leaderboard/rank
// @access  Private
exports.getUserRank = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  // Get user's score
  const user = await User.findById(userId);
  
  // Count users with higher score
  const higherScores = await User.countDocuments({ score: { $gt: user.score } });
  
  // User's rank is position + 1
  const rank = higherScores + 1;
  
  res.status(200).json({
    status: 'success',
    data: {
      rank,
      score: user.score
    }
  });
});
