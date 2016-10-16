title: Nodejs - Request - Error socket hang up code - ECONNRESET
date: 2016-03-01 11:05:24
tags:
  - Nodejs
---

Currently, I writing a nodejs server that I want to call external API via https. This is the code that I used.

```
var request = require('request');
var userProfileUri = 'http://test.com/API/user/profile';
request.get(userProfileUri, {
  'headers': {
    'Authorization': 'Bearer eyJ0eX'
  },
}, function(err, response, body) {
  console.log(err);
});
```

After running this code, I waited for a minute and got this error:

```
{ [Error: socket hang up] code: 'ECONNRESET' }
```

Doing for many searches via google, finally I got a solution that make my day happy. I hope that bellow solution can help you too.

```
var request = require('request');
var userProfileUri = 'http://test.com/API/user/profile';
request.get(userProfileUri, {
  'headers': {
    'Authorization': 'Bearer eyJ0eX'
  },
  agentOptions: {
    secureOptions: require('constants').SSL_OP_NO_TLSv1_2,
    ciphers: 'ECDHE-RSA-AES256-SHA:AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
    honorCipherOrder: true
  }
}, function(err, response, body) {
  console.log(err);
});
```

The important part is `agentOptions`. Just add it to your `request` config.