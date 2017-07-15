"use strict";

module.exports = (cfg) => {
    const config = require("./src/helper/config")(cfg);
    const connection = require("./src/helper/connection")(config);
    const client = require('./src/client')(config,connection);
    return client;
};