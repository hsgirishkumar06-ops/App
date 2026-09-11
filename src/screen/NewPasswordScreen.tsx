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

import NewPasswordForm from "../components/NewPasswordForm";
import colors from "../theme/theme";

type Props = {
  goToLogin: () => void;
};

export default function NewPasswordScreen({
  goToLogin,
}: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "Password must be at least 6 characters"
      );
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError(
        "Please confirm your password"
      );
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(
        "Passwords do not match"
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      /*
       * REAL APPLICATION:
       *
       * Backend will:
       * 1. Verify the OTP reset session
       * 2. Update the password
       * 3. Return success
       */

      // Temporary testing delay
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      Alert.alert(
        "Password Reset Successful",
        "Your password has been changed successfully.",
        [
          {
            text: "Go to Login",
            onPress: goToLogin,
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={goToLogin}
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>
              Create New Password
            </Text>

            <Text style={styles.subtitle}>
              Enter a new password for your
              account.
            </Text>
          </View>

          <NewPasswordForm
            password={password}
            confirmPassword={confirmPassword}
            passwordError={passwordError}
            confirmPasswordError={
              confirmPasswordError
            }
            loading={loading}
            onPasswordChange={(text) => {
              setPassword(text);
              setPasswordError("");
            }}
            onConfirmPasswordChange={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError("");
            }}
            onResetPassword={
              handleResetPassword
            }
          />
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
    marginTop: 10,
    lineHeight: 21,
  },
});