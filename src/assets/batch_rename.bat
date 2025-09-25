@echo off
setlocal enabledelayedexpansion

rem === set working folder ===
set "folder=%cd%"
cd /d "%folder%"

set counter=1

for %%F in (*.jpg *.jpeg) do (
    rem rename file to sequential img#
    ren "%%F" "img!counter!.png"
    set /a counter+=1
)

echo Done! Renamed !counter!-1 files to imgX.png
pause
