echo Downloading setup file...
yes | pacman -Sy nodejs npm >/dev/null
npm i -g is-arch-live >/dev/null
is-arch-live
