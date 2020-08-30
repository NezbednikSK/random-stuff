const sleep = require("./index.js");

let b = Date.now();

sleep(1000);

console.log("sync-sleep: " + (Date.now() - b) + "ms");

let c = Date.now();

setTimeout(() => {
    console.log("setTimeout: " + (Date.now() - c) + "ms");
}, 1000);