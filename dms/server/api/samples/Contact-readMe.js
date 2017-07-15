"use strict";

const config = require('./index');
const client = require('../src/index')(config);

//each contact-request require a contact-object.
//if an object (not contact) is submitted, it will be converted to a contact-object

client.contactInfo({contactId: '12345'})
      .then(contact => console.log(contact));

//is the same like

client.contactInfo(client.Contact({contactId: '12345'}))
      .then(contact => console.log(contact));

//if the contact-object is created before its passed to the client, you can call a validation

let contact = client.Contact({contactId: '12345'}).info(); //.info() defines the schema for validation
contact = client.Contact({contactId: '12345'}).create(); //this will be false, because for create() the schema requires street, name, email,...

//To define the usage of a contact, use the api-call without the "contact"/"domain".
//if the contact-object is for contactUpdate use client.Contact({}).update();
//contactCreate() = client.Contact().create();
//contactInfo() = client.Contact().info();

//create empty objects and add the data step by step:

contact = client.Contact().create();
contact.name = 'John';
contact.city = 'Northpole';


//validate a contact
let v = contact.validate(true);
if(v !== true){
    //missing or invalide parameters
    //v contains errors
    console.log(v);
}

//v is true or false
v = contact.validate();

//v is true or a string with errors
v = contact.validate(true);

//contact create,update and info returns always a contact-object with type object() (see helper/schema.contactObject).
//ext{} not included atm. Missing documentation

/*
final contact-object
Contact {
    accountId: '170523224038952',
        addDate: '2017-06-12T14:49:00Z',
        city: 'Musterhausen',
        country: 'de',
        emailAddress: 'demo@steinweber.info',
        extAeroIdentificationNumber: '',
        extAeroPassword: '',
        extCaLegalType: '',
        extCatIntendedUsage: '',
        extCompanyNumber: '',
        extCompanyNumberCountry: '',
        extCountryOfBirth: '',
        extDateOfBirth: null,
        extForeignResidentIdentificationNumber: '',
        extGender: '',
        extIdentificationCardCountry: '',
        extIdentificationCardIssueDate: null,
        extIdentificationCardIssuingAuthority: '',
        extIdentificationCardNumber: '',
        extIdentificationCardValidUntil: null,
        extLanguage: '',
        extNationality: null,
        extPlaceOfBirth: '',
        extPlaceOfBirthPostalCode: '',
        extRemarks: '',
        extTaxId: '',
        extTaxIdCountry: '',
        extTradeMarkCountry: '',
        extTradeMarkDateOfApplication: null,
        extTradeMarkDateOfRegistration: null,
        extTradeMarkName: '',
        extTradeMarkRegisterNumber: '',
        extTradeMarkRegistrationAuthority: '',
        extTradingName: '',
        extTravelUniqueIdentificationNumber: '',
        extUkType: '',
        extVatId: '',
        extVatIdCountry: '',
        extXxxMemberId: '',
        faxNumber: '',
        handle: 'MM42',
        hidden: false,
        id: '170612174174018',
        lastChangeDate: '2017-06-12T14:49:00Z',
        name: 'Max Mustermann',
        organization: '',
        phoneNumber: '+49 8671 5070431',
        placeholderForUnreadableSupplierContact: false,
        postalCode: '84554',
        sipUri: '',
        state: 'Bayern',
        street: [ 'Musterweg 12' ],
        type: 'person',
        usableBySubAccount: false }
        */


//the system use a clientTransactionId but filter out by Schema.
//set in condig clientTransactionsId to "uuid" or "time" to get the request-data

//unsupported atm
/*
 Contact {
    ...
    request:
        RequestData {
            clientTransactionsId: $value (uuid|time)
            serverTransactionsId: $value
        }
    */