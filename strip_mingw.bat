@echo off
cd mingw%1
rmdir /S /Q etc include licenses opt share
del /f /q build-info.txt
cd bin
move g++.exe ..
del /f /q *
cd ..
move g++.exe bin
cd lib
del /f /q *.a
cd gcc/%2-w64-mingw32
rmdir /S /Q lib lib32 lib64
cd 8.1.0
del /f /q *.o liba*.a libq*.a libss* libsu* libcaf*.a libgf* libgo* libgco* *dll*
rmdir /S /Q 32 finclude include-fixed install-tools 64
cd include
del /f /q *.h
rmdir /S /Q ssp
cd c++
move cctype ..
move cerrno ..
move clocale ..
move cstdint ..
move cstdio ..
move cstdlib ..
move cwchar ..
move cwctype ..
move deque ..
move exception ..
move initializer_list ..
move ios ..
move iosfwd ..
move iostream ..
move istream ..
move new ..
move ostream ..
move stack ..
move stdexcept ..
move streambuf ..
move string ..
move system_error ..
move type_traits ..
move typeinfo ..
del /f /q *
rmdir /S /Q decimal experimental parallel profile tr1 tr2
cd ..
move * c++
cd c++
cd ../../../../../../libexec/gcc/%2-w64-mingw32/8.1.0
rmdir /S /Q install-tools
del /f /q *.dll.a lto* cc1.exe co* f*
cd ../../../../%2-w64-mingw32
rmdir /S /Q lib32 lib64
cd bin
del /f /q d* n* o* r* s* ar.exe ld.*.exe
cd ../include
mkdir temp
move _mingw.h temp
move _mingw_mac.h temp
move _mingw_off_t.h temp
move _mingw_print_pop.h temp
move _mingw_print_push.h temp
move _mingw_secapi.h temp
move _mingw_stat64.h temp
move crtdefs.h temp
move ctype.h temp
move errno.h temp
move limits.h temp
move locale.h temp
move malloc.h temp
move stddef.h temp
move stdint.h temp
move stdio.h temp
move stdlib.h temp
move vadefs.h temp
move wchar.h temp
move wctype.h temp
move swprintf.inl temp
move wctype.h temp
del /f /q *.*
cd temp
move * ..
cd ..
rmdir /S /Q ddk gdiplus GL psdk_inc sys temp wrl
cd sec_api
rmdir /S /Q sys
del /f /q c* m* sea* str* t*
cd ../../lib
mkdir temp
move crt2.o temp
move crtbegin.o temp
move crtend.o temp
move desktop.ini temp
move libadvapi32.a temp
move libiconv.a temp
move libkernel32.a temp
move libmingw32.a temp
move libmingwex.a temp
move libmoldname.a temp
move libmsvcrt.a temp
move libshell32.a temp
move libuser32.a temp
del /f /q *.*
cd temp
move * ..
cd ..
rmdir /S /Q ldscripts temp
cd ../../..
