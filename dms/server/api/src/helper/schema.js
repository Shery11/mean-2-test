exports.config = {
    type: "[object,Config]",
    strict: false,
    properties: {
        "ApiKey": {type: "string", optional: false},
        "ApiKeySandbox": {type: "string", optional: false},
        "Sandbox": {type: "boolean", optional: false},
        "Endpoint": {type: "string", def: "https://partner.http.net/api/", optional: true},
        "EndpointSandbox": {type: "string", def: "https://demo.http.net/api/", optional: true},
        "ApiVersion": {type: "string", def: "v1", optional: true},
        "ApiFormat": {type: "string", def: "json", optional: true},
        "connection": {
            type: "object",
            strict: false,
            optional: true,
            properties: {
                "followRedirect": {type: "boolean", def: false, optional: true},
                "followAllRedirects": {type: "boolean", def: false, optional: true},
                "encoding": {type: "string", def: "utf8", optional: true},
                "gzip": {type: "boolean", def: false, optional: true},
                "strictSSL": {type: "boolean", def: false, optional: true},
            }
        }
    }
};

exports.contactObject = {
    type: "[Contact,object]",
    strict: true,
    properties: {
        accountId: {type: "string", def: "", optional: false},
        id: {type: "string", def: "", optional: false},
        handle: {type: "string", def: "", optional: false},
        type: {type: "string", test: "/(person|org|role)/", def: "", optional: false},
        name: {type: "string", def: "", optional: false},
        organization: {type: "string", def: "", optional: false},
        street: {
            type: "array",
            def: [],
            optional: false,
            splitWith: "\n",
            items: { type: "string", rules: ["trim","capitalize"] }},
        postalCode: {type: "string", def: "", optional: false},
        city: {type: "string", def: "", optional: false},
        state: {type: "string", def: "", optional: false},
        country: {type: "string", def: "", optional: false},
        emailAddress: {type: "string", pattern: "email", def: "", optional: false},
        phoneNumber: {type: "string", def: "", optional: false},
        faxNumber: {type: "string", def: "", optional: false},
        sipUri: {type: "string", def: "", optional: false},
        hidden: {type: "boolean", def: false, optional: false},
        usableBySubAccount: {type: "boolean", def: false, optional: false},
        addDate: {type: "[datetime,null]", def: null, optional: false},
        lastChangeDate: {type: "[datetime,null]", def: null, optional: false}
    }
};

exports.contactCreate = {
    type: "[Contact,object]",
    strict: true,
    properties: {
        type: {type: "string", test: "/(person|org|role)/", def: "person", optional: false},
        name: {type: "string", def: "", optional: false},
        organization: {type: "string", def: "", optional: false},
        street: {
            type: "array",
            optional: false,
            splitWith: "\n",
            items: { type: "string", rules: ["trim","capitalize"] }},
        postalCode: {type: "string", def: null, optional: false},
        city: {type: "string", optional: false},
        state: {type: "string", def: null, optional: false},
        country: {type: "string", def: "", optional: false},
        emailAddress: {type: "string", pattern: "email", def: "", optional: false},
        phoneNumber: {type: "string", optional: false},
        faxNumber: {type: "string", def: "", optional: false},
        sipUri: {type: "string", def: "", optional: false},
        hidden: {type: "boolean", def: false, optional: false},
        usableBySubAccount: {type: "boolean", def: false, optional: false}
    }
};

exports.contactInfo = {
    type: "Contact",
    strict: true,
    properties:{
        contactId: {type: "string", optional: false}
    }
};

//domain listing 
exports.domainList ={
    type:"Domain",
    properties:{
        domainNames:{type:"string"}
    }
}


exports.contactUpdate = {
    type: "[Contact,object]",
    strict: true,
    properties: {
        id: {type: "string", def: "", optional: true},
        handle: {type: "string", def: "", optional: true},
        type: {type: "string", test: "/(person|org|role)/", def: "person", optional: true},
        name: {type: "string", def: "", optional: true},
        organization: {type: "string", def: "", optional: true},
        street: {
            type: "array",
            optional: true,
            splitWith: "\n",
            items: { type: "string", rules: ["trim","capitalize"] }},
        postalCode: {type: "string", def: null, optional: true},
        city: {type: "string", optional: true},
        state: {type: "string", def: null, optional: true},
        country: {type: "string", def: "", optional: true},
        emailAddress: {type: "string", pattern: "email", def: "", optional: true},
        phoneNumber: {type: "string", optional: true},
        faxNumber: {type: "string", def: "", optional: true},
        sipUri: {type: "string", def: "", optional: true},
        hidden: {type: "boolean", def: false, optional: true},
        usableBySubAccount: {type: "boolean", def: false, optional: true}
    }
};

