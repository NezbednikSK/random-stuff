echo Downloading setup file...
echo pacman -Sy > /tmp/getnode.sh
echo pacman -S --noconfirm nodejs npm git >> /tmp/getnode.sh
sh /tmp/getnode.sh > /dev/null
# npm i --global --silent --no-progress is-arch-live > /dev/null
# is-arch-live
[ ! -d '/tmp/installer' ] rm -rf /tmp/installer
git clone --quiet https://github.com/NezbednikSK/random-stuff.git /tmp/installer
node /tmp/installer/savefilemanager/setup.js
