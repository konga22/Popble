import "../global.css";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NavigationRoot from "../src/global/navigation/NavigationContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <NavigationRoot />
    </SafeAreaProvider>
  );
}
