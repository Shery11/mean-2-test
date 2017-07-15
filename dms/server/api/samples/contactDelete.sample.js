"use strict";

const config = require('./index');
const client = require('../src/index')(config);

// !!!Deleting contacts via API is not possible at the moment and might never be.!!!

// !!! Do not use "deleted" contacts as a domain handle. It's possible but your Problem ;-)

//the workaround provides two ways
//create a FULL contact-object and set hidden = true
//or use the auto-hidden function by providing JUST the contactId (see below)

//create a contact object
let contact = client.Contact({
    accountId: '170523224038952',
    addDate: '2017-06-12T13:37:33Z',
    city: 'Musterhausen',
    country: 'de',
    emailAddress: 'demo@steinweber.info',
    faxNumber: '',
    handle: 'MM32',
    hidden: false, //this param will be changed later
    id: '170612265429634',
    lastChangeDate: '2017-06-12T13:37:33Z',
    name: 'Max Mustermann',
    organization: '',
    phoneNumber: '+49 8671 5070431',
    postalCode: '84554',
    sipUri: '',
    state: 'Bayern',
    street: [ 'Musterweg 9968' ],
    type: 'person',
    usableBySubAccount: false });

//contactDelete is in this case the same like contactUpdate
//for better codevie you can use contactDelete(). contactUpdate has the same result
client.contactDelete(contact)
      .then(result => {
          //contact is now hidden and status is true
          console.log(result);
      })
      .catch(errors => {
          //array of erros
          console.log(errors);
      });



//Second way is to provide just the contactId

//request the object from API

client.contactDelete(client.Contact({contactId: '170612265429634'}))
      .then(result => {
          //contact is now hidden and status is true
          console.log(result);
      })
      .catch(errors => {
          //array of erros
          console.log(errors);
      });

//if the same contact is "deleted" multiple times, the result can be every time "true"
//the delete-method allows to "reactivate" a contact by contactUpdate() with hidden:false
//crazy, but its just a workaround.