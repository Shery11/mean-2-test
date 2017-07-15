"use strict";

const debug = require('debug')('httpnet:contact');
const inspector = require('schema-inspector');
const Schema = require('./helper/schema');

class Contact{

    constructor(data){
        debug(`constructor(${data})`);

        let objKeys = Object.keys(data);

        if(objKeys.length > 0){
            objKeys.forEach(key => this[key] = data[key]);
        }
    }
    
    object(cleanup){
        this._sanitize('contactObject',cleanup);
        return this;
    }
    
    create(cleanup){
        this._sanitize('contactCreate',cleanup);
        return this;
    }

    info(cleanup){
        this._sanitize('contactInfo',cleanup);
        return this;
    }

    update(cleanup){
        this._sanitize('contactUpdate',cleanup);
        return this;
    }

    delete(cleanup){
        this.update(cleanup);
    }

    _sanitize(schema,cleanup){
        schema = Schema[schema];

        const d = {};

        for(let k in this){
            d[k] = this[k];
            delete this[k];
        }

        inspector.sanitize(schema, d);

        for(let k in d){
            this[k] = d[k];
        }

        if(cleanup !== true){
            this._schema = schema;
        }

    }

    validate(output){
        let result = inspector.validate(this._schema, this);

        if (!result.valid){
            console.log(`Invalid contact data: \n\n${result.format()}`);
            return output===true?result.format():false;
        }

        return true;
    }
}

module.exports = Contact;