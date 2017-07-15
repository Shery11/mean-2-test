"use strict";

const config = require('./index');
const client = require('../src/index')(config);

//create a contact object
const domain = client.Domain({
    name: 'rumorium.de',
    transferLockEnabled: true,
    contacts: {
        owner: '170612273856029',
        admin: '170613289900082',
        tech: '170613289900082',
        zone: '170613289900082',
    },
    nameservers: client.Nameserverlist(['ns1.demo.com','ns2.demo.com'])
});


client.domainCreate(domain)
      .then(r => console.log(r))//r = Result | Result.domain = Domain-Object
      .catch(err => {console.log(err);console.log('err')}); //if error -> Result.response = {}
/*

accountId: '170523224038952',
    addDate: '2017-06-18T08:28:55Z',
    authInfo: '',
    bundleId: '',
    contacts: [ [Object], [Object], [Object], [Object] ],
    createDate: '2017-06-18',
    currentContractPeriodEnd: '2018-06-17',
    deletionDate: null,
    deletionScheduledFor: null,
    deletionType: '',
    dnsSecEntries: [],
    id: '170618415238667',
    lastChangeDate: '2017-06-18T08:28:55Z',
    latestDeletionDateWithoutRenew: '2018-06-17T00:00:00Z',
    name: 'xn--rckwrts-8wa6s.de',
    nameUnicode: 'rückwärts.de',
    nameservers: [ [Object], [Object] ],
    nextContractPeriodStart: '2018-06-18',
    paidUntil: '2018-06-18T00:00:00Z',
    renewOn: '2018-06-17T00:00:00Z',
    restrictions: [],
    status: 'ordered',
    transferLockEnabled: true,
    transferLockedByOwnerChangeUntil: null },*/