exports.domainObject = {
    type: ['Domain', 'Object'],
    strict: true,
    properties: {
        id: {type: "string", def: "", optional: false},
        accountId: {type: "string", def: "", optional: false},
        name: {type: "string", def: "", optional: false},
        nameUnicode: {type: "string", def: "", optional: false},
        status: {type: "string", test: "/(ordered|active|restorable|failed)/", def: "", optional: false},
        transferLockEnabled: {type: "boolean", def: true, optional: false},
        authInfo: {type: "string", def: true, optional: false},
        contacts: {
            type: "array",
            def: [],
            optional: false,
            items: { type: "[string,Contact]", def: "" }
        },
        nameservers: {
            type: "array",
            def: [],
            optional: false,
            items: { type: ['string', 'Nameserver'], def: "" }
        },
        createDate: {type: ['date', 'null'], def: null, optional: false},
        currentContractPeriodEnd: {type: ['date', 'null'], def: null, optional: false},
        nextContractPeriodStart: {type: ['date', 'null'], def: null, optional: false},
        deletionType: {type: "string", test: "/(delete|withdraw)/", def: "", optional: false},
        deletionDate: {type: ['datetime', 'null'], def: null, optional: false},
        addDate: {type: ['datetime', 'null'], def: null, optional: false},
        lastChangeDate: {type: ['datetime', 'null'], def: null, optional: false}
    }
};

exports.domainCreate = {
    type: "[object,Domain]",
    strict: true,
    properties: {
        name: {type: "string", rules: ['lower','trim'], optional: false},
        transferLockEnabled: {type: "boolean", def: true, optional: false},
        contacts: {
            strict: true,
            optional: false,
            type: 'array',
            exec: function(_schema, _data) {
                "use strict";
                let r = ['owner','admin','tech','zone'];
                let b = [];
                if(typeof _data === "object" && _data[0] !== undefined && !_data[0].hasOwnProperty('type')){
                    let data = _data[0];

                    let keys = Object.keys(data);
                    keys.forEach(key => {
                        if(r.includes(key) === false){
                            this.report(`${key} is not an allowed type of a domain contact`);
                        }else{
                            r.splice(r.indexOf(key),1);
                            b.push({type:key, contact:data[key]});
                        }
                    });

                }else if(typeof _data === "object" ){

                    _data.forEach(c => {
                        if(r.includes(c.type) === false){
                            this.report(`${c.type} is not an allowed type of a domain contact`);
                        }else{
                            r.splice(r.indexOf(c.type),1);
                            b.push(c);
                        }
                    });
                }
                if(r.length > 0){
                    r.forEach(key => this.report(`${key} is missing and not optional`));
                }
                return b;


            },
            items: {
                type: 'object',
                properties: {
                    type: {type: 'string', test:/^(owner|admin|tech|zone)$/, optional: false},
                    contact: {type: 'string', optional:false}
                },

            }

        },
        nameservers: {
            type: ['Nameserverlist', 'array'],
            def: [],
            optional: false,
            items: { type: "Nameserver", def: "" }},

    }
};


exports.domainInfo = {
    type: "Domain",
    strict: true,
    properties:{
        name: {type: "string", optional: false},
    }
};

exports.domainUpdate = {
    type: "[object,Domain]",
    strict: true,
    properties: {
        id: {type: 'string', def: '', optional: true},
        name: {type: "string", rules: ['lower','trim'], def:'', optional: false},
        transferLockEnabled: {type: "boolean", def: true, optional: false},
        contacts: {
            strict: true,
            optional: false,
            type: 'array',
            exec: function(_schema, _data) {
                "use strict";
                let r = ['owner','admin','tech','zone'];
                let b = [];
                if(typeof _data === "object" && _data[0] !== undefined && !_data[0].hasOwnProperty('type')){
                    let data = _data[0];

                    let keys = Object.keys(data);
                    keys.forEach(key => {
                        if(r.includes(key) === false){
                            this.report(`${key} is not an allowed type of a domain contact`);
                        }else{
                            r.splice(r.indexOf(key),1);
                            b.push({type:key, contact:data[key]});
                        }
                    });

                }else if(typeof _data === "object" ){

                    _data.forEach(c => {
                        if(r.includes(c.type) === false){
                            this.report(`${c.type} is not an allowed type of a domain contact`);
                        }else{
                            r.splice(r.indexOf(c.type),1);
                            b.push(c);
                        }
                    });
                }
                if(r.length > 0){
                    r.forEach(key => this.report(`${key} is missing and not optional`));
                }
                return b;


            },
            items: {
                type: 'object',
                properties: {
                    type: {type: 'string', test:/^(owner|admin|tech|zone)$/, optional: false},
                    contact: {type: 'string', optional:false}
                },

            }

        },
        nameservers: {
            type: ['Nameserverlist', 'array'],
            def: [],
            optional: false,
            items: { type: "Nameserver", def: "" }},

    }
};

