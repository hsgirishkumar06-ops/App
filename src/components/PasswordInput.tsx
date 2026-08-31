import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/theme";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
};

function PasswordInput({
  placeholder,
  value,
  onChangeText,
  error = false,
}: Props) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <View
      style={[
        styles.container,
        error && styles.errorBorder,
      ]}
    >
      <Ionicons
        name="lock-closed-outline"
        size={20}
        color="#888888"
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#AAAAAA"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
      />

      <TouchableOpacity
        onPress={() =>
          setShowPassword(!showPassword)
        }
      >
        <Ionicons
          name={
            showPassword
              ? "eye-outline"
              : "eye-off-outline"
          }
          size={20}
          color="#888888"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 52,
    backgroundColor: colors.inputBackground,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  errorBorder: {
    borderColor: colors.error,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: colors.text,
  },
});

export default PasswordInput;