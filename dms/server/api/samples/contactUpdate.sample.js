"use strict";

const config = require('./index');
const client = require('../src/index')(config);

//contactUpdate works with Contact-ID or handle-ID
//contact-object MUSST BE full filled with all (old and new) parameters

//create a contact object
let contact = client.Contact({
    accountId: '170523224038952',
    addDate: '2017-06-12T13:37:33Z',
    city: 'Musterhausen',
    country: 'de',
    emailAddress: 'demo@steinweber.info',
    faxNumber: '',
    handle: 'MM32',
    hidden: false,
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


client.contactUpdate(contact)
      .then(result => {
          //contact loaded
          console.log(result);
      })
      .catch(errors => {
          //array of erros
          console.log(errors);
      });

//OR

//request the object from API

client.contactInfo(client.Contact({contactId: '170612265429634'}))
      .then(result => {
          //change parameters
          result.contact.street= [ 'Musterweg 9968' ];
          return client.contactUpdate(result.contact);
      })
      .then(result => {
          //this is the new contact (response from API)
          console.log(result);
      })
      .catch(err => {
          //this error could be from contactInfo or from contactUpdate
          console.log(err);
      });


/**
 Contact {
  accountId: '170523224038952',
  addDate: '2017-06-12T13:37:33Z',
  city: 'Musterhausen',
  country: 'de',
  emailAddress: 'demo@steinweber.info',
  faxNumber: '',
  handle: 'MM32',
  hidden: false,
  id: '170612265429634',
  lastChangeDate: '2017-06-13T08:08:46Z',
  name: 'Max Mustermann',
  organization: '',
  phoneNumber: '+49 8671 5070431',
  postalCode: '84554',
  sipUri: '',
  state: 'Bayern',
  street: [ 'Musterweg 9968' ],
  type: 'person',
  usableBySubAccount: false }
 **/