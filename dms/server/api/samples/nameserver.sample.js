"use strict";

const config = require('./index');
const client = require('../src/index')(config);

let ns = client.Nameserver({name:'ns1.example.com',ips:[]});
console.log(ns.validate(true));
console.log(ns);

let nsl = client.Nameserverlist([{name:'ns2.exmample.com',ips:['192.168.178.1']},ns]);
console.log(nsl.validate(true));
console.log(nsl);

//the validation do not check multiple entries:
let nslFalse = client.Nameserverlist([ns,ns,ns]);
//Validation is true, but the list have 3 times the same entry. And this is wrong!
console.log(nslFalse.validate(true));
console.log(nslFalse);