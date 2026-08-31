import React, { useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import OnboardingScreen from "./src/screen/OnboardingScreen";
import LoginScreen from "./src/screen/LoginScreen";
import SignUpScreen from "./src/screen/SignUpScreen";

type Screen =
  | "onboarding"
  | "login"
  | "signup";

function App() {
  const [screen, setScreen] =
    useState<Screen>("onboarding");

  return (
    <View style={styles.container}>

      {screen === "onboarding" && (
        <OnboardingScreen
          goToLogin={() =>
            setScreen("login")
          }
        />
      )}

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

const styles = {
  container: {
    flex: 1,
  },
};

export default App;