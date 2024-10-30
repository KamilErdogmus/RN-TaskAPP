# Task-APP in React Native-Expo

## Description

Task-APP is a simple and intuitive task management app built with React Native and Expo. It allows users to create, edit, and delete tasks easily while storing data locally using AsyncStorage. The app offers a modern UI with UI Kitten and TailwindCSS, and supports voice input via @react-native-voice/voice for hands-free task creation. Zustand manages the app's state, and smooth animations are powered by react-native-reanimated. Form handling is handled with Formik and Yup, and users receive feedback via Toast messages for a seamless experience.

## Libraries and Tools

- **@eva-design/eva**: Provides customizable UI components based on the Eva Design System for building elegant user interfaces.
- **@expo/vector-icons**: Offers a wide range of customizable icons for use throughout the app.
- **@gorhom/bottom-sheet**: Implements bottom sheet modals for interactive user actions.
- **@react-native-async-storage/async-storage**: Handles persistent data storage, allowing users' tasks to be saved locally.
- **@react-native-voice/voice**: Enables voice input for task creation, adding hands-free functionality to the app.
- **@react-navigation/native**: Manages in-app navigation, allowing users to switch between screens seamlessly.
- **@react-navigation/native-stack**: Provides stack-based navigation for intuitive user transitions between screens.
- **@ui-kitten/components**: Offers a flexible UI framework for building responsive and styled components.
- **expo-status-bar**: Manages the status bar appearance on different platforms.
- **expo-system-ui**: Customizes system-wide UI elements such as background color and status bar.
- **formik**: Simplifies form handling and validation within the app.
- **moment**: A library for managing and formatting dates within the app.
- **nativewind**: A utility-first CSS framework that provides a convenient way to style components in React Native.
- **react-native-gesture-handler**: Enhances touch gestures and interactions within the app.
- **react-native-reanimated**: Powers smooth and performant animations within the app.
- **react-native-safe-area-context**: Ensures the app content is properly displayed in the safe areas of various devices.
- **react-native-screens**: Improves navigation performance by using native screen components.
- **react-native-svg**: Supports scalable vector graphics (SVG) rendering within the app.
- **react-native-toast-message**: Displays toast notifications for in-app feedback like task creation or deletion confirmation.
- **react-native-uuid**: Generates unique identifiers, particularly useful for assigning IDs to tasks.
- **tailwindcss**: Provides a utility-first CSS framework for rapid and consistent UI styling.
- **yup**: Works with Formik to provide schema-based form validation.
- **zustand**: A small, fast, and scalable state management library for managing the app's state effectively.

## Preview

<img src="assets/GIF.gif" height="500" />

## Installation

To run the project locally follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/KamilErdogmus/RN-TaskAPP
```

2. Navigate to the project directory:

```bash
cd your-repository
```

3. Install dependencies:

#### Using npm

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

If you're using MacOS, navigate to the ios folder and install CocoaPods dependencies:

```bash
cd ios
```

```bash
 pod install
```

```bash
 cd ..
```

## Step 1: Start the Metro Server

First, you'll need to start **Metro**, the JavaScript _bundler_ that comes with React Native.

To start Metro, run the following command from the _root_ of your React Native project:

#### Using npm

```bash
npx expo start
```

#### Using Yarn

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

### If you want to use Voice please run this code

#### Using npm

```bash
npx expo run android
```

#### Using Yarn

```bash
yarn android
```

### For iOS

##### using npm

```bash
npx expo run ios
```

#### Using Yarn

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
