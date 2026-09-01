import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import OnboardingScreen from "./src/screen/OnboardingScreen";
import LoginScreen from "./src/screen/LoginScreen";
import SignUpScreen from "./src/screen/SignUpScreen";

import {
  registerForPushNotificationsAsync,
  startNotificationListeners,
} from "./src/services/notification";

type Screen = "onboarding" | "login" | "signup";

function App() {
  const [screen, setScreen] =
    useState<Screen>("onboarding");

  useEffect(() => {
    // Register device for push notifications
    registerForPushNotificationsAsync();

    // Start notification listeners
    const removeNotificationListeners =
      startNotificationListeners();

    // Remove listeners when App is unmounted
    return () => {
      removeNotificationListeners();
    };
  }, []);

  return (
    <View style={styles.container}>

      {/* ONBOARDING */}
      {screen === "onboarding" && (
        <OnboardingScreen
          goToLogin={() => setScreen("login")}
        />
      )}

      {/* LOGIN */}
      {screen === "login" && (
        <LoginScreen
          goToSignUp={() => setScreen("signup")}
          goToOnboarding={() =>
            setScreen("onboarding")
          }
        />
      )}

      {/* SIGN UP */}
      {screen === "signup" && (
        <SignUpScreen
          goToLogin={() => setScreen("login")}
        />
      )}

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;