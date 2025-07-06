#!/bin/bash

echo "🎓 University Finder Setup"
echo "=========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🚀 Starting University Finder..."
echo "📱 Make sure you have Expo Go installed on your phone"
echo "🔗 Download Expo Go: https://expo.dev/client"
echo ""
echo "📋 Next steps:"
echo "1. Install Expo Go on your phone"
echo "2. Scan the QR code that will appear"
echo "3. Enjoy your University Finder app!"
echo ""

# Start the development server
npx expo start --tunnel 