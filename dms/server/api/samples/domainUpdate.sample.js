"use strict";

const config = require('./index');
const client = require('../src/index')(config);

//domainUpdate is identical to contactUpdate.
//This is the api method for updating

const domain = client.Domain({name: 'woho.de'});


client.domainInfo(domain)
      .then(r => {
          let dcl = client.DomainContactsList(r.domain.contacts); //DomainContactsList converts Array to Object and allows to
          dcl.tech = '170612171995204';// set contacts like an object
          r.domain.contacts = dcl.data;
          return client.domainUpdate(r.domain);
      })
      .then(r => console.log(r))
      .catch(err => console.log(err)); //if error -> Result.response = {}

//DomainContactsList drops all invalid contacts objects (missing id or type)