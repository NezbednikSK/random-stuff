const https = require("https");
const fs = require("fs");
https.get("https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win" + process.argv[process.argv.length - 3] + "/Personal%20Builds/mingw-builds/8.1.0/threads-win32/sjlj/" + process.argv[process.argv.length - 2] + "-8.1.0-release-win32-sjlj-rt_v6-rev0.7z/download", (res) => {
    var body = "";
    res.on("data", (chunk) => {
        body += chunk.toString();
    });
    res.on("end", () => {
        https.get(body.split(" ").filter(x => x.startsWith("http"))[0].split(";")[0], (res2) => {
            var body2 = "";
            res2.on("data", (chunk2) => {
                body2 += chunk2.toString();
            });
            res2.on("end", () => {
                https.get(body2.split(" ").filter(x => x.startsWith("http"))[0].split(";")[0], (res3) => {
                    res3.on("end", () => {
                        console.log("done");
                        process.exit(0);
                    }).pipe(fs.createWriteStream(process.argv[process.argv.length - 1]));
                });
            });
        });
    });
});
