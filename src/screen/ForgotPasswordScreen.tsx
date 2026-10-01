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

import ForgotPasswordForm from "../components/ForgotPasswordForm";
import colors from "../theme/theme";

type Props = {
  goToLogin: () => void;
  goToOTP: (email: string) => void;
};

type PopupType = "success" | "error";

export default function ForgotPasswordScreen({
  goToLogin,
  goToOTP,
}: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // CUSTOM POPUP STATE
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] =
    useState<PopupType>("success");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupButtonText, setPopupButtonText] =
    useState("Continue");

  const showPopup = (
    type: PopupType,
    title: string,
    message: string,
    buttonText: string
  ) => {
    setPopupType(type);
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupButtonText(buttonText);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handlePopupButton = () => {
    setPopupVisible(false);

    if (
      popupType === "success" &&
      popupTitle === "OTP Sent"
    ) {
      goToOTP(email.trim());
    }
  };

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

      showPopup(
        "success",
        "OTP Sent",
        `A verification code has been sent to ${email.trim()}`,
        "Continue"
      );
    } catch (error) {
      showPopup(
        "error",
        "Error",
        "Unable to send OTP. Please try again.",
        "OK"
      );
    } finally {
      setLoading(false);
    }
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
            <TouchableOpacity
              style={styles.backButton}
              onPress={goToLogin}
              activeOpacity={0.7}
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
                {"\n"}will send you a verification code.
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

      {/* ========================================
          CUSTOM POPUP
      ======================================== */}

      <Modal
        visible={popupVisible}
        transparent
        animationType="fade"
        onRequestClose={closePopup}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            {/* ICON */}

            <View
              style={[
                styles.popupIcon,
                popupType === "error" &&
                  styles.errorPopupIcon,
              ]}
            >
              <Ionicons
                name={
                  popupType === "success"
                    ? "checkmark"
                    : "close"
                }
                size={36}
                color={colors.white}
              />
            </View>

            {/* TITLE */}

            <Text style={styles.popupTitle}>
              {popupTitle}
            </Text>

            {/* MESSAGE */}

            <Text style={styles.popupMessage}>
              {popupMessage}
            </Text>

            {/* BUTTON */}

            <TouchableOpacity
              style={styles.popupButton}
              activeOpacity={0.8}
              onPress={handlePopupButton}
            >
              <Text style={styles.popupButtonText}>
                {popupButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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

  /* ========================================
     POPUP
  ======================================== */

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

  errorPopupIcon: {
    backgroundColor: colors.error,
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