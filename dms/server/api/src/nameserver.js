"use strict";

const debug = require('debug')('httpnet:contact');
const inspector = require('schema-inspector');
const Schema = require('./helper/schema');

class Nameserver{

    constructor(data){
        debug(`constructor(${data})`);

        this.ips = [];

        if(typeof data === "string"){
            this.name = data;
        }else if(typeof data === 'object' && Array.isArray(data) === false){

            let objKeys = Object.keys(data);

            if(objKeys.length > 0){
                objKeys.forEach(key => this[key] = data[key]);
            }
        }

        const d = {};

        for(let k in this){
            d[k] = this[k];
            delete this[k];
        }

        inspector.sanitize(Schema.Nameserver, d);

        for(let k in d){
            this[k] = d[k];
        }
    }

    validate(output){
        let result = inspector.validate(Schema.Nameserver, this);

        if (!result.valid){
            console.log(`Invalid nameserver data: \n\n${result.format()}`);
            return output===true?result.format():false;
        }

        return true;
    }
}

module.exports = Nameserver;