import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/theme";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  error?: boolean;
};

function CustomInput({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  error = false,
}: Props) {
  return (
    <View
      style={[
        styles.container,
        error && styles.errorBorder,
      ]}
    >
      <Ionicons
        name={icon}
        size={20}
        color="#888888"
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#AAAAAA"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
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

export default CustomInput;