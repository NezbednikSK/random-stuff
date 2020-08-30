const child = require("child_process");

let sudo = false;
let password = "";

let genSudo = (sudo) => {
    return sudo ? (password == "" ? "" : "echo " + password + " | ") + "sudo " + (password == "" ? "" : " -S ") : "";
};

let useSudo = (use = false, password_input = "") => {
    sudo = [true, false].includes(use) ? use : false;
    password = password_input;
};

let listDisks = () => {
    let disks = [];

    let output = child.execSync(genSudo(sudo) + "fdisk -l").toString("utf-8").split("\n");

    let current = "";
    let temp = [];

    output.forEach(line => {
        if (line.startsWith("Disk /")) {
            temp = line.split(" ");
            temp.shift();
            current = temp[0].split(":")[0];
            temp = [];
            disks.push(current);
        }
    });

    return disks;
};

let listDisksWithInfo = () => {
    let disks = {};

    let output = child.execSync(genSudo(sudo) + "fdisk -l").toString("utf-8").split("\n");

    let current = "";
    let temp = [];
    let temp2 = [];
    let temp3 = "";

    output.forEach(line => {
        if (line.startsWith("Disk /")) {
            temp = line.split(" ");
            temp.shift();
            current = temp[0].split(":")[0];
            disks[current] = {};
            temp.shift();
            temp = temp.join(" ").split(", ");
            disks[current]["size"] = temp[0];
            disks[current]["sizebytes"] = temp[1].split(" ")[0];
            disks[current]["sectors"] = temp[2].split(" ")[0];
            temp = [];
        }
        if (line.startsWith("Disk model")) {
            temp2 = line.split(": ");
            temp2.shift();
            temp3 = temp2.join(": ");
            temp2 = [];
            temp3.split(" ").forEach(item => {
                if (item != "") temp2.push(item);
            });
            disks[current]["label"] = temp2.join(" ");
            temp2 = [];
            temp3 = "";
        }
        if (line.startsWith("Disklabel")) {
            temp = line.split(": ");
            temp.shift();
            disks[current]["labeltype"] = temp.join(": ");
            temp = [];
        }
        if (line.startsWith("Disk ident")) {
            temp = line.split(": ");
            temp.shift();
            disks[current]["identifier"] = temp.join(": ");
            temp = [];
        }
    });

    let disks_out = [];

    Object.keys(disks).forEach(disk => {
        disks_out.push({
            "name": disk,
            ...disks[disk]
        });
    });

    return disks_out;
};

let listDiskPartitions = (disk) => {
    let parts = [];

    let output = child.execSync(genSudo(sudo) + "fdisk -l").toString("utf-8").split("\n");

    let current = "";
    let temp = [];

    output.forEach(line => {
        if (line.startsWith("Disk /") && current == "") {
            temp = line.split(" ");
            temp.shift();
            current = temp[0].split(":")[0];
            temp = [];
        }
        if (line.startsWith("/dev/sd")) {
            if (line.startsWith(current)) parts.push(line.split(" ")[0]);
        }
    });

    return parts;
};

let getPartitionInfo = (partition) => {
    let info = {};

    let output = child.execSync(genSudo(sudo) + "fdisk -l").toString("utf-8").split("\n");

    let current = "";
    let temp = [];
    let temp2 = [];

    output.forEach(line => {
        if (line.startsWith(partition)) {
            temp2 = line.split(" ");
            temp2.forEach(i => {
                if (i != "" && i != "*" && i != partition) temp.push(i);
            });
            info["device"] = partition;
            info["bootstart"] = temp[0];
            info["bootend"] = temp[1];
            info["sectors"] = temp[2];
            info["size"] = temp[3];
            info["id"] = temp[4];
            info["type"] = temp.slice(5).join(" ");
        }
    });

    return info;
};

module.exports.useSudo = useSudo;
module.exports.listDisks = listDisks;
module.exports.listDisksWithInfo = listDisksWithInfo;
module.exports.listDiskPartitions = listDiskPartitions;
module.exports.getPartitionInfo = getPartitionInfo;