import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

import colors from "../theme/theme";

type Props = {
  email: string;
  error: string;
  loading: boolean;
  onEmailChange: (text: string) => void;
  onSendOTP: () => void;
};

export default function ForgotPasswordForm({
  email,
  error,
  loading,
  onEmailChange,
  onSendOTP,
}: Props) {
  return (
    <View style={styles.container}>
      <CustomInput
        label="Email"
        icon="mail-outline"
        placeholder="Enter your email"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        error={!!error}
      />

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <CustomButton
          title={loading ? "Sending..." : "Send OTP"}
          onPress={onSendOTP}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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