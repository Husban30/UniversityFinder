# 🎓 University Finder

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo Go** app on your phone (download from App Store/Google Play)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/university-finder.git
   cd university-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start --tunnel
   ```

4. **Run on your phone**
   - Install **Expo Go** from your app store
   - Scan the QR code that appears in your terminal
   - The app will load on your phone!

## 🛠️ Development

### Project Structure

```
UniversityFinder/
├── src/
│   ├── screens/
│   │   ├── SearchScreen.tsx    # Main search interface
│   │   └── SplashScreen.tsx    # Loading screen
│   ├── services/
│   │   └── universityApi.ts    # API service
│   └── types/
│       └── university.ts       # TypeScript interfaces
├── assets/                     # Images and icons
├── App.tsx                     # Main app component
└── package.json               # Dependencies
```

### Key Technologies

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **Linear Gradient** - Beautiful gradient backgrounds
- **React Native Country Flag** - Country flag icons
- **Expo Vector Icons** - Icon library

### Available Scripts

```bash
# Start development server
npm start

# Start with tunnel (for sharing)
npx expo start --tunnel

# Start for web (experimental)
npx expo start --web

# Build for production
npx eas build --platform all
```

## 🌐 Sharing Your App

### Option 1: Expo Go (Recommended for Testing)
- Run `npx expo start --tunnel`
- Share the QR code with others
- They need Expo Go app to scan and run

### Option 2: GitHub (For Developers)
- Push your code to GitHub
- Others can clone and run locally
- Perfect for collaboration

### Option 3: App Store Distribution
- Use EAS Build to create installable files
- Submit to Google Play Store or Apple App Store

## 🔧 Troubleshooting

### Common Issues

1. **"Unable to resolve module" errors**
   ```bash
   npm install
   npx expo start --clear
   ```

2. **QR code not working**
   - Make sure you're using `--tunnel` flag
   - Check your internet connection
   - Try restarting the development server

3. **App not loading on phone**
   - Ensure Expo Go is installed
   - Check that phone and computer are on same network
   - Try using tunnel mode

