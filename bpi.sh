#!/bin/bash

# http://www.coindesk.com/api/

# http://curl.haxx.se/
# http://stedolan.github.io/jq

# usage: bpi.sh [<code>]
#        bpi.sh --currencies

api=https://api.coindesk.com/v1/bpi/

if [ "$1" == '--currencies' ]; then
  curl -s "${api}supported-currencies.json" \
    | jq -r '.[] | .currency + "\t" + .country'
else
  if [ "$1" != '' ]; then
    code="$1"
  else
    code=USD
  fi
  curl -s "${api}currentprice/$code.json" \
    | jq -r ".bpi.$code.rate + \" $code\""
fi

