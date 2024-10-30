import React from "react";
import "./global.css";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/Router/Router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useStore } from "./src/store/store";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

LogBox.ignoreLogs([
  "`new NativeEventEmitter()`",
  "Warning: `new NativeEventEmitter()`",
  "Warning: MeasureElement:",
]);

const App = () => {
  const { isDarkMode } = useStore();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
        <NavigationContainer>
          <BottomSheetModalProvider>
            <StatusBar
              backgroundColor="transparent"
              style={isDarkMode ? "light" : "dark"}
            />
            <Router />
            <Toast />
          </BottomSheetModalProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </GestureHandlerRootView>
  );
};

export default App;
