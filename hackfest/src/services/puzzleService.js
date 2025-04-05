
export const generatePuzzle = () => {
  let puzzle = '';
  for (let i = 0; i < 6; i++) {
    puzzle += Math.floor(Math.random() * 10).toString();
  }
  return puzzle;
};

/**
 * Validates if a solution correctly uses all digits from the puzzle
 * and evaluates to 100
 * @param {string} puzzle - The 6-digit puzzle
 * @param {string} solution - The proposed mathematical expression
 * @returns {boolean} Whether the solution is valid
 */
export const validateSolution = (puzzle, solution) => {
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
    
    // Evaluate the expression
    // eslint-disable-next-line no-eval
    const result = eval(solution);
    
    // Check if result equals 100
    return Math.abs(result - 100) < 0.0001;
  } catch (error) {
    console.error('Error validating solution:', error);
    return false;
  }
};
