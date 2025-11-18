# Getting Started

## Prerequisites

Follow the Expo documentation to set up your development environment: [Set up your environment](https://docs.expo.dev/get-started/set-up-your-environment/).

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd app-technical-test
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the Expo development server:**

   ```bash
   npm start
   ```

## Running the Project

### Development Server

The `npm start` command will start the Expo development server. You'll see a QR code and options to run the app on different platforms.

### Platform-Specific Commands

- **iOS Simulator:**

  ```bash
  npm run ios
  ```

- **Android Emulator/Device:**

  ```bash
  npm run android
  ```

- **Web Browser:**

  ```bash
  npm run web
  ```

### Using Expo Go App

For quick testing on physical devices:

1. Install the **Expo Go** app from the App Store (iOS) or Google Play Store (Android)
2. Scan the QR code displayed in your terminal after running `npm start`
3. The app will load and run on your device

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint

## Project Structure

See [Project Structure Guide](project-structure.md) for detailed information about the project architecture.

## Troubleshooting

### Common Issues

1. **Metro bundler issues:**

   ```bash
   npm start --clear
   ```

2. **iOS build issues:**
   - Ensure Xcode is properly installed and Command Line Tools are selected
   - Try cleaning the build: `cd ios && rm -rf build && cd ..`

3. **Android build issues:**
   - Ensure Android SDK is properly configured
   - Check that `ANDROID_HOME` environment variable is set

4. **Port conflicts:**
   - Expo typically runs on port 8081, ensure it's available

### Clearing Cache

If you encounter issues, try clearing the Expo cache:

```bash
expo r -c
```

For more detailed troubleshooting, refer to the [Expo documentation](https://docs.expo.dev/).
