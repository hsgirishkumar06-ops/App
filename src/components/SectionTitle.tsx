import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../theme/theme";

type Props = {
  title: string;
  badge?: string;
};

export default function SectionTitle({
  title,
  badge,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {title}
        </Text>

        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badge}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity>
        <Text style={styles.seeAll}>
          See All
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },

  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "700",
  },

  seeAll: {
    fontSize: 10,
    color: colors.blue,
    fontWeight: "500",
  },
});