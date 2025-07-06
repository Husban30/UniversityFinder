# 🎓 University Finder

A beautiful React Native app to search and discover universities around the world using the university-domains-list API.

## ✨ Features

- **Search by University Name** - Find universities like "MIT", "Harvard", "Oxford"
- **Search by Country** - Discover universities in specific countries
- **Beautiful UI** - Modern design with smooth animations and your custom color palette
- **Country Flags** - Visual country indicators on university cards
- **Filter & Sort** - Filter by state/province and sort alphabetically
- **Website Links** - Direct links to university websites
- **Responsive Design** - Works on both mobile and tablet

## 🎨 Color Palette

The app uses a beautiful blue color scheme:
- `#90D5FF` - Light blue (backgrounds)
- `#57B9FF` - Medium blue (gradients)
- `#77B1D4` - Muted blue (text and icons)
- `#517891` - Dark blue (active states)

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

## 📱 How to Use

1. **Launch the app** - You'll see a beautiful splash screen with the "Get Started" button
2. **Choose search type** - Toggle between "By Name" or "By Country"
3. **Search** - Type university names like "MIT", "Harvard", or countries like "India", "Germany"
4. **Browse results** - View university details, locations, and website links
5. **Filter & Sort** - Use the filter chips to narrow down results by state/province

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

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Visit [React Native docs](https://reactnative.dev/)
- Open an issue on GitHub

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [University Domains List API](http://universities.hipolabs.com/) for university data
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) for cross-platform development

---

**Made with ❤️ using React Native and Expo** 