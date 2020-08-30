#!/usr/bin/env node

const http = require("http");
const child = require("child_process");

let isCLI = process.mainModule.filename == module.filename;

let port_min = 1024;
let port_max = 65535;

let port = port_min;

let generatePort = (callback) => {
    let temp_server = http.createServer();

    temp_server.on("error", (err) => {
        port += 1;
        if (port > port_max) port = port_min;
        generatePort(callback);
    });

    temp_server.listen(port, () => {
		temp_server.close();
        callback(port);
    });
};

if (isCLI == true) {
    generatePort((port) => {
        process.stdout.write(`${port}`);
        process.exit();
    });
    return;
}

let generatePortSync = () => {
    return parseInt(child.execSync("\"" + process.execPath + "\" " + module.filename).toString());
};

module.exports = generatePortSync;