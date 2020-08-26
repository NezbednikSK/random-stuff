const readline = require("readline");

const size = {
    get cols() {
        if (process.platform.includes("win")) return process.stdout.columns || process.env.COLUMNS;
        return child.execSync("tput cols");
    },
    get lines() {
        if (process.platform.includes("win")) return process.stdout.rows || process.env.ROWS;
        return child.execSync("tput lines");
    }
};

const cursorTo = (x, y) => {
    process.stdout.write("\x1b[H");

    for (let i = 0; i < x; i++) {
        process.stdout.write("\x1b[C");
    }

    for (let z = 0; z < y; z++) {
        process.stdout.write("\x1b[B");
    }
};

const genAnsi = (str) => {
    return `\x1b[${str}m`;
};

const reset1 = genAnsi(39);
const reset2 = genAnsi(49);

// ├┤─└┐┌┘│ genAnsi(44) + genAnsi(31) 47

let a = "sample text";

console.log(genAnsi(44));
console.clear();

let off = "   ";
let winsize = size.cols - 9;
cursorTo(0, (size.lines - 8) / 2);
console.log(off + genAnsi(47) + genAnsi(30) + "┌" + "─".repeat(winsize) + "┐");

console.log(genAnsi(44) + off + genAnsi(47) + "│" + " ".repeat(winsize) + "│" + genAnsi(40) + " " + genAnsi(47));
console.log(genAnsi(44) + off + genAnsi(47) + "│" + " ".repeat(winsize) + "│" + genAnsi(40) + " " + genAnsi(47));
console.log(genAnsi(44) + off + genAnsi(47) + "│" + " ".repeat(winsize) + "│" + genAnsi(40) + " " + genAnsi(47));
console.log(genAnsi(44) + off + genAnsi(47) + "│" + " ".repeat(winsize) + "│" + genAnsi(40) + " " + genAnsi(47));

console.log(genAnsi(44) + off + genAnsi(47) + genAnsi(30) + "└" + "─".repeat(winsize) + "┘" + genAnsi(40) + " " + genAnsi(47));
console.log(genAnsi(44) + off + " " + genAnsi(40) + " ".repeat(winsize + 2) + genAnsi(47));

while (true) {}
