"use strict";

const debug = require('debug')('httpnet:contact');
const Schema = require('./helper/schema');
const inspector = require('schema-inspector');


class DomainContactsList{

    constructor(data){
        debug(`constructor(${data})`);

        this.contacts = {};

        if(Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('type') && data[0].hasOwnProperty('contact')){
            for(let x =0; x < data.length; x++){

                let c = data[x];
                let result = inspector.validate(Schema.domainContactsListContact, c);
                if (!result.valid){
                    console.log(`Invalid domainContact data: \n\n${result.format()}`);
                }else{
                    this.contacts[c.type] = c.contact;
                }
            }
        }
    }

    get admin(){
        return this.contacts.admin;
    }

    set admin(admin){
        this.contacts.admin = admin;
    }

    get owner(){
        return this.contacts.owner;
    }

    set owner(owner){
        this.contacts.owner = owner;
    }

    get tech(){
        return this.contacts.tech;
    }

    set tech(tech){
        this.contacts.tech = tech;
    }

    get zone(){
        return this.contacts.zone;
    }

    set zone(zone){
        this.contacts.zone = zone;
    }

    get data(){
        let r = [];
        Object.keys(this.contacts).forEach( type => {
            r.push({contact: this.contacts[type], type: type});
            }
        );
        return r;
    }

    validate(output){
        let result = inspector.validate(Schema.domainContactsList, this);

        if (!result.valid){
            console.log(`Invalid domainContactList data: \n\n${result.format()}`);
            return output===true?result.format():false;
        }

        return true;
    }



}

module.exports = DomainContactsList;