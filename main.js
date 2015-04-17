var bpi = require('./');

function printHelp() {
  console.log('usage: bpi [<code>]');
  console.log('       bpi --currencies');
  console.log('       bpi --help');
  console.log('       bpi --version');
  console.log();
}

function printVersion() {
  console.log('bpi v0.1.1');
}

function listCurrencies() {
  bpi.currencies(function (error, data) {
    if (error || typeof data !== 'object') {
      handleApiError(error, data);
    }

    data.forEach(function (item) {
      console.log(item.currency + '\t' + item.country);
    });
  });
}

function checkPrice() {
  var code = process.argv[2] || 'USD';

  bpi.price(code, function (error, data) {
    if (error || typeof data !== 'object') {
      handleApiError(error, data);
    }

    console.log(data.bpi[code].rate + ' ' + code);
  });
}

function handleApiError(error, data) {
  var errorMessage = data !== undefined && typeof data !== 'object' ? data
    : error ? String(error)
    : null;
  if (errorMessage) {
    console.error(errorMessage);
    process.exit(1);
  } else {
    process.exit();
  }
}

function handleUnknownOption(option) {
  console.error("Unknown option '" + option + "'.");
  console.error();
  console.error("See 'bpi --help'.");
  console.error();
  process.exit(1);
}

function run() {
  var option = process.argv[2];

  if (option === '--help' || option === '-h' || option === '-?') {
    printHelp();
  } else if (option === '--version' || option === '-V') {
    printVersion();
  } else if (option === '--currencies') {
    listCurrencies();
  } else if (option && option[0] === '-') {
    handleUnknownOption(option);
  } else {
    checkPrice();
  }
}

function main() {
  run();
}

if (require.main === module) {
  main();
}

exports.run = run;

