import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/theme";
import { specialties } from "../data/homeData";

export default function SpecialtyList() {
  return (
    <View style={styles.container}>
      {specialties.map((item) => (
        <View
          key={item.title}
          style={styles.item}
        >
          <View style={styles.iconCircle}>
            <Ionicons
              name={item.icon as any}
              size={22}
              color={colors.blue}
            />
          </View>

          <Text
            numberOfLines={1}
            style={styles.text}
          >
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  item: {
    width: "23%",
    alignItems: "center",
  },

  iconCircle: {
    width: 51,
    height: 51,
    borderRadius: 26,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },

  text: {
    fontSize: 9,
    color: colors.text,
    fontWeight: "500",
  },
});