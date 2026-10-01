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

  // CUSTOM POPUP
  const [popupVisible, setPopupVisible] = useState(false);

  // ========================================
  // VERIFY OTP
  // ========================================

  const handleVerifyOTP = async () => {
    setError("");

    // Check empty OTP
    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    // Check 6-digit OTP
    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      /*
       * REAL APPLICATION:
       *
       * The OTP should be verified
       * through your backend.
       *
       * Backend should check:
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

      // ========================================
      // GO TO NEW PASSWORD
      // ========================================

      goToNewPassword();
    } catch (error) {
      setPopupVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // UI
  // ========================================

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
            {/* ========================================
                BACK BUTTON
            ======================================== */}

            <TouchableOpacity
              style={styles.backButton}
              onPress={goBack}
              activeOpacity={0.7}
            >
              <Text style={styles.backText}>
                ←
              </Text>
            </TouchableOpacity>

            {/* ========================================
                HEADER
            ======================================== */}

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

            {/* ========================================
                OTP FORM
            ======================================== */}

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

      {/* ========================================
          CUSTOM ERROR POPUP
      ======================================== */}

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
                name="close"
                size={36}
                color={colors.white}
              />
            </View>

            {/* TITLE */}

            <Text style={styles.popupTitle}>
              Error
            </Text>

            {/* MESSAGE */}

            <Text style={styles.popupMessage}>
              Unable to verify OTP. Please try
              again.
            </Text>

            {/* BUTTON */}

            <TouchableOpacity
              style={styles.popupButton}
              activeOpacity={0.8}
              onPress={() =>
                setPopupVisible(false)
              }
            >
              <Text style={styles.popupButtonText}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

// ========================================
// STYLES
// ========================================

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

  // ========================================
  // BACK BUTTON
  // ========================================

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

  // ========================================
  // HEADER
  // ========================================

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

  // ========================================
  // CUSTOM POPUP
  // ========================================

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
    backgroundColor: colors.error,
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