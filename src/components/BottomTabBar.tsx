import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../theme/theme";

type Tab =
  | "home"
  | "explore"
  | "bookings"
  | "chat"
  | "profile";

type Props = {
 activeTab: Tab;
  onTabPress: (tab: Tab) => void;
};

const tabs = [
  {
    name: "home" as Tab,
    label: "Home",
    icon: "⌂",
  },
  {
    name: "explore" as Tab,
    label: "Explore",
    icon: "⌕",
  },
  {
    name: "bookings" as Tab,
    label: "Bookings",
    icon: "▣",
  },
  {
    name: "chat" as Tab,
    label: "Chat",
    icon: "◯",
  },
  {
    name: "profile" as Tab,
    label: "Profile",
    icon: "♙",
  },
];

export default function BottomTabBar({
  activeTab,
  onTabPress,
}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive =
          activeTab === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() =>
              onTabPress(tab.name)
            }
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.icon,
                isActive && styles.activeIcon,
              ]}
            >
              {tab.icon}
            </Text>

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
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
    height: 72,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    paddingBottom: 5,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 24,
    color: colors.gray,
    marginBottom: 3,
  },

  activeIcon: {
    color: colors.primary,
  },

  label: {
    fontSize: 11,
    color: colors.gray,
  },

  activeLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
});