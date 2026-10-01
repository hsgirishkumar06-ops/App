import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
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
  const inputRefs = useRef<
    Array<TextInput | null>
  >([]);

  const otpValues = Array.from(
    { length: 6 },
    (_, index) => otp[index] || ""
  );

  const handleChange = (
    text: string,
    index: number
  ) => {
    const numbersOnly = text.replace(
      /[^0-9]/g,
      ""
    );

    // Handle pasted OTP
    if (numbersOnly.length > 1) {
      const pastedOTP =
        numbersOnly.slice(0, 6);

      onOTPChange(pastedOTP);

      const nextIndex = Math.min(
        pastedOTP.length,
        5
      );

      inputRefs.current[nextIndex]?.focus();

      return;
    }

    const newOTP = [...otpValues];

    newOTP[index] = numbersOnly;

    const updatedOTP =
      newOTP.join("");

    onOTPChange(updatedOTP);

    // Move to next box
    if (
      numbersOnly &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (
      event.nativeEvent.key === "Backspace"
    ) {
      // If current box is empty,
      // move to previous box
      if (
        !otpValues[index] &&
        index > 0
      ) {
        inputRefs.current[
          index - 1
        ]?.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Verification Code
      </Text>

      {/* SIX OTP BOXES */}

      <View style={styles.otpContainer}>
        {otpValues.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] =
                ref;
            }}
            style={[
              styles.otpBox,
              error
                ? styles.errorInput
                : null,
              value
                ? styles.filledBox
                : null,
            ]}
            value={value}
            onChangeText={(text) =>
              handleChange(
                text,
                index
              )
            }
            onKeyPress={(event) =>
              handleKeyPress(
                event,
                index
              )
            }
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            selectTextOnFocus
            autoFocus={index === 0}
          />
        ))}
      </View>

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
    marginBottom: 12,
  },

  otpContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  otpBox: {
    width: 48,
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },

  filledBox: {
    borderColor: colors.primary,
  },

  errorInput: {
    borderColor: colors.error,
  },

  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 7,
  },

  buttonContainer: {
    marginTop: 22,
  },
});