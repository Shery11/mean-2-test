"use strict";

const config = require('./index');
const client = require('../src/index')(config);


client.domainStatus('rumorium.de')
      .then(r => console.log(r))//r = Result | Result.domain = Domain-Object
      .catch(err => {console.log(err);console.log('err')}); //if error -> Result.response = {}
