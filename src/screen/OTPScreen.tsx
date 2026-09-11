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

import OTPForm from "../components/OTPForm";
import colors from "../theme/theme";

type Props = {
  email: string;
  goBack: () => void;
  goToNewPassword: () => void;
};

export default function OTPScreen({
  email,
  goBack,
  goToNewPassword,
}: Props) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    setError("");

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      /*
       * REAL APPLICATION:
       *
       * Send the OTP to your backend.
       * The backend should verify:
       *
       * 1. OTP is correct
       * 2. OTP belongs to this email
       * 3. OTP is not expired
       * 4. OTP has not already been used
       */

      // Temporary testing delay
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      Alert.alert(
        "OTP Verified",
        "Your OTP has been verified successfully.",
        [
          {
            text: "Continue",
            onPress: () => {
              goToNewPassword();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to verify OTP. Please try again."
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
          {/* Back Button */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </TouchableOpacity>

          {/* Header */}

          <View style={styles.header}>
            <Text style={styles.title}>
              Verify OTP
            </Text>

            <Text style={styles.subtitle}>
              Enter the 6-digit verification
              code sent to:
            </Text>

            <Text style={styles.email}>
              {email}
            </Text>
          </View>

          {/* OTP Form */}

          <OTPForm
            otp={otp}
            error={error}
            loading={loading}
            onOTPChange={(text) => {
              setOtp(text);
              setError("");
            }}
            onVerifyOTP={handleVerifyOTP}
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

  email: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginTop: 6,
  },
});