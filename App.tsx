import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";

import OnboardingScreen from "./src/screen/OnboardingScreen";
import LoginScreen from "./src/screen/LoginScreen";
import SignUpScreen from "./src/screen/SignUpScreen";

import {
  registerForPushNotificationsAsync,
} from "./src/services/notification";

// Notification display settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

type Screen = "onboarding" | "login" | "signup";

function App() {
  const [screen, setScreen] =
    useState<Screen>("onboarding");

  useEffect(() => {
    // Register for Expo Push Notifications
    registerForPushNotificationsAsync();

    // Listen when notification is received
    const notificationListener =
      Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log(
            "Notification received:",
            notification
          );
        }
      );

    // Listen when user taps notification
    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log(
            "Notification tapped:",
            response
          );
        }
      );

    // Cleanup listeners
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>

      {/* ONBOARDING */}
      {screen === "onboarding" && (
        <OnboardingScreen
          goToLogin={() =>
            setScreen("login")
          }
        />
      )}

      {/* LOGIN */}
      {screen === "login" && (
        <LoginScreen
          goToSignUp={() =>
            setScreen("signup")
          }
          goToOnboarding={() =>
            setScreen("onboarding")
          }
        />
      )}

      {/* SIGN UP */}
      {screen === "signup" && (
        <SignUpScreen
          goToLogin={() =>
            setScreen("login")
          }
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