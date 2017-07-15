"use strict";

const config = require('./index');
const client = require('../src/index')(config);


client.domainDelete({domainName:'rückwärts5.de'})
      .then(r => console.log(r))//r = Result | Result.domain = Domain-Object
      .catch(err => {console.log(err);console.log('err')}); //if error -> Result.response = {}

/*
Result {
    metadata:
    { clientTransactionId: '2b2509be-34b1-46a8-b871-a38077401a41',
        serverTransactionId: '20170623070141050-domainrobot-demo-32465-0' },
    status: 'pending',
        warnings: [],
        errors: [],
}*/
