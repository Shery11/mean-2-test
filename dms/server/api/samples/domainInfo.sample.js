"use strict";

const config = require('./index');
const client = require('../src/index')(config);

//create a contact object
const domain = client.Domain({name: 'rückwärts2.de'});


client.domainInfo(domain)
      .then(r => console.log(r))//r = Result | Result.response = Domain-Object
      .catch(err => console.log(err)); //if error -> Result.response = {}
