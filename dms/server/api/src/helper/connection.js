"use strict";
const debug = require("debug")("httpnet:Connection");
const inspector = require("schema-inspector");
const request = require("request-promise-native");
const Schema = require("./schema");
const uuid = require('uuid');

/**
 * Manage connections for http.net - API
 * @param {Object} config
 */
class Connection {

    constructor(config) {
        debug(`constructor: %O`,config);

        if (!config) {
            throw new Error("No configuration for connection defined");
        }

        let result = inspector.validate(Schema.config, config);

        if (!result.valid) {
            throw new Error(`Configuration failed validation: \n\n${result.format()}`);
        }

        this.config = config;

        this.connected = false;

    }

    makeRequest(options) {
        debug(`makeRequest(${options})`);

        let err;
        
        

        return new Promise((resolve, reject) => {

            options.json = true;
            options.headers = {
                "User-Agent": "request"
            };
            options = Object.assign(options,this.config.connection);

            request(options)
                .then((response) => {

                    if (response && response.statusCode === 401) {
                        err = new Error("Unauthorised");
                        return reject(err);
                    }

                    debug(response);

                    return resolve(response);
                })
                .catch(err => {

                    debug(err);

                    reject(err);
                });
        });
    }

    get(url) {
        debug(`get(${url})`);

        let err;

        if (!url) {
            err = new Error("url must be supplied");
            return Promise.reject(err);
        }

        let options = {
            url,
            method: "GET"
        };

        return this.makeRequest(options);
    }
    
    build(service,request){
        
        let endpoint = this.config.get("Sandbox") === true?this.config.get("EndpointSandbox"):this.config.get("Endpoint");
        
        if(endpoint.substr(-1) !== "/"){
            endpoint += "/";
        }
        
        return `${endpoint}${service}/${this.config.get("ApiVersion")}/${this.config.get("ApiFormat")}/${request}`;
    }

    _prebuild(data){
        const ctidType = this.config.get('clientTransactionsId');
        if(ctidType === 'uuid'){
            data.clientTransactionId = uuid.v4();
        }else if(ctidType === 'time'){
            data.clientTransactionId =  Date.now();
        }else if(ctidType === false && (data.hasOwnProperty('clientTransactionsId') === false)){
            data.clientTransactionsId = uuid.v4();
        }

        data.authToken = this.config.get('Sandbox') === true?this.config.get('ApiKeySandbox'):this.config.get('ApiKey');

        return data;
    }


    post(url, postData) {
        debug(`post(${url})`)

        let err;

        if (!url) {
            err = new Error("url must be supplied");
            return Promise.reject(err);
        }

        if (!postData) {
            err = new Error("post must be supplied");
            return Promise.reject(err);
        }

        postData = this._prebuild(postData);

        let options = {
            url,
            method: "POST",
            body: postData
        };

        return this.makeRequest(options);
    }
}

module.exports = (cfg) => new Connection(cfg);