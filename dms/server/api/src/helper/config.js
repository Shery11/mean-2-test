"use strict";

class Config{

    constructor(cfg){
        if(cfg === undefined){
            cfg = require('../../config.json');
        }


        let keys = Object.keys(cfg);
        if(keys.length > 0){
            keys.forEach(key => this[key] = cfg[key]);
        }

    }

    get(key){
        return this[key];
    }
}

module.exports = (cfg) => new Config(cfg);