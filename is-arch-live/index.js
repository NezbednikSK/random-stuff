#!/usr/bin/env node

const fs = require("fs");

let isCLI = process.mainModule.filename == module.filename;

let isLive = () => {
    return fs.existsSync("/run/archiso");
};

if (isCLI == true) {
    return console.log(isLive() ? "yes" : "no");
}

module.exports = isLive;