import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/theme";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  buttonText: string;
  onPress: () => void;
};

function SuccessModal({
  visible,
  title,
  message,
  buttonText,
  onPress,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.box}>

          <View style={styles.circle}>
            <Ionicons
              name="checkmark"
              size={38}
              color={colors.white}
            />
          </View>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
          >
            <Text style={styles.buttonText}>
              {buttonText}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  box: {
    width: "100%",
    maxWidth: 370,
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 30,
    alignItems: "center",
  },

  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 21,
    fontWeight: "800",
    color: colors.darkBlue,
    textAlign: "center",
  },

  message: {
    fontSize: 13,
    color: colors.gray,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },

  button: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default SuccessModal;