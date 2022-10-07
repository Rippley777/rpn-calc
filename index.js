const readline = require("readline");

const validOperators = ["*", "/", "+", "-"];

let calculatedValue = null;
let numbers = [];
let operators = [];
let tempValueString = "";

//todo: handle errors

let error = null;

function isNumber(value) {
  return Number.isInteger(parseInt(value));
}

function calculateValue() {
  if (operators.length === 0) return console.log(`\n${numbers[numbers.length - 1]}`);
  while (operators.length > 0) {
    if (numbers.length === 1) error = 'not enough numbers';
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
  if (error) return console.log(`\nError: ${error}`);
  console.log(`\n${calculatedValue}`);
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
  if (key.name == "q") {
    console.log("\nexiting");
    process.exit(0);
    //todo: handle backspace
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
    tempValueString += key.sequence;
    process.stdout.write(key.sequence);
  }
});

console.log("Application started:");
