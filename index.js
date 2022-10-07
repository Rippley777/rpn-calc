const readline = require('readline');

const validOperators = ['*', '/', '+', '-'];

let values = [];
let operators = [];
let tempValueString = '';

let error = null;

function isNumber(value) {
  return Number.isInteger(parseInt(value))
}

function calculateValue() {
    console.log({ values, operators, tempValueString });
    if (operators.length === 0) {
      console.log(`\n${values[values.length - 1]}`);
    } else {
      console.log('\ncalculate here');
    }
}


readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.name == 'q') {
    console.log('\nexiting');
    process.exit(0);
  } else if (key.name == 'return') {
    if (error) console.log(error);
    if (tempValueString === '-') {
      operators.push('-');
      tempValueString = '';
    }
    if (tempValueString) {
      if (isNumber(tempValueString)) {
        values.push(parseInt(tempValueString));
        tempValueString = '';
      } else {
        tempValueString = '';
        error = 'not a valid number'
      }
    }
    calculateValue();
  } else if (key.sequence === '-') {
    tempValueString += '-';
    process.stdout.write(key.sequence);
  } else if (
    validOperators.indexOf(key.sequence) >= 0
  ) {
    operators.push(key.sequence);
    process.stdout.write(key.sequence);
  } else if (isNumber(key.sequence)) {
    tempValueString += key.sequence;
    process.stdout.write(key.sequence);
  } else if (key.sequence === ' ') {
    values.push(parseInt(tempValueString));
    tempValueString = '';
    process.stdout.write(key.sequence);
  } else {
    error = `Please enter valid characters (0-9, ${operators.join(' ')})`
  }
});

console.log('Application successfully started.\n Please enter value to calculate:')