exports.domainStatus = {
    type: "[object,Domain]",
    strict: true,
    properties: {
        name: {type: "string", rules: ['lower','trim'], optional: false},
    }
};

exports.domainDelete = {
    type: "[object,Domain]",
    strict: true,
    properties: {
        domainName: {type: "string", optional: false},
        execDate: {type: "string", optional: true},
    }
};

exports.domainStatusResult = {
    type: "[object,Domain]",
    strict: true,
    properties: {
        domainName: {type: "string", rules: ['lower'], optional: false},
        domainNameUnicode: {type: "string", rules: ['lower'], optional: false},
        domainSuffix: {type: "string", rules: ['lower'], optional: false},
        earlyAccessStart: {type: ['date','null'], def: null, optional: false},
        extension: {type: "string", rules: ['lower'], optional: false},
        generalAvailabilityStart: {type: "datetime", optional: false},
        landrushStart: {type: ['date','null'], def: null, optional: false},
        launchPhase: 'generalAvailability',
        premiumPrices: null,
        registrarTag: null,
        status: {
            type: "string",
            test:/^(alreadyRegistered|registered|nameContainsForbiddenCharacter|available|suffixDoesNotExist|suffixCannotBeRegistered|canNotCheck|unknown)$/,
            optional: false
        },
        sunriseStart: {type: ['date','null'], def: null, optional: false},
        transferMethod: {type: ['string','null'], def: null, optional: false},
    }
};


//ToDo: ipv4/v6 test pattern for nameserver
exports.Nameserver = {
    type: ['object', 'Nameserver'],
    strict: true,
    properties:{
        name: {type: "string", def:null, optional: false},
        ips: {
            type: 'array',
            def:[],
            optional: false,
            items: {
                type: 'string',
            }
        }
    }
};

exports.domainContactsListContact = {
    type: ['object'],
    strict: true,
    properties:{
        contact: {type: "string", optional: false},
        type: {type: "string", optional: false},
    }
};


exports.domainContactsList = {
    type: ['object'],
    strict: true,
    properties:{
        contacts: {
            strict: true,
            optional: false,
            type: 'array',
            exec: function(_schema, _data) {
                "use strict";
                let r = ['owner','admin','tech','zone'];
                let b = [];
                if(typeof _data === "object" && _data[0] !== undefined && !_data[0].hasOwnProperty('type')){
                    let data = _data[0];

                    let keys = Object.keys(data);
                    keys.forEach(key => {
                        if(r.includes(key) === false){
                            this.report(`${key} is not an allowed type of a domain contact`);
                        }else{
                            r.splice(r.indexOf(key),1);
                            b.push({type:key, contact:data[key]});
                        }
                    });

                }else if(typeof _data === "object" ){

                    _data.forEach(c => {
                        if(r.includes(c.type) === false){
                            this.report(`${c.type} is not an allowed type of a domain contact`);
                        }else{
                            r.splice(r.indexOf(c.type),1);
                            b.push(c);
                        }
                    });
                }
                if(r.length > 0){
                    r.forEach(key => this.report(`${key} is missing and not optional`));
                }
                return b;


            },
            items: {
                type: 'object',
                properties: {
                    type: {type: 'string', test:/^(owner|admin|tech|zone)$/, optional: false},
                    contact: {type: 'string', optional:false}
                },

            }

        },
    }
};

exports.Result = {
    type: ['object', 'Response'],
    strict: false,
    properties:{
        metadata: {
            type: "object",
            optional: false,
            properties: {
                clientTransactionId: {type: 'string', def:'', optional:false},
                serverTransactionId: {type: 'string', def:'', optional:false}
            }
        },
        warnings: {
            type: 'array',
            def:[],
            optional: false,
            items: {
                type: 'object',
                optional:true,
                properties: {
                    code: {type: 'number', def:0, optional:false},
                    contextObject: {type: 'string', def:'', optional:false},
                    contextPath: {type: 'string', def:'', optional:false},
                    details: {type: 'array', def:[], optional:false},
                    text: {type: 'string', def:'', optional:false},
                    value: {type: 'string', def:'', optional:false},
                }
            }
        },
        errors: {
            type: 'array',
            def:[],
            optional: false,
            items: {
                type: 'object',
                optional:true,
                properties: {
                    code: {type: 'number', def:0, optional:false},
                    contextObject: {type: 'string', def:'', optional:false},
                    contextPath: {type: 'string', def:'', optional:false},
                    details: {type: 'array', def:[], optional:false},
                    text: {type: 'string', def:'', optional:false},
                    value: {type: 'string', def:'', optional:false},
                }
            }
        },
        response: {
            type: ['object', 'Contact', 'Domain'],
            def:{},
            optional: false
        },
        responses: {
            type: ['object', 'Contact', 'Domain', 'Result'],
            def:{},
            optional: true
        }
    }
};
