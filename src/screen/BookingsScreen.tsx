import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../theme/theme";

export default function BookingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          My Bookings
        </Text>

        <Text style={styles.subtitle}>
          Manage your appointments and
          upcoming consultations.
        </Text>

        <View style={styles.card}>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>
              Upcoming
            </Text>
          </View>

          <Text style={styles.doctorName}>
            Doctor Appointment
          </Text>

          <Text style={styles.details}>
            Your upcoming appointments will
            appear here.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.date}>
            No upcoming appointments
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Past Appointments
          </Text>

          <Text style={styles.details}>
            Your completed appointments will
            appear here.
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

  statusContainer: {
    alignSelf: "flex-start",
    backgroundColor: colors.inputBackground,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
  },

  status: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },

  doctorName: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.darkBlue,
  },

  details: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 8,
    lineHeight: 20,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 15,
  },

  date: {
    fontSize: 13,
    color: colors.text,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.darkBlue,
  },
});