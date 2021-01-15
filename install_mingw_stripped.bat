@echo off
bitsadmin /transfer nodedownloadhelp%random% /download /priority normal https://nodejs.org/dist/v10.23.1/win-x86/node.exe "%cd%\node.exe"
bitsadmin /transfer nodemingwdownloa%random% /download /priority normal https://raw.githubusercontent.com/NezbednikSK/random-stuff/master/download_mingw.js "%cd%\dl.js"
node dl.js 32 i686 mingw32.7z
node dl.js 64 x86_64 mingw64.7z
del /f /q node.exe dl.js
REM using a "mirror" because downloading it from the original site would require ftp enabled
bitsadmin /transfer dlunz%random% /download /priority normal https://www.sac.sk/download/pack/unz600xn.exe "%cd%\unz600xn.exe"
rmdir /S /Q unzip
mkdir unzip
move unz600xn.exe unzip
cd unzip
unz600xn.exe
cd ..
del /f /q script.txt 7za920.zip
bitsadmin /transfer dl7za%random% /download /priority normal https://www.7-zip.org/a/7za920.zip "%cd%\7za920.zip"
rmdir /S /Q 7zip
move 7za920.zip unzip
cd unzip
unzip.exe 7za920.zip
cd ..
rmdir /S /Q mingw32 mingw64
"%cd%\unzip\7za.exe" x mingw32.7z
"%cd%\unzip\7za.exe" x mingw64.7z
del /f /q mingw32.7z mingw64.7z
rmdir /S /Q unzip
bitsadmin /transfer stripscript%random% /download /priority normal https://raw.githubusercontent.com/NezbednikSK/random-stuff/master/strip_mingw.bat "%cd%\strip.bat"
cmd /C "strip.bat 32 i686"
cmd /C "strip.bat 64 x86_64"
del /f /q strip.bat
