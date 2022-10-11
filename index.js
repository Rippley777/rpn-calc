const readline = require('readline');

const validOperators = ['*', '/', '+', '-'];

let calculatedValue = null;
let numbers = [];
let operators = [];
let tempValueString = '';

let error = null;

function isNumber(value) {
  return Number.isInteger(parseInt(value));
}

function calculateValue() {
  if (numbers.length === 0) {
    return console.log('No calculated value');
  }
  if (operators.length === 0) {
    return console.log(`\n${numbers[numbers.length - 1]}`);
  }
  if (numbers.length === operators.length) {
    return console.log(`\nError: Not enough numbers\n${numbers[numbers.length -1]}`)
  }
  while (operators.length > 0) {
    if (numbers.length === 1 && calculatedValue) {
      error = 'Not enough numbers';
      break;
    }
    const operator = operators.shift();
    const currValue = calculatedValue ? numbers.pop() : null;
    const nextValue = numbers.pop();

    switch (operator) {
      case '*': {
        const result = currValue
          ? nextValue * currValue
          : nextValue * numbers.pop();
        calculatedValue = result;
        numbers.push(calculatedValue);
        break;
      }
      case '/': {
        const result = currValue
          ? nextValue / currValue
          : nextValue / numbers.pop();
        calculatedValue = result;
        numbers.push(calculatedValue);
        break;
      }
      case '+': {
        const result = currValue
          ? nextValue + currValue
          : nextValue + numbers.pop();
        calculatedValue = result;
        numbers.push(calculatedValue);
        break;
      }
      case '-': {
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

process.stdin.on('keypress', (str, key) => {
  const { name, ctrl, sequence } = key;
  switch (name) {
    case 'q': 
      console.log('Application closed.');
      process.exit(0);
      break;
    case 'd':
      if (ctrl) {
        console.log('Application closed.');
        process.exit(0);
      } else {
        //todo: refactor above default 
        process.stdout.write(`${sequence} is not a valid character\n`);
        process.stdout.write(`${tempValueString}`);
      }
      break;
    case 'c':
      tempValueString = '';
      numbers = [];
      operators = [];
      calculatedValue = null;
      process.stdout.clearLine();
      readline.cursorTo(process.stdout, 0, null);
      process.stdout.write('Application reset\n');
      break;
    case 'backspace':
      tempValueString = tempValueString.slice(0, -1);
      process.stdout.clearLine();
      readline.cursorTo(process.stdout, 0, null);
      process.stdout.write(tempValueString);
      break;
    case 'return':
      const values = tempValueString.split(' ');
      values.forEach((value) => {
        if (isNumber(value)) return numbers.push(parseInt(value));
        value
          .split('')
          .filter((v) => validOperators.indexOf(v) >= 0)
          .forEach((v) => {
            operators.push(v);
          });
      });
      tempValueString = '';
      calculateValue();
      break;
    default:
      if (isNumber(sequence) || (sequence == ' ') || validOperators.indexOf(sequence) >= 0) {
        tempValueString += sequence;
        process.stdout.write(sequence);
      } else {
        process.stdout.write(`${sequence} is not a valid character\n`);
        process.stdout.write(`${tempValueString}`);
      }
      break;
  }
});

console.log('Application started:');