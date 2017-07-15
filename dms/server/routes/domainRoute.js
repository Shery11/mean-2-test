"use strict";

const config = require('./index');
const client = require('../api/index')(config);
const express = require('express');
const router = express.Router();


// router.get('/', function(req, res){
// //create a contact object
// const domain = client.Domain({name: 'rückwärts2.de'});      
// client.domainInfo(domain)
//       .then(r => console.log(r))//r = Result | Result.response = Domain-Object
//       .catch(err => console.log(err)); //if error -> Result.response = {}

// })




router.get('/',function(req,res){


	//create a contact object
	const contact = client.Contact({
	    type: 'person',
	    name: 'Max Mustermann',
	    street: 'Musterweg 12',
	    postalCode: '84554',
	    city: 'Musterhausen',
	    state: 'Bayern',
	    country: 'DE',
	    emailAddress: 'demo@steinweber.info',
	    phoneNumber: '+49 8671 5070431'
	});

	//create the contact with api
	client.contactCreate(contact)
	    .then(result => console.log(result)) //Result Object
	    .catch(erros => console.log(erros)); //array
})


module.exports = router;
