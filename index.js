var https = require('https');

var api = 'https://api.coindesk.com/v1/bpi/';

function callApi(url, callback) {
  https.get(url, function (res) {
    var statusError = 'HTTP: ' + res.statusCode + ' ' + res.statusMessage;
    if (res.statusCode === 200 || res.statusCode === 404) {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        try {
          data = JSON.parse(data);
        } catch (error) {
        }
        callback(res.statusCode !== 200 ? statusError : null, data);
      });
    } else {
      callback(statusError);
    }
  }).on('error', function (error) {
    callback(error);
  });
}

function currencies(callback) {
  callApi(api + 'supported-currencies.json', callback);
}

function price(code, callback) {
  callApi(api + 'currentprice/' + code + '.json', callback);
}

exports.currencies = currencies;
exports.price = price;

