const readline = require('readline');

let value = '';

function calculateValue(value) {
    console.log({ value })
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.name == 'q') {
    console.log('\nexiting');
    process.exit(0);
  } else if (key.name == 'return') {
    calculateValue(value)
  } else {
    value += key.sequence;
  }
  process.stdout.write(key.sequence)
});

console.log('Application successfully started.\n Please enter value to calculate:')