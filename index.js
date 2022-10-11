const readline = require("readline");

const validOperators = ["*", "/", "+", "-"];

let calculatedValue = null;
let numbers = [];
let operators = [];
let tempValueString = "";

let error = null;

function isNumber(value) {
  return Number.isInteger(parseInt(value));
}

function calculateValue() {
  if (numbers.length === 0) {
    return console.log('>No calculated value');
  }
  if (operators.length === 0) {
    return console.log(`\n>${numbers[numbers.length - 1]}`);
  }
  if (numbers.length - 1 === operators.length) {
    return console.log(`Error: not enough numbers\n>${numbers[numbers.length -1]}`)
  }
  while (operators.length > 0) {
    if (numbers.length === 1 && calculatedValue) {
      error = 'not enough numbers';
      break;
    }
    const operator = operators.shift();
    const currValue = calculatedValue ? numbers.pop() : null;
    const nextValue = numbers.pop();

    switch (operator) {
      case "*": {
        const result = currValue
          ? nextValue * currValue
          : nextValue * numbers.pop();
        calculatedValue = result;
        numbers.push(calculatedValue);
        break;
      }
      case "/": {
        const result = currValue
          ? nextValue / currValue
          : nextValue / numbers.pop();
        calculatedValue = result;
        numbers.push(calculatedValue);
        break;
      }
      case "+": {
        const result = currValue
          ? nextValue + currValue
          : nextValue + numbers.pop();
        calculatedValue = result;
        numbers.push(calculatedValue);
        break;
      }
      case "-": {
        const result = currValue
          ? nextValue - currValue
          : numbers.pop() - nextValue;
        calculatedValue = result;
        numbers.push(calculatedValue);
        break;
      }
      default:
        break;
    }
  }
  if (error) return console.log(`\nError: ${error}\n>${numbers[numbers.length -1]}`);
  console.log(`>${calculatedValue || 'no calculated value'}`);
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {

  console.log({ calculatedValue, numbers, operators, tempValueString, error })
  if (key.name == "q" || (key.name == "d" && key.ctrl == true)) {
    console.log('Application closed.');
    process.exit(0);
  } else if (key.name == "c") {
    tempValueString = '';
    numbers = [];
    operators = [];
    calculatedValue = null;
    process.stdout.clearLine();
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write('>Reset\n');
  } else if (key.name == "backspace") {
    tempValueString = tempValueString.slice(0, -1);
    process.stdout.clearLine();
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(tempValueString);
  } else if (key.name == "return") {
    const values = tempValueString.split(" ");
    values.forEach((value) => {
      if (isNumber(value)) return numbers.push(parseInt(value));
      value
        .split("")
        .filter((v) => validOperators.indexOf(v) >= 0)
        .forEach((v) => {
          operators.push(v);
        });
    });
    tempValueString = "";
    calculateValue();
  } else {
    const { sequence } = key;
    if (isNumber(key.sequence) || (key.sequence == " ") || validOperators.indexOf(sequence) >= 0) {
      tempValueString += key.sequence;
      process.stdout.write(key.sequence);
    } else {
      process.stdout.write(`${sequence} is not a valid character\n`);
      process.stdout.write(`${tempValueString}`);
    }
  }
});

console.log("Application started:");
