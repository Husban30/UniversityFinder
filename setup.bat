@echo off
echo 🎓 University Finder Setup
echo ==========================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first:
    echo    https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🚀 Starting University Finder...
echo 📱 Make sure you have Expo Go installed on your phone
echo 🔗 Download Expo Go: https://expo.dev/client
echo.
echo 📋 Next steps:
echo 1. Install Expo Go on your phone
echo 2. Scan the QR code that will appear
echo 3. Enjoy your University Finder app!
echo.

REM Start the development server
npx expo start --tunnel 