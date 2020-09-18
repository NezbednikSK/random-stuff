yes | pacman -Sy nodejs-lts-dubnium npm &> /dev/null
curl -s -o /tmp/index.js https://raw.githubusercontent.com/NezbednikSK/random-stuff/master/arch/index.js
curl -s -o /tmp/package.json https://raw.githubusercontent.com/NezbednikSK/random-stuff/master/arch/package.json
cd /tmp
npm i &> /dev/null
node index.js
