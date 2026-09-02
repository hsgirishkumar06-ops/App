import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/theme";

type Props = {
  onTabPress?: (tab: string) => void;
};

const tabs = [
  {
    key: "home",
    label: "Home",
    icon: "home",
  },
  {
    key: "explore",
    label: "Explore",
    icon: "compass-outline",
  },
  {
    key: "bookings",
    label: "Bookings",
    icon: "calendar",
  },
  {
    key: "chat",
    label: "Chat",
    icon: "chatbox-ellipsis-outline",
  },
  {
    key: "profile",
    label: "Profile",
    icon: "person-outline",
  },
];

export default function HomeBottomNav({
  onTabPress,
}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = tab.key === "home";

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() =>
              onTabPress?.(tab.key)
            }
          >
            <Ionicons
              name={tab.icon as any}
              size={17}
              color={
                active
                  ? colors.blue
                  : colors.gray
              }
            />

            <Text
              style={[
                styles.label,
                active &&
                  styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 4,
    elevation: 8,
  },

  tab: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 8,
    color: colors.gray,
    marginTop: 4,
  },

  activeLabel: {
    color: colors.blue,
    fontWeight: "600",
  },
});