echo Downloading setup file...
echo pacman -Sy > /tmp/getnode.sh
echo pacman -S nodejs npm >> /tmp/getnode.sh
sh /tmp/getnode.sh > /dev/null
is-arch-live
