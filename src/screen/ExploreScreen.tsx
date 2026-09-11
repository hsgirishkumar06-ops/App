import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../theme/theme";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Explore
        </Text>

        <Text style={styles.subtitle}>
          Find doctors, hospitals and
          healthcare services.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Find a Doctor
          </Text>

          <Text style={styles.cardText}>
            Search for doctors by specialty,
            location or experience.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Find a Hospital
          </Text>

          <Text style={styles.cardText}>
            Discover hospitals and healthcare
            facilities near you.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Medical Specialties
          </Text>

          <Text style={styles.cardText}>
            Browse different medical
            specialties and services.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 8,
    lineHeight: 21,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.darkBlue,
  },

  cardText: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 8,
    lineHeight: 20,
  },
});