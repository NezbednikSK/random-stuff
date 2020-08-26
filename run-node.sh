echo Downloading setup file...
echo pacman -Sy > /tmp/getnode.sh
echo pacman -S --noconfirm nodejs npm >> /tmp/getnode.sh
sh /tmp/getnode.sh > /dev/null
npm i --global --silent --no-progress is-arch-live > /dev/null
is-arch-live
