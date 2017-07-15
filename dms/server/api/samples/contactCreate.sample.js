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

//create the contact with api
client.contactCreate(contact)
    .then(result => console.log(result)) //Result Object
    .catch(erros => console.log(erros)); //array


/*response:
{ accountId: '170523224038952',
    addDate: '2017-06-12T13:41:09Z',
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
    extVatId: 'ABC',
    extVatIdCountry: '',
    extXxxMemberId: '',
    faxNumber: '',
    handle: 'MM48',
    hidden: false,
    id: '170612273856029',
    lastChangeDate: '2017-06-12T13:41:09Z',
    name: 'Max Mustermann',
    organization: '',
    phoneNumber: '+49 8671 5070431',
    placeholderForUnreadableSupplierContact: false,
    postalCode: '84554',
    sipUri: '',
    state: 'Bayern',
    street: [ 'Musterweg 12' ],
    type: 'person',
    usableBySubAccount: false },
status: 'success',
    warnings: [] }*/

