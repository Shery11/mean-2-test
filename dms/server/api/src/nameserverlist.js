"use strict";

const debug = require('debug')('httpnet:nameserverlist');
const inspector = require('schema-inspector');
const Schema = require('./helper/schema');
const Nameserver = require('./nameserver');


class Nameserverlist{

    constructor(data){
        debug(`constructor(${data})`);

        this.nameservers = [];

        if(Array.isArray(data) === true){
            data.forEach(ns => {
                if(ns instanceof Nameserver){
                    this.nameservers.push(ns);
                }else{
                    this.nameservers.push(new Nameserver(ns));
                }
            });
        }
    }

    validate(output){

        if(this.nameservers.length === 0){
            return false;
        }

        for(let i=0; i < this.nameservers.length; i++){

            let result = inspector.validate(Schema.Nameserver, this.nameservers[i]);

            if (!result.valid){
                console.log(`Invalid nameserver data: \n\n${result.format()}`);
                return output===true?result.format():false;
            }
        }

        return true;
    }
}

module.exports = Nameserverlist;