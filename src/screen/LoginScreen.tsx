import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CustomInput from "../components/CustomInput";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/CustomButton";
import colors from "../theme/theme";

type Props = {
  goToSignUp: () => void;
  goToOnboarding: () => void;
  goToHome: () => void;
};

export default function LoginScreen({
  goToSignUp,
  goToOnboarding,
  goToHome,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      )
    ) {
      setEmailError("Enter a valid email");
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "Password must be at least 6 characters"
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Login successful
    Alert.alert(
      "Login Successful",
      "Welcome back!",
      [
        {
          text: "Continue",
          onPress: () => {
            goToHome();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={goToOnboarding}
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </TouchableOpacity>

          {/* Header */}

          <View style={styles.header}>
            <Text style={styles.title}>
              Welcome Back
            </Text>

            <Text style={styles.subtitle}>
              Login to continue to your account
            </Text>
          </View>

          {/* Email */}

          <View style={styles.inputContainer}>
           <CustomInput
  label="Email"
  icon="mail-outline"
  placeholder="Enter your email"
  value={email}
  onChangeText={(text) => {
    setEmail(text);
    setEmailError("");
  }}
  keyboardType="email-address"
/>

            {emailError ? (
              <Text style={styles.errorText}>
                {emailError}
              </Text>
            ) : null}
          </View>

          {/* Password */}

          <View style={styles.inputContainer}>
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError("");
              }}
            />

            {passwordError ? (
              <Text style={styles.errorText}>
                {passwordError}
              </Text>
            ) : null}
          </View>

          {/* Forgot Password */}

          <TouchableOpacity
            style={styles.forgotButton}
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Login"
              onPress={handleLogin}
            />
          </View>

          {/* Sign Up */}

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={goToSignUp}
            >
              <Text style={styles.signupLink}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 25,
    color: colors.text,
    marginTop: -2,
  },

  header: {
    marginTop: 35,
    marginBottom: 35,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 8,
  },

  inputContainer: {
    marginBottom: 18,
  },

  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 25,
  },

  forgotText: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: "500",
  },

  buttonContainer: {
    marginTop: 5,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  signupText: {
    color: colors.gray,
    fontSize: 13,
  },

  signupLink: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 5,
  },
});