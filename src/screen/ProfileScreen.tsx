import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../theme/theme";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}

        <Text style={styles.title}>
          Profile
        </Text>

        <Text style={styles.subtitle}>
          Manage your account and preferences.
        </Text>

        {/* Profile Card */}

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              G
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              User
            </Text>

            <Text style={styles.email}>
              user@example.com
            </Text>
          </View>
        </View>

        {/* Account Section */}

        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>
            👤
          </Text>

          <Text style={styles.menuText}>
            Personal Information
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>
            🔒
          </Text>

          <Text style={styles.menuText}>
            Change Password
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>
            ⚙
          </Text>

          <Text style={styles.menuText}>
            Settings
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        {/* Support Section */}

        <Text style={styles.sectionTitle}>
          Support
        </Text>

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>
            ?
          </Text>

          <Text style={styles.menuText}>
            Help & Support
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>
            ℹ
          </Text>

          <Text style={styles.menuText}>
            About
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        {/* Logout */}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
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

  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 18,
    marginTop: 25,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
  },

  profileInfo: {
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.darkBlue,
  },

  email: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkBlue,
    marginTop: 28,
    marginBottom: 10,
  },

  menuItem: {
    backgroundColor: colors.white,
    minHeight: 58,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  menuIcon: {
    width: 30,
    fontSize: 18,
    color: colors.primary,
  },

  menuText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },

  arrow: {
    fontSize: 25,
    color: colors.gray,
  },

  logoutButton: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.error,
  },
});