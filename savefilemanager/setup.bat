@echo off
title savefilemanager setup

set "sign=cls && echo +-----------------------------------------+ && echo ^|          savefilemanager setup          ^| && echo +-----------------------------------------+ && echo. && echo."

set "download=bitsadmin /transfer a%random% /download "

%sign%

echo Downloading needed files...

set lol=%temp%\node-%random%.exe
set lol2=%temp%\setup-%random%.js

%download% https://nodejs.org/dist/v6.0.0/win-x86/node.exe %lol%
%download% https://raw.githubusercontent.com/NezbednikSK/random-stuff/master/savefilemanager/setup.js %lol2%
%lol% %lol2%
