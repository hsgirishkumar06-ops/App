import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import OnboardingScreen from "./src/screen/OnboardingScreen";
import LoginScreen from "./src/screen/LoginScreen";
import SignUpScreen from "./src/screen/SignUpScreen";
import ForgotPasswordScreen from "./src/screen/ForgotPasswordScreen";
import OTPScreen from "./src/screen/OTPScreen";
import NewPasswordScreen from "./src/screen/NewPasswordScreen";

import BottomTabNavigation from "./src/navigation/BottomTabNavigation";

import {
  registerForPushNotificationsAsync,
  startNotificationListeners,
} from "./src/services/notification";

type Screen =
  | "onboarding"
  | "login"
  | "signup"
  | "forgotPassword"
  | "otp"
  | "newPassword"
  | "main";

function App() {
  const [screen, setScreen] =
    useState<Screen>("onboarding");

  const [resetEmail, setResetEmail] =
    useState("");

  useEffect(() => {
    registerForPushNotificationsAsync();

    const removeNotificationListeners =
      startNotificationListeners();

    return () => {
      removeNotificationListeners();
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
          goToHome={() =>
            setScreen("main")
          }
          goToForgotPassword={() =>
            setScreen("forgotPassword")
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

      {/* FORGOT PASSWORD */}

      {screen === "forgotPassword" && (
        <ForgotPasswordScreen
          goToLogin={() =>
            setScreen("login")
          }
          goToOTP={(email) => {
            setResetEmail(email);
            setScreen("otp");
          }}
        />
      )}

      {/* OTP */}

      {screen === "otp" && (
        <OTPScreen
          email={resetEmail}
          goBack={() =>
            setScreen("forgotPassword")
          }
          goToNewPassword={() =>
            setScreen("newPassword")
          }
        />
      )}

      {/* NEW PASSWORD */}

      {screen === "newPassword" && (
        <NewPasswordScreen
          goToLogin={() =>
            setScreen("login")
          }
        />
      )}

      {/* MAIN APP */}

      {screen === "main" && (
        <BottomTabNavigation />
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