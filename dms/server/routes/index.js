"use strict";

//samples & tests never run out of the sandbox!!

const config = require('../api/config.json');

config.Sandbox = true;

module.exports = config;