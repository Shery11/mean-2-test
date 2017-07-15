"use strict";

const debug = require('debug');
const Contact = require('./contact');
const Domain = require('./domain');
const Nameserver = require('./nameserver');
const Nameserverlist = require('./nameserverlist');
const Result = require('./result');
const DomainContactsList = require('./domainContactsList');

/**
 * API-Class for http.net REST API
 * @param {Config} config - Instance of Config
 * @param {Connection} connection - Instance of Connection
 */
class httpNetClient {

    constructor(config, connection){
        debug(('httpnet:client:constructor'))(`constructor: %O`, config);
        this.config = config;
        this.connection = connection;
    }

    /**
     * Create a new contact-object
     * @param {Contact|object} params
     * @return {Contact}
     */
    Contact(params){
        return new Contact(params);
    }

    /**
     * Create a new domain-object
     * @param {Domain|object} params
     * @return {Domain}
     */
    Domain(params){
        return new Domain(params);
    }

    /**
     * Create a new Nameserverlist
     * @param {object|array} params
     * @return {Nameserverlist}
     */
    Nameserverlist(params){
        return new Nameserverlist(params);
    }

    /**
     * Create a new Nameserver
     * @param {object|string} params
     * @return {Nameserver}
     */
    Nameserver(params){
        return new Nameserver(params);
    }

    /**
     * Create a new domainContactsList
     * @param {object|string} params
     * @return {Nameserver}
     */
    DomainContactsList(params){
        return new DomainContactsList(params);
    }

    /**
     * Retrieving Specific Contacts
     * @param {string|Contact} params - contactID or Contact-Object with a contactId
     */
    contactInfo(params){

        return new Promise((resolve, reject) =>{

            debug('httpnet:client:contactInfo')('contactInfo: %O', params);

            let reqContact = params instanceof Contact?params:new Contact(params);

            //force a full contact to a contact-info object
            if(reqContact.hasOwnProperty('id') && !reqContact.hasOwnProperty('contactId')){
                reqContact = new Contact({contactId: reqContact.id});
            }

            reqContact.info();

            if(reqContact.validate() !== true){
                debug('httpnet:client:contactInfo')('Invalid or missing parameter(s)');
                reject('contactInfo: Invalid or missing parameters');
            }

            const postData = reqContact.info(true);

            this.connection.post(this.connection.build('domain', 'contactInfo'), postData)
                .then(r =>{

                    const result = new Result(r);

                    if(r.status === 'success'){
                        result.contact = new Contact(r.response).object(true);
                        resolve(result);
                    }
                    reject(result);
                });

        });
    }

    /**
     * Create a new Contact/Handle
     * @param {Object|Contact} params - Object with required Contacts or Contact-Object
     */
    contactCreate(params){

        return new Promise((resolve, reject) =>{

            debug('httpnet:client:contactCreate')('contactCreate: %O', params);

            let reqContact = params instanceof Contact?params:new Contact(params);
            reqContact.create();

            if(reqContact.validate() !== true){
                debug('httpnet:client:contactCreate')('Invalid or missing parameter(s)');
                reject('contactCreate: Invalid or missing parameters');
            }

            const postData = {
                contact: reqContact.create(true)
            };

            this.connection.post(this.connection.build('domain', 'contactCreate'), postData)
                .then(r =>{

                    const result = new Result(r);

                    if(r.status === 'success'){
                        result.contact = new Contact(r.response).object(true);
                        resolve(result);
                    }
                    reject(result);
                });
        });
    }

    /**
     * Update a Contact/Handle
     * @param {Object|Contact} params - Object with required Contacts or Contact-Object
     * @param {Boolean} actingAsAgent - Boolean, default false, see docu for details
     */
    contactUpdate(params, actingAsAgent){

        return new Promise((resolve, reject) =>{

            debug('httpnet:client:contactUpdate')('contactUpdate: %O', params);

            let reqContact = params instanceof Contact?params:new Contact(params);
            reqContact.update();

            if(reqContact.validate() !== true){
                debug('httpnet:client:contactUpdate')('Invalid or missing parameter(s)');
                reject('contactUpdate: Invalid or missing parameters');
            }

            const postData = {
                contact: reqContact.update(true)
            };

            if(actingAsAgent === true){
                postData.actingAs = 'designatedAgent';
            }

            this.connection.post(this.connection.build('domain', 'contactUpdate'), postData)
                .then(r =>{
                    const result = new Result(r);
                    if(r.status === 'success'){
                        result.contact = new Contact(r.response).object(true);
                        resolve(result);
                    }
                    reject(result);
                });
        });
    }

    /**
     * Delete (hide-only) a Contact/Handle
     * @param {Object|Contact} params - Object with required Contacts or Contact-Object
     */
    contactDelete(params){

        return new Promise((resolve, reject) =>{

            debug('httpnet:client:contactDelete')('contactDelete: %O', params);

            let reqContact = params instanceof Contact?params:new Contact(params);

            if(reqContact.hasOwnProperty('contactId')){
                this.contactInfo(reqContact)
                    .then(contact =>{
                        contact.hidden = true;
                        this.contactUpdate(contact)
                            .then(contact => resolve(contact));
                    })
                    .catch(err => reject(err));
            }else{

                reqContact.hidden = true;

                this.contactUpdate(reqContact)
                    .then(contact => resolve(contact))
                    .catch(err => reject(err));

            }

        });
    }

