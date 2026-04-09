#!/usr/bin/env node

/**
 * Node.js CLI Calculator Application
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (×)
 * - Division (÷)
 */

const readline = require('readline');

/**
 * Calculator class with basic arithmetic operations
 */
class Calculator {
  /**
   * Addition operation
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum of a and b
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Subtraction operation
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Difference of a and b
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * Multiplication operation
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Product of a and b
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * Division operation
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number} Quotient of a divided by b
   * @throws {Error} If divisor is zero
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}

// Create calculator instance
const calculator = new Calculator();

// Create readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Display calculator menu and prompt for user input
 */
function displayMenu() {
  console.log('\n====== Calculator CLI ======');
  console.log('1. Addition (+)');
  console.log('2. Subtraction (-)');
  console.log('3. Multiplication (×)');
  console.log('4. Division (÷)');
  console.log('5. Exit');
  console.log('===========================\n');
}

/**
 * Main calculator loop
 */
function runCalculator() {
  displayMenu();
  
  rl.question('Select an operation (1-5): ', (choice) => {
    if (choice === '5') {
      console.log('Thank you for using Calculator CLI!');
      rl.close();
      return;
    }

    if (!['1', '2', '3', '4'].includes(choice)) {
      console.log('Invalid choice. Please select 1-5.');
      runCalculator();
      return;
    }

    rl.question('Enter first number: ', (num1) => {
      rl.question('Enter second number: ', (num2) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);

        if (isNaN(a) || isNaN(b)) {
          console.log('Error: Please enter valid numbers.');
          runCalculator();
          return;
        }

        let result;
        let operation;

        try {
          switch (choice) {
            case '1':
              result = calculator.add(a, b);
              operation = 'Addition';
              break;
            case '2':
              result = calculator.subtract(a, b);
              operation = 'Subtraction';
              break;
            case '3':
              result = calculator.multiply(a, b);
              operation = 'Multiplication';
              break;
            case '4':
              result = calculator.divide(a, b);
              operation = 'Division';
              break;
          }

          console.log(`\n${operation}: ${a} ${operation === 'Addition' ? '+' : operation === 'Subtraction' ? '-' : operation === 'Multiplication' ? '×' : '÷'} ${b} = ${result}`);
        } catch (error) {
          console.log(`\nError: ${error.message}`);
        }

        runCalculator();
      });
    });
  });
}

// Start the calculator
console.log('Welcome to Calculator CLI!');
runCalculator();
