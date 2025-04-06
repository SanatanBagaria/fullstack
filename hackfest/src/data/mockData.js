export const mockPuzzles = [
  "123456",
  "789123",
  "456789",
  "234567",
  "345678",
  "567891",
  "912345",
  "678912"
];

export const currentUser = {
  id: 1, 
  name: "Mathwizard", 
  wins: 42, 
  losses: 12, 
  score: 800, 
  badges: ["Weekly Champion", "Speed Demon", "Perfect Solver"],
  createdAt: "2023-01-15T12:00:00Z",
  recentGames: [
    { opponent: "NumberNinja", result: "win", score: 100, date: "2023-04-02" },
    { opponent: "CalculusKing", result: "win", score: 95, date: "2023-04-01" },
    { opponent: "AlgebraAce", result: "loss", score: 80, date: "2023-03-31" }
  ]
};

export const mockUsers = [
  { 
    id: 1, 
    name: "Mathwizard", 
    wins: 42, 
    losses: 12, 
    score: 800, 
    badges: ["Weekly Champion", "Speed Demon", "Perfect Solver"] 
  },
  { 
    id: 2, 
    name: "NumberNinja", 
    wins: 38, 
    losses: 15, 
    score: 720, 
    badges: ["Accuracy Master", "Consistent Player"] 
  },
  { 
    id: 3, 
    name: "CalculusKing", 
    wins: 35, 
    losses: 20, 
    score: 650, 
    badges: ["Quick Thinker"] 
  },
  { 
    id: 4, 
    name: "AlgebraAce", 
    wins: 30, 
    losses: 18, 
    score: 580, 
    badges: ["Rising Star"] 
  }
];

export const gameSettings = {
  modes: [
    { id: "first-three", name: "First Three", description: "Best of five rounds. New puzzles generate when either player completes a level." },
    { id: "time-attack", name: "Time Attack", description: "Solve as many puzzles as you can within the time limit." },
    { id: "reverse-hectoc", name: "Reverse Hectoc", description: "Operators are given, fill in the numbers to reach 100." }
  ],
  difficulties: [
    { id: "easy", name: "Easy", timeLimit: 120 },
    { id: "medium", name: "Medium", timeLimit: 90 },
    { id: "hard", name: "Hard", timeLimit: 60 }
  ]
};
