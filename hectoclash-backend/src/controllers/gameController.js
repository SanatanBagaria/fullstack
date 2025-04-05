const Game = require('../models/Game');
const User = require('../models/User');
const { asyncHandler } = require('../utils/helpers');
const { generatePuzzle, validateSolution } = require('../services/puzzleService');

// @desc    Get a new puzzle
// @route   GET /api/games/puzzle
// @access  Public
exports.getPuzzle = asyncHandler(async (req, res) => {
  const puzzle = generatePuzzle();
  
  res.status(200).json({
    status: 'success',
    data: {
      puzzle
    }
  });
});

// @desc    Validate a puzzle solution
// @route   POST /api/games/validate
// @access  Public
exports.validatePuzzleSolution = asyncHandler(async (req, res) => {
  const { puzzle, solution } = req.body;
  
  if (!puzzle || !solution) {
    res.status(400);
    throw new Error('Please provide both puzzle and solution');
  }
  
  const isValid = validateSolution(puzzle, solution);
  
  res.status(200).json({
    status: 'success',
    data: {
      isValid,
      message: isValid ? "Solution is correct!" : "Solution is incorrect. Try again."
    }
  });
});

// @desc    Record a completed game
// @route   POST /api/games
// @access  Private
exports.recordGame = asyncHandler(async (req, res) => {
  const { opponentId, score, won, gameMode } = req.body;
  
  // Create game record
  const game = await Game.create({
    user: req.user._id,
    userScore: score,
    opponent: opponentId || null,
    score,
    won,
    gameMode
  });
  
  // Update user stats
  const user = await User.findById(req.user._id);
  
  if (won) {
    user.wins += 1;
  } else {
    user.losses += 1;
  }
  
  user.score += score;
  await user.save();
  
  res.status(201).json({
    status: 'success',
    data: {
      game
    }
  });
});

// @desc    Get user game history
// @route   GET /api/games/history
// @access  Private
exports.getGameHistory = asyncHandler(async (req, res) => {
  const games = await Game.find({ user: req.user._id })
    .populate('opponent', 'name')
    .sort({ createdAt: -1 });
  
  res.status(200).json({
    status: 'success',
    results: games.length,
    data: {
      games
    }
  });
});
