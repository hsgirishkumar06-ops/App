import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";

// ========================================
// AUTH SCREENS
// ========================================

import OnboardingScreen from "./src/screen/OnboardingScreen";
import LoginScreen from "./src/screen/LoginScreen";
import SignUpScreen from "./src/screen/SignUpScreen";

import ForgotPasswordScreen from "./src/screen/ForgotPasswordScreen";
import OTPScreen from "./src/screen/OTPScreen";
import NewPasswordScreen from "./src/screen/NewPasswordScreen";

// ========================================
// DOCTOR CONSULTATION
// ========================================

import DoctorConsultationScreen from "./src/screen/DoctorConsultationScreen";

// ========================================
// MAIN NAVIGATION
// ========================================

import BottomTabNavigation from "./src/navigation/BottomTabNavigation";

// ========================================
// NOTIFICATIONS
// ========================================

import {
  registerForPushNotificationsAsync,
  startNotificationListeners,
} from "./src/services/notification";

// ========================================
// SCREEN TYPES
// ========================================

type Screen =
  | "onboarding"
  | "login"
  | "signup"
  | "forgotPassword"
  | "otp"
  | "newPassword"
  | "main"
  | "doctorConsultation";

// ========================================
// APP
// ========================================

function App() {

  // ========================================
  // CURRENT SCREEN
  // ========================================

  const [screen, setScreen] =
    useState<Screen>("onboarding");

  // ========================================
  // RESET PASSWORD EMAIL
  // ========================================

  const [resetEmail, setResetEmail] =
    useState("");

  // ========================================
  // NOTIFICATION INITIALIZATION
  // ========================================

  useEffect(() => {

    registerForPushNotificationsAsync();

    const removeNotificationListeners =
      startNotificationListeners();

    return () => {
      removeNotificationListeners();
    };

  }, []);

  // ========================================
  // APP UI
  // ========================================

  return (
    <View style={styles.container}>

      {/* ========================================
          ONBOARDING
      ======================================== */}

      {screen === "onboarding" && (
        <OnboardingScreen
          goToLogin={() => {
            setScreen("login");
          }}
        />
      )}

      {/* ========================================
          LOGIN
      ======================================== */}

      {screen === "login" && (
        <LoginScreen

          goToSignUp={() => {
            setScreen("signup");
          }}

          goToOnboarding={() => {
            setScreen("onboarding");
          }}

          goToHome={() => {
            setScreen("main");
          }}

          goToForgotPassword={() => {
            setScreen("forgotPassword");
          }}

        />
      )}

      {/* ========================================
          SIGN UP
      ======================================== */}

      {screen === "signup" && (
        <SignUpScreen
          goToLogin={() => {
            setScreen("login");
          }}
        />
      )}

      {/* ========================================
          FORGOT PASSWORD
      ======================================== */}

      {screen === "forgotPassword" && (
        <ForgotPasswordScreen

          goToLogin={() => {
            setScreen("login");
          }}

          goToOTP={(email) => {
            setResetEmail(email);
            setScreen("otp");
          }}

        />
      )}

      {/* ========================================
          OTP
      ======================================== */}

      {screen === "otp" && (
        <OTPScreen

          email={resetEmail}

          goBack={() => {
            setScreen("forgotPassword");
          }}

          goToNewPassword={() => {
            setScreen("newPassword");
          }}

        />
      )}

      {/* ========================================
          NEW PASSWORD
      ======================================== */}

      {screen === "newPassword" && (
        <NewPasswordScreen
          goToLogin={() => {
            setScreen("login");
          }}
        />
      )}

      {/* ========================================
          MAIN APPLICATION
      ======================================== */}

      {screen === "main" && (
        <BottomTabNavigation

          goToLogin={() => {
            setScreen("login");
          }}

          goToConsultation={() => {
            setScreen(
              "doctorConsultation"
            );
          }}

        />
      )}

      {/* ========================================
          DOCTOR CONSULTATION
      ======================================== */}

      {screen === "doctorConsultation" && (
        <DoctorConsultationScreen

          goBack={() => {
            setScreen("main");
          }}

        />
      )}

      {/* ========================================
          STATUS BAR
      ======================================== */}

      <StatusBar style="auto" />

    </View>
  );
}

// ========================================
// STYLES
// ========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

});

export default App;