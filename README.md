# Micro Budgeting App

A gamified budgeting app where a character visually changes based on how much you spend in a category. The more you spend, the worse the character looks!

Built with React Native, Expo, and TypeScript - configured for New Architecture support.

## Features

- **Gamified Character States**: Character changes from happy 😊 to ruined 💀 based on spending
- **Simple Budget Tracking**: Track spending in a single category with a monthly budget
- **Transaction Management**: Add, view, and delete transactions
- **Persistent Storage**: Data saved locally using AsyncStorage
- **Clean UI**: Modern, playful design with smooth animations
- **New Architecture Ready**: Configured for React Native's New Architecture

## Tech Stack

- **React Native** with **Expo SDK 54**
- **TypeScript**
- **React Navigation** for screen navigation
- **AsyncStorage** for local data persistence
- **Expo Linear Gradient** for character backgrounds
- **New Architecture enabled** for both iOS and Android

## Prerequisites

- Node.js (LTS version recommended)
- Expo Go app on your mobile device

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Running the App

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

Then scan the QR code with:
- **iOS**: Camera app (opens in Expo Go)
- **Android**: Expo Go app

## Character States

The character has 5 states based on spending percentage:

- **😊 Happy** (0-30%): "You're doing great! 🌟"
- **😐 Neutral** (30-60%): "Looking good so far"
- **😰 Nervous** (60-85%): "Careful now... 👀"
- **😫 Stressed** (85-100%): "Maybe skip takeout tonight 😅"
- **💀 Ruined** (100%+): "This is getting out of hand! 😱"

## New Architecture Configuration

This app is configured with New Architecture enabled via `expo-build-properties` plugin in [app.json](app.json):

- Android: `newArchEnabled: true`
- iOS: `newArchEnabled: true`

This ensures compatibility with React Native's modern architecture, including:
- Fabric (new rendering system)
- TurboModules (new native modules system)
- Codegen for type-safe native interfaces

## Project Structure

```
micro-budgeting-app/
├── App.tsx                      # Navigation setup
├── app.json                     # Expo configuration
├── babel.config.js              # Babel configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── src/
    ├── components/
    │   ├── ui/                  # Reusable UI components
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   └── Card.tsx
    │   ├── Character.tsx        # Animated character component
    │   └── ProgressBar.tsx      # Budget progress bar
    ├── context/
    │   └── BudgetContext.tsx    # Global state management
    └── screens/
        ├── HomeScreen.tsx
        ├── SetupScreen.tsx
        ├── AddSpendingScreen.tsx
        └── TransactionsScreen.tsx
```
