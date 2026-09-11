import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import PasswordInput from "./PasswordInput";
import CustomButton from "./CustomButton";
import colors from "../theme/theme";

type Props = {
  password: string;
  confirmPassword: string;
  passwordError: string;
  confirmPasswordError: string;
  loading: boolean;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onResetPassword: () => void;
};

export default function NewPasswordForm({
  password,
  confirmPassword,
  passwordError,
  confirmPasswordError,
  loading,
  onPasswordChange,
  onConfirmPasswordChange,
  onResetPassword,
}: Props) {
  return (
    <View style={styles.container}>
      {/* New Password */}
      <View style={styles.inputContainer}>
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={password}
          onChangeText={onPasswordChange}
        />

        {passwordError ? (
          <Text style={styles.errorText}>
            {passwordError}
          </Text>
        ) : null}
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={onConfirmPasswordChange}
        />

        {confirmPasswordError ? (
          <Text style={styles.errorText}>
            {confirmPasswordError}
          </Text>
        ) : null}
      </View>

      {/* Reset Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title={
            loading
              ? "Resetting..."
              : "Reset Password"
          }
          onPress={onResetPassword}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  inputContainer: {
    marginBottom: 18,
  },

  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },

  buttonContainer: {
    marginTop: 5,
  },
});