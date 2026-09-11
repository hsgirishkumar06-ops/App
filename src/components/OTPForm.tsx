import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import CustomButton from "./CustomButton";
import colors from "../theme/theme";

type Props = {
  otp: string;
  error: string;
  loading: boolean;
  onOTPChange: (text: string) => void;
  onVerifyOTP: () => void;
};

export default function OTPForm({
  otp,
  error,
  loading,
  onOTPChange,
  onVerifyOTP,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Verification Code
      </Text>

      <TextInput
        style={[
          styles.input,
          error ? styles.errorInput : null,
        ]}
        placeholder="Enter 6-digit OTP"
        placeholderTextColor="#AAAAAA"
        value={otp}
        onChangeText={onOTPChange}
        keyboardType="number-pad"
        maxLength={6}
        textAlign="center"
      />

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <CustomButton
          title={
            loading
              ? "Verifying..."
              : "Verify OTP"
          }
          onPress={onVerifyOTP}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
    fontSize: 18,
    color: colors.text,
    letterSpacing: 6,
    paddingHorizontal: 15,
  },

  errorInput: {
    borderColor: colors.error,
  },

  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },

  buttonContainer: {
    marginTop: 20,
  },
});