import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/theme";

type Props = {
  onPress: () => void;
};

function BackButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name="arrow-back"
        size={24}
        color={colors.darkBlue}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
});

export default BackButton;