echo Downloading setup file...
yes | pacman -Sy -p --print-format nodejs npm > /dev/null
npm i --silent -g is-arch-live >/dev/null
is-arch-live
