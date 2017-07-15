"use strict";

const config = require('./index');
const client = require('../src/index')(config);

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

//contactCreate
client.contactCreate(contact)

      //contactInfo
      .then(result => client.contactInfo({contactId:result.contact.id}))

      //contactUpdate
      .then(result => {
          result.contact.city = 'Demohausen';
          return client.contactUpdate(result.contact);
      })

      //contactDelete
      .then(result => client.contactDelete(result.contact))

      //contactInfo for console
      .then(result => client.contactInfo(result.contact))
      .then(result => console.log(result))

      .catch(erros => console.log(erros));

//unsupported ext{} filtered out by Schema
/**
 Contact {
  accountId: '170523224038952',
  addDate: '2017-06-13T08:56:00Z',
  city: 'Demohausen',
  country: 'de',
  emailAddress: 'demo@steinweber.info',
  faxNumber: '',
  handle: 'MM55',
  hidden: true,
  id: '170613289900082',
  lastChangeDate: '2017-06-13T08:56:01Z',
  name: 'Max Mustermann',
  organization: '',
  phoneNumber: '+49 8671 5070431',
  postalCode: '84554',
  sipUri: '',
  state: 'Bayern',
  street: [ 'Musterweg 12' ],
  type: 'person',
  usableBySubAccount: false }
 **/