    /**
     * Create a new Domain
     * @param {Object|Contact} params - Object with required Contacts or Contact-Object
     */
    domainCreate(params){

        return new Promise((resolve, reject) =>{

            debug('httpnet:client:domainCreate')('domainCreate: %O', params);

            let reqDomain = params instanceof Domain?params:new Domain(params);
            reqDomain.create();

            if(reqDomain.validate() !== true){
                debug('httpnet:client:domainCreate')('Invalid or missing parameter(s)');
                reject('domainCreate: Invalid or missing parameters');
            }

            const postData = {
                domain: reqDomain.create(true)
            };

            if(reqDomain.nameservers instanceof Nameserverlist){
                postData.domain.nameservers = reqDomain.nameservers.nameservers;
            }

            this.connection.post(this.connection.build('domain', 'domainCreate'), postData)
                .then(r =>{
                    const result = new Result(r);

                    if(result._response.status === 'ordered'){
                        result.domain = new Domain(r.response).object(true);
                        resolve(result);
                    }
                    reject(result);
                });
        });
    }

    /**
     * Retrieving Specific Domain
     * @param {Object|Domain} params - Object with required Domain or Domain-Object
     */
    domainInfo(params){

        return new Promise((resolve, reject) =>{

            debug('httpnet:client:domainInfo')('domainInfo: %O', params);

            let reqDomain = params instanceof Domain?params:new Domain(params);
            reqDomain.info();

            if(reqDomain.validate() !== true){
                debug('httpnet:client:domainInfo')('Invalid or missing parameter(s)');
                reject('domainInfo: Invalid or missing parameters');
            }

            reqDomain.info(true);

            const postData = {};

            if(reqDomain.name !== null){
                postData.domainName = reqDomain.name;
            }else{
                postData.id = reqDomain.id;
            }

            this.connection.post(this.connection.build('domain', 'domainInfo'), postData)
                .then(r =>{
                    const result = new Result(r);

                    if(r.status === 'success'){
                        result.domain = new Domain(r.response).object(true);
                        resolve(result);
                    }
                    reject(result);
                });
        });
    }

    /**
     * Update a Domain
     * @param {Object|Domain} params - Object with required Domain or Domain-Object
     * @param {Boolean} actingAsAgent - Boolean, default false, see docu for details
     */
    domainUpdate(params, actingAsAgent){

        return new Promise((resolve, reject) =>{

            debug('httpnet:client:domainUpdate')('domainUpdate: %O %s', params, actingAsAgent);

            let reqDomain = params instanceof Domain?params:new Domain(params);
            reqDomain.update();
            console.log(reqDomain);

            if(reqDomain.validate() !== true){
                debug('httpnet:client:domainUpdate')('Invalid or missing parameter(s)');
                reject('domainUpdate: Invalid or missing parameters');
            }

            const postData = {
                domain: reqDomain.update(true)
            };

            if(actingAsAgent === true){
                postData.actingAs = 'designatedAgent';
            }

            this.connection.post(this.connection.build('domain', 'domainUpdate'), postData)
                .then(r =>{
                    const result = new Result(r);

                    if(r.status === 'success'){
                        result.domain = new Domain(r.response).object(true);
                        resolve(result);
                    }
                    reject(result);
                });
        });
    }

    /**
     * Domain Availability
     * @param {Array|String} params - Array of Objects, Domains-objects or Strings OR a single String
     */
    domainStatus(params){

        return new Promise((resolve, reject) =>{

            debug('httpnet:client:domainStatus')('domainStatus: %O', params);

            if(typeof params === "string"){
                params = [new Domain({name: params})];
            }

            if(!Array.isArray(params)){
                debug('httpnet:client:domainStatus')('domainStatus: Array of Objects OR Array of Domain-Objects OR String required');
                reject('domainStatus: Array of Objects OR Array of Domain-Objects OR String required');
            }

            const postData = {
                domainNames: []
            };

            let keys = Object.keys(params);

            for(let x = 0; x < keys.length; x++){

                let d = params[x];

                if((d instanceof Domain) === false){
                    if(typeof d === 'string'){
                        d = new Domain({name: d});
                    }else{
                        d = new Domain(d);
                    }
                }

                d.status();

                let r = d.validate(true);

                if(r !== true){
                    debug('httpnet:client:domainStatus')('domainStatus: %s', r);
                    console.log(r);
                }else{
                    d.status(true);
                    postData.domainNames.push(d.name);
                }
            }

            if(postData.domainNames.length < 1){
                debug('httpnet:client:domainStatus')('domainStatus: No (valid) domain for request!');
                console.log('domainStatus: No (valid) domain for request!');
                reject('domainStatus: No (valid) domain for request!');
            }


            this.connection.post(this.connection.build('domain', 'domainStatus'), postData)
                .then(r =>{
                    const result = new Result(r);

                    if(r.status === 'success'){
                        result.status = [];
                        result.responses.forEach(res => result.status.push(new Domain(res)));
                        resolve(result);
                    }
                    reject(result);
                });
        });
    }

    /**
     * Delete a Domain
     * @param {Object|Domain} params - Object with required Domain or Domain-Object
     */
    domainDelete(params){

        return new Promise((resolve, reject) =>{

            debug('httpnet:client:domainDelete')('domainDelete: %O', params);

            let reqDomain = params instanceof Domain?params:new Domain(params);
            reqDomain.delete();

            if(reqDomain.validate() !== true){
                debug('httpnet:client:domainDelete')('Invalid or missing parameter(s)');
                reject('domainDelete: Invalid or missing parameters');
            }

            const postData = reqDomain.delete(true);

            this.connection.post(this.connection.build('domain', 'domainDelete'), postData)
                .then(r =>{
                    const result = new Result(r);

                    if(r.status === 'success' || r.status === 'pending'){
                        resolve(result);
                    }
                    reject(result);
                });
        });
    }

    

}

module.exports = (config, connection) => new httpNetClient(config, connection);