"use strict";

const config = require('./index');
const client = require('../src/index')(config);

//contactInfo works only with Contact-ID not with handle-ID

//create a contact object
//the api require contactId. But if u give a id, the system will convert it to contactId: $id
//this allows to use contact-objects from a response with (id: value) as basic for a new request
//and simplify the usage with stored docs in databases
let contact = client.Contact({
    contactId: '170612265429634', //id: '170612265429634' allowed too
    //this can be a full contact too
});


client.contactInfo(contact)
    .then(result => {
        //contact loaded
        console.log(result);
    })
    .catch(errors => {
        //array of erros
        console.log(errors);
    });

/**
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
 **/