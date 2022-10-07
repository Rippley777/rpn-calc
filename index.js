const readline = require('readline');

const validOperators = ['*', '/', '+', '-'];

let numbers = [];
let operators = [];
let tempValueString = '';

let error = null;

function isNumber(value) {
  return Number.isInteger(parseInt(value))
}

function calculateValue() {
    // console.log({ numbers, operators, tempValueString });
    if (operators.length === 0) {
      console.log(`\n${numbers[numbers.length - 1]}`);
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

    const values = tempValueString.split(' ');
    values.forEach((value) => {
      if (isNumber(value)) return numbers.push(parseInt(value));
      value.split('').filter((v) => validOperators.indexOf(v) >= 0).forEach((v) => {
        operators.push(v);
      });
    });
    tempValueString = '';
    calculateValue();
  } else {

      tempValueString += key.sequence;
      process.stdout.write(key.sequence);
  }
});

console.log('Application started:\n')