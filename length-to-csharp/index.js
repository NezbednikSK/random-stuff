const fs = require("fs");

if (process.argv.includes("--help") || process.argv.includes("-h")) {
	console.log("Usage: node index.js --input <file> --output <file>");
	console.log("Add --debug for debugging purposes");
	process.exit(0);
}

var findex = process.argv.indexOf("--input");
if (findex == -1) findex = process.argv.indexOf("-i");
var fname = "input.len";
if (findex != -1) {
    try {
        fname = process.argv[findex + 1];
    }
    catch(e) {}
}
if (!fs.existsSync(fname)) {
    console.log("Invalid input!");
    process.exit(1);
}
var findex2 = process.argv.indexOf("--output");
if (findex2 == -1) findex2 = process.argv.indexOf("-o");
var fnamein = "output.cs";
if (findex2 != -1) {
    try {
        fnamein = process.argv[findex2 + 1];
    }
    catch(e) {}
}
var debug = process.argv.includes("--debug") || process.argv.includes("-d");
var codetemp = fs.readFileSync(fname, "utf-8").split("\r").join("").split("\n");
var code = [];
codetemp.forEach(x => {
    code.push(x.length);
});
var instructions = [9, 10, 11, 12, 13, 14, 15, 16, 20, 21, 24, 25];
var included = [];
code.filter(x => instructions.includes(x)).forEach(x => {
    if (!included.includes(x)) included.push(x);
});
var codestr = "using System;using System.Collections.Generic;class P{public static void Main(string[] a){List<int> b=new List<int>();";
codestr += "List<int> c=new List<int>{" + code.join(",") + "};";
codestr += "for(int d=0;d<c.Count;d++){";
if (debug) {
    codestr = "using System.Threading;" + codestr;
    codestr += "Thread.Sleep(3000);Console.WriteLine(\"instruction: \" + c[d]);Console.WriteLine(\"line: \" + (d + 1).ToString());";
}
codestr += "switch(c[d]){";
if (included.includes(10)) codestr += "case 10:int e=b[0];int f=b[1];b.RemoveRange(0,2);b.Insert(0,e+f);break;";
if (included.includes(11)) codestr += "case 11:int j=b[0];int k=b[1];b.RemoveRange(0,2);b.Insert(0,k-j);break;";
if (included.includes(20)) codestr += "case 20:int g=b[0];int h=b[1];b.RemoveRange(0,2);b.Insert(0,g*h);break;";
if (included.includes(21)) codestr += "case 21:int l=b[0];int m=b[1];b.RemoveRange(0,2);b.Insert(0,m/l);break;";
if (included.includes(13)) codestr += "case 13:int p=b[0];b.RemoveAt(0);if(p==0){d++;if(c[d]==14||c[d]==25){d++;}};break;";
if (included.includes(14)) codestr += "case 14:d=c[d+1]-1;break;";
if (included.includes(24)) codestr += "case 24:int q=b[0];b.RemoveAt(0);c=q;break;";
if (included.includes(15)) codestr += "case 15:int n=b[0];b.RemoveAt(0);Console.Write(n.ToString());break;";
if (included.includes(16)) codestr += "case 16:int i=b[0];b.RemoveAt(0);Console.Write(Convert.ToChar(i).ToString());break;";
if (included.includes(12)) codestr += "case 12:b.Insert(0,b[0]);break;";
if (included.includes(25)) codestr += "case 25:b.Insert(0,c[d+1]);d++;break;";
if (included.includes(9)) codestr += "case 9:Console.WriteLine(\"Input:\");string o=Console.ReadLine();if(o.Length>0){b.Insert(0,(int)o[0]);}else{b.Insert(0,13);};break;";
codestr += "}";
if (debug) codestr += "Console.WriteLine(\"stack: \" + String.Join(\" \",b.ToArray()));";
codestr += "}}}";
fs.writeFileSync(fnamein, codestr);
