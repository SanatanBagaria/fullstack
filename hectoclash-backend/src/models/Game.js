const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userScore: {
    type: Number,
    required: true
  },
  opponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  opponentScore: {
    type: Number
  },
  score: {
    type: Number,
    required: true
  },
  won: {
    type: Boolean,
    required: true
  },
  gameMode: {
    type: String,
    enum: ['first-three', 'time-attack', 'reverse-hectoc'],
    required: true
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  totalPuzzlesSolved: {
    type: Number,
    default: 0
  },
  puzzles: [{
    puzzle: String,
    solution: String,
    timeToSolve: Number
  }],
}, { timestamps: true });

// Get user's game history
gameSchema.statics.getUserHistory = function(userId) {
  return this.find({ user: userId })
    .sort('-createdAt')
    .limit(10)
    .populate('opponent', 'name');
};

// Get leaderboard
gameSchema.statics.getLeaderboard = function(limit = 10) {
  return this.aggregate([
    { $group: {
        _id: '$user',
        totalScore: { $sum: '$score' },
        gamesWon: { $sum: { $cond: [{ $eq: ['$won', true] }, 1, 0] } },
        gamesPlayed: { $sum: 1 }
      }
    },
    { $sort: { totalScore: -1 } },
    { $limit: limit },
    { $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    { $unwind: '$userDetails' },
    { $project: {
        _id: 1,
        name: '$userDetails.name',
        totalScore: 1,
        gamesWon: 1,
        gamesPlayed: 1,
        winRate: { 
          $multiply: [
            { $divide: ['$gamesWon', { $cond: [{ $eq: ['$gamesPlayed', 0] }, 1, '$gamesPlayed'] }] },
            100
          ]
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Game', gameSchema);
