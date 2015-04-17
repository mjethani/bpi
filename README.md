```console
$ npm install -g bpi
bpi@0.1.2 /usr/local/lib/node_modules/bpi
$ bpi --currencies | grep ^NZD
NZD     New Zealand Dollar
$ bpi NZD
296.1073 NZD
$ 
```

```javascript
var bpi = require('bpi');

var code = process.argv[2] || 'EUR';

bpi.price(code, function (error, data) {
  if (error) {
    console.error(String(data || error));
    process.exit(1);
  }

  console.log(data.bpi[code].rate + ' ' + code);
});
```

http://www.coindesk.com/price/

