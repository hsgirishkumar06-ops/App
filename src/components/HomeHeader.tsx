import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/theme";

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Location</Text>

        <TouchableOpacity style={styles.locationRow}>
          <Ionicons
            name="location"
            size={15}
            color={colors.blue}
          />

          <Text style={styles.locationText}>
            New York, USA
          </Text>

          <Ionicons
            name="chevron-down"
            size={13}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.notificationButton}>
        <Ionicons
          name="notifications"
          size={19}
          color={colors.text}
        />

        <View style={styles.notificationDot} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },

  label: {
    fontSize: 10,
    color: colors.gray,
    marginBottom: 3,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  locationText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "500",
  },

  notificationButton: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.error,
    top: 8,
    right: 9,
  },
});