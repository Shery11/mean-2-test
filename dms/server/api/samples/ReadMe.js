"use strict";

const config = require('./index');
const client = require('../src/index')(config);

//best practice to work with objects
//Create an instance of the object (like Domain, Contact, ...)

const d = client.Domain({name:'example.com'});

//set the type of the object (Domain.update, Domain.create, Domain.delete, ...)
d.update();

//now d is a object prefilled with default params and values
//set addition params (if required and not already set on client.Domain())
d.transferLockEnabled = false;

//validate the object
//if output = true, response = true | errorMsg
//if output = false | null, the response = true | false
let err = d.validate(true); //if validate is false, err contains a msg

if(err !== true){ //false or msg
    console.log(err);
    //exit here!!
}else{

    //if the validation result true, use the API-Call

    client.domainUpdate(d)
        .then(result => {
            //if all ok, we have a new Domain-Object with the updated data
            console.log('Yes, all done');
            //the new Domain-Data
            console.log(result.domain);
            //if the server- and client-transactions-ids required:
            console.log('clientTransactionId: '+result.metadata.clientTransactionId);
            console.log('serverTransactionId: '+result.metadata.serverTransactionId);
        })
        .catch(err => {
            //the validation can not filter all possible problems
            //if we have a problem, we can log it or put it into the console
            console.log('houston, we have a problem');
            console.log(err);
        });
}

//with the above method, you can better find problems

//the "small" method dose exactly the same (create Object, Serialize the Object, validate Object, run API-Call)
//But the catch contains ALL errors from ALL steps.

client.domainUpdate({domainName:'example.com',transferLockEnabled: false})
      .then(result => {
          console.log('Yes, all done');
          console.log('clientTransactionId: '+result.metadata.clientTransactionId);
      })
      .catch(err => {
          //This error can be from validation, API-Call or Response!!!
          console.log('houston, we have a problem');
          console.log(err);
      });


//with the "pre-validation" of objects, you can verify also intact and complete database values

let myDbDoc = Database.filter({domain: 'example.com'}).run(); //get data from DB

let domain = client.Domain(myDbDoc);
domain.create();

let status = domain.validate(true);

console.log('Can i use the object for creating a domain?');

if(status === true){
    console.log('Yes, i can use this object for creating a domain');
}else{
    console.log('No, there is a Problem with my object:');
    console.log(status); //show the msg
}
