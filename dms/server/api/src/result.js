"use strict";

const debug = require('debug')('httpnet:result');
const inspector = require('schema-inspector');
const Schema = require('./helper/schema');

class Result{

    constructor(data){
        debug(`constructor(${data})`);

        inspector.sanitize(Schema.Result, data);

        for(let k in data){
            if(k === 'response' && (this.hasOwnProperty('_response') && Object.keys(this._response).length === 0)){
                this._response = data[k];
            }else if(k === 'response'){
                this._response = data[k];
            }else{
                this[k] = data[k];
            }

        }
    }

}

module.exports = Result;