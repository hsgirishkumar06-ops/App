import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomInput from "../components/CustomInput";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/CustomButton";
import colors from "../theme/theme";

type Props = {
  goToSignUp: () => void;
  goToOnboarding: () => void;
  goToHome: () => void;
  goToForgotPassword: () => void;
};

export default function LoginScreen({
  goToSignUp,
  goToOnboarding,
  goToHome,
  goToForgotPassword,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // =====================================================
  // CUSTOM POPUP
  // =====================================================

  const [popupVisible, setPopupVisible] =
    useState(false);

  // =====================================================
  // LOGIN
  // =====================================================

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
    setPopupVisible(true);
  };

  // =====================================================
  // POPUP CONTINUE
  // =====================================================

  const handleContinue = () => {
    setPopupVisible(false);
    goToHome();
  };

  return (
    <>
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

            {/* =================================================
                HEADER
            ================================================= */}

            <View style={styles.header}>
              <Text style={styles.title}>
                Welcome Back
              </Text>

              <Text style={styles.subtitle}>
                Login to continue to your account
              </Text>
            </View>

            {/* =================================================
                EMAIL
            ================================================= */}

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

            {/* =================================================
                PASSWORD
            ================================================= */}

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

            {/* =================================================
                FORGOT PASSWORD
            ================================================= */}

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={goToForgotPassword}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Login"
                onPress={handleLogin}
              />
            </View>

            {/* =================================================
                SIGN UP
            ================================================= */}

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Don't have an account?
              </Text>

              <TouchableOpacity
                onPress={goToSignUp}
                activeOpacity={0.7}
              >
                <Text style={styles.signupLink}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* =====================================================
          CUSTOM LOGIN SUCCESS POPUP
      ===================================================== */}

      <Modal
        visible={popupVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setPopupVisible(false)
        }
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>

            {/* ICON */}

            <View style={styles.popupIcon}>
              <Ionicons
                name="checkmark"
                size={36}
                color={colors.white}
              />
            </View>

            {/* TITLE */}

            <Text style={styles.popupTitle}>
              Login Successful
            </Text>

            {/* MESSAGE */}

            <Text style={styles.popupMessage}>
              Welcome back!
            </Text>

            {/* BUTTON */}

            <TouchableOpacity
              style={styles.popupButton}
              activeOpacity={0.8}
              onPress={handleContinue}
            >
              <Text style={styles.popupButtonText}>
                Continue
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({

  // =====================================================
  // MAIN
  // =====================================================

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

  // =====================================================
  // HEADER
  // =====================================================

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

  // =====================================================
  // INPUT
  // =====================================================

  inputContainer: {
    marginBottom: 18,
  },

  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

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

  // =====================================================
  // LOGIN BUTTON
  // =====================================================

  buttonContainer: {
    marginTop: 5,
  },

  // =====================================================
  // SIGN UP
  // =====================================================

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

  // =====================================================
  // CUSTOM POPUP
  // =====================================================

  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  popupContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },

  popupIcon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  popupTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.darkBlue,
    textAlign: "center",
    lineHeight: 29,
  },

  popupMessage: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 24,
  },

  popupButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  popupButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});