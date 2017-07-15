"use strict";

const config = require('./index');
const client = require('../src/index')(config);

// !!! IMPORTANT !!!
// the API requires domain contacts as an array
// THIS MODULE works with objects (see below)
let domain = {
    name: 'foo.com',
    contacts:[
        {type: 'admin', contact: 'id'},
        {type: 'owner', contact: 'id'},
        {type: 'tech', contact: 'id'},
        {type: 'zone', contact: 'id'},
    ]
};

domain = {
    name: 'foo.com',
    contacts:{
        admin: 'id',
        owner: 'id',
        tech: 'id',
        zone: 'id'
    }
};
