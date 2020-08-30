const fs = require("fs");
const path = require("path");
const https = require("https");

let copyFolderRecursive = [
    "",
    "function copyFolderRecursive(src, dest) {",
    "    let dir = fs.readdirSync(src);",
    "    if (!fs.existsSync(dest)) fs.mkdirSync(dest);",
    "    ",
    "    dir.forEach(item => {",
    "        let stat = fs.lstatSync(path.join(src, item));",
    "        if (stat.isFile()) {",
    "            fs.copyFileSync(path.join(src, item), path.join(dest, item));",
    "        }",
    "        else if (stat.isDirectory()) {",
    "            copyFolderRecursive(path.join(src, item), path.join(dest, item));",
    "        }",
    "    });",
    "}"
];

let lines = {
    "2": "console.log('windows patched version running');",
    "5": "var fs = require('fs')",
    "31": "var apktool = path.join(__dirname, 'apktool.jar')",
    "32": "fs.mkdirSync(tmp)",
    "34": "if (fs.existsSync(app)) fs.unlinkSync(app)",
    "35": "run('java', ['-jar', apktool, 'd', base])",
    "36": "fs.rmdirSync(node, { recursive: true });",
    "37": "copyFolderRecursive(cwd, node);",
    "38": "run('java', ['-jar', apktool, 'b', 'base', '-o', app])",
    "39": "run(path.join(buildTools, 'zipalign.exe'), ['-v', '-p', '4', app, app + '.aligned'])",
    "40": "fs.copyFileSync(app + '.aligned', app);",
    "41": "fs.rmdirSync(tmp, { recursive: true });",
    "42": "fs.unlinkSync(app + '.aligned');",
    "43": "proc.execSync([path.join(buildTools, 'apksigner.bat'), 'sign', '--ks-pass', 'pass:whatever', '--ks', keystore, '--out', app, app].join(' '))"
};

let use_win = {
    "2": "if (process.argv.includes('-w')) return require('./binwin.js');"
}

let noa = path.join(__dirname, "..", "node-on-android");
let binwin = path.join(noa, "binwin.js");
let bin = path.join(noa, "bin.js");

if (!fs.existsSync(noa)) {
    console.log("You don't have node-on-android installed!");
    return process.exit();
}
console.log("Creating binwin.js...");

fs.copyFileSync(bin, binwin);

console.log("Adding -w switch option to bin.js...");

let bincontent = fs.readFileSync(bin, "utf-8").split("\n");

Object.keys(use_win).forEach(line => {
    bincontent[parseInt(line) - 1] = use_win[line];
});

fs.writeFileSync(bin, bincontent.join("\n"));

console.log("Manipulating binwin.js...");

let binwincontent = fs.readFileSync(binwin, "utf-8").split("\n");

Object.keys(lines).forEach(line => {
    binwincontent[parseInt(line) - 1] = lines[line];
});

fs.writeFileSync(binwin, binwincontent.join("\n") + copyFolderRecursive.join("\n"));

console.log("Downloading apktool...");

https.get("https://github.com/iBotPeaches/Apktool/releases/download/v2.4.1/apktool_2.4.1.jar", (github) => {
    let body = "";

    github.on("data", (chunk) => {
        body += chunk.toString("utf-8");
    });

    github.on("end", () => {
        let temp = body.split("\"");
        temp.shift();
        let url_encoded = temp[0];
        let url = decodeURIComponent(url_encoded).split("&amp;").join("&");

        https.get(url, (response) => {
            response.pipe(fs.createWriteStream(path.join(noa, "apktool.jar")).on("finish", () => {
                console.log("Done!");
                console.log("Next time you use node-on-android, append a -w to the command for the windows version!");
                process.exit();
            }));
        });
    });
});