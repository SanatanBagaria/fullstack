// src/services/puzzleService.js
exports.generatePuzzle = () => {
  let puzzle = '';
  for (let i = 0; i < 6; i++) {
    puzzle += Math.floor(Math.random() * 10).toString();
  }
  return puzzle;
};

exports.validateSolution = (puzzle, solution) => {
  try {
    // Remove all non-digit characters to check if all puzzle digits are used
    const digitsInSolution = solution.replace(/[^0-9]/g, '');
   
    // Check if solution uses exactly the digits from the puzzle
    if (digitsInSolution.length !== puzzle.length) {
      return false;
    }
   
    // Check if all puzzle digits are used exactly once
    const puzzleDigits = puzzle.split('').sort();
    const solutionDigits = digitsInSolution.split('').sort();
   
    for (let i = 0; i < puzzleDigits.length; i++) {
      if (puzzleDigits[i] !== solutionDigits[i]) {
        return false;
      }
    }
   
    // Evaluate the expression safely
    try {
      // Using Function instead of eval for slightly better security
      // Still not recommended for production without proper sanitization
      const result = Function('"use strict";return (' + solution + ')')();
      
      // Check if result equals 100
      return Math.abs(result - 100) < 0.0001;
    } catch (evalError) {
      console.error('Error evaluating solution:', evalError);
      return false;
    }
  } catch (error) {
    console.error('Error validating solution:', error);
    return false;
  }
};
