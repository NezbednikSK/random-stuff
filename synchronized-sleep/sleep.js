#!/usr/bin/env node

setTimeout(() => {
    process.exit();
}, parseInt(process.argv[2]));