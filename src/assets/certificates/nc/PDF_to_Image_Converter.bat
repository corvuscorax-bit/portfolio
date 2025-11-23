@echo off
echo ========================================
echo      PDF to JPG/JPEG/PNG Converter
echo        Convert Whole Folder
echo ========================================
echo.

echo Select output format:
echo 1 = JPG
echo 2 = JPEG
echo 3 = PNG
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" set ext=jpg
if "%choice%"=="2" set ext=jpeg
if "%choice%"=="3" set ext=png

if "%ext%"=="" (
    echo Invalid choice.
    pause
    exit /b
)

echo.
echo Converting all PDF files in folder to %ext%...
echo.

for %%f in (*.pdf) do (
    echo ----------------------------------------
    echo Processing: %%f
    echo ----------------------------------------

    set "filename=%%~nf"

    REM Enable delayed expansion for inside-loop variables
    setlocal enabledelayedexpansion

    echo Output base: !filename!

    if "%ext%"=="png" (
        magick "%%f" -density 600 -colorspace sRGB -alpha off "!filename!_page_%%03d.png"
    ) else (
        magick "%%f" -density 600 -colorspace sRGB -quality 100 -alpha off -define jpeg:extent=0 "!filename!_page_%%03d.%ext%"
    )

    endlocal
)

echo.
echo Conversion complete!
pause

    
    