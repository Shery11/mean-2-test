"use strict";

const debug = require('debug')('httpnet:contact');
const inspector = require('schema-inspector');
const Schema = require('./helper/schema');

class Domain{

    constructor(data){
        debug(`constructor(${data})`);

        let objKeys = Object.keys(data);

        if(objKeys.length > 0){
            objKeys.forEach(key => this[key] = data[key]);
        }
    }

    object(cleanup){
        this._sanitize('domainObject',cleanup);
        return this;
    }

    create(cleanup){
        this._sanitize('domainCreate',cleanup);
        return this;
    }

    info(cleanup){
        this._sanitize('domainInfo',cleanup);
        return this;
    }

    update(cleanup){
        this._sanitize('domainUpdate',cleanup);
        return this;
    }

    delete(cleanup){
        this._sanitize('domainDelete',cleanup);
        return this;
    }

    status(cleanup){
        this._sanitize('domainStatus',cleanup);
        return this;
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
            console.log(`Invalid domain data: \n\n${result.format()}`);
            return output===true?result.format():false;
        }

        return true;
    }

    list(cleapup){
            this._sanitize('domainList',cleanup);
        return this;

    }
}

module.exports = Domain;