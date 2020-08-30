const package = require("./package.json");
const child = require("child_process");
const path = require("path");

let predefined = process.execPath + " " + path.join(module.path, package.bin) + " ";

let sleep = (time = 0) => {
    child.execSync(predefined + time);
};

module.exports = sleep;