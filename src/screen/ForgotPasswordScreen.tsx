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

import ForgotPasswordForm from "../components/ForgotPasswordForm";
import colors from "../theme/theme";

type Props = {
  goToLogin: () => void;
  goToOTP: (email: string) => void;
};

export default function ForgotPasswordScreen({
  goToLogin,
  goToOTP,
}: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      )
    ) {
      setError("Enter a valid email");
      return;
    }

    try {
      setLoading(true);

      /*
       * REAL APPLICATION:
       *
       * Backend will:
       * 1. Check the email
       * 2. Generate OTP
       * 3. Save OTP with expiry
       * 4. Send OTP to user's email
       */

      // Temporary testing delay
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      Alert.alert(
        "OTP Sent",
        `A verification code has been sent to ${email.trim()}`,
        [
          {
            text: "Continue",
            onPress: () => {
              goToOTP(email.trim());
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to send OTP. Please try again."
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
              Forgot Password
            </Text>

            <Text style={styles.subtitle}>
              Enter your email address and we
              will send you a verification code.
            </Text>
          </View>

          <ForgotPasswordForm
            email={email}
            error={error}
            loading={loading}
            onEmailChange={(text) => {
              setEmail(text);
              setError("");
            }}
            onSendOTP={handleSendOTP}
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