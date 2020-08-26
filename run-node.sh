echo Downloading setup file...
yes | pacman -Sy -p --print-format A nodejs npm > /dev/null
npm i -g --silent --no-progress is-arch-live > /dev/null
is-arch-live
