/**
 * Functions in JavaScript are blocks of code designed to perform a specific task. They are reusable and can be invoked (called) multiple times throughout a program.
 * Functions can accept parameters (inputs) and return values (outputs), but they can also perform actions without returning a value.
 * In Node.js, functions play a vital role in structuring code and enhancing reusability and maintainability.
 * Here, we'll explore the concept of functions and demonstrate various examples.
 */

/**
 * Calculates the average of an array of numbers.
 * @param {number[]} numbers - An array of numbers.
 * @returns {number} The average value.
 */
function calculateAverage(numbers) {
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return sum / numbers.length;
}

/**
 * Calculates the median of an array of numbers.
 * @param {number[]} numbers - An array of numbers.
 * @returns {number} The median value.
 */
function calculateMedian(numbers) {
  // Sort the numbers in ascending order
  const sortedNumbers = numbers.slice().sort((a, b) => a - b);
  // Find the middle index
  const middleIndex = Math.floor(sortedNumbers.length / 2);
  // Check if the array length is even or odd
  if (sortedNumbers.length % 2 === 0) {
      // If even, return the average of the two middle values
      return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
  } else {
      // If odd, return the middle value
      return sortedNumbers[middleIndex];
  }
}

/**
 * Calculates the range of an array of numbers.
 * @param {number[]} numbers - An array of numbers.
 * @returns {number} The range.
 */
function calculateRange(numbers) {
  // Find the minimum and maximum values
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  // Calculate the range
  return max - min;
}

/**
 * Calculates the mode of an array of numbers.
 * @param {number[]} numbers - An array of numbers.
 * @returns {number[]} The mode(s).
 */
function calculateMode(numbers) {
  const frequencyMap = {};
  numbers.forEach((number) => {
    frequencyMap[number] = (frequencyMap[number] || 0) + 1;
  });
  const maxFrequency = Math.max(...Object.values(frequencyMap));
  return Object.keys(frequencyMap).filter((number) => frequencyMap[number] === maxFrequency).map(Number);
}

/**
 * Calculates the standard deviation of an array of numbers.
 * @param {number[]} numbers - An array of numbers.
 * @returns {number} The standard deviation.
 */
function calculateStandardDeviation(numbers) {
  // Calculate the average of the numbers
  const average = calculateAverage(numbers);
  // Calculate the sum of squared differences from the mean
  const squaredDifferencesSum = numbers.reduce((accumulator, currentValue) => {
      const difference = currentValue - average;
      return accumulator + difference ** 2;
  }, 0);
  // Calculate the variance
  const variance = squaredDifferencesSum / numbers.length;
  // Calculate the standard deviation
  return Math.sqrt(variance);
}

// Example usage
const numbers = [1, 2, 3, 4, 5, 5, 6, 6, 6, 7, 8, 8, 8, 8];
const average = calculateAverage(numbers);
const median = calculateMedian(numbers);
const mode = calculateMode(numbers);
const range = calculateRange(numbers);
const standardDeviation = calculateStandardDeviation(numbers);

console.log("Numbers:", numbers);
console.log("Average:", average);
console.log("Median:", median);
console.log("Mode:", mode);
console.log("Range:", range);
console.log("Standard Deviation:", standardDeviation);
