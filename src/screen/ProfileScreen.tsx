import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../theme/theme";

type Props = {
  goToLogin: () => void;
};

type ProfilePage =
  | "main"
  | "personal"
  | "password"
  | "settings"
  | "help"
  | "about";

export default function ProfileScreen({
  goToLogin,
}: Props) {
  const [page, setPage] =
    useState<ProfilePage>("main");

  const [name, setName] =
    useState("Girish Kumar");

  const [email, setEmail] =
    useState("girish@example.com");

  const [phone, setPhone] =
    useState("+91 98765 43210");

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [notifications, setNotifications] =
    useState(true);

  const [appointmentReminders, setAppointmentReminders] =
    useState(true);

  const [chatNotifications, setChatNotifications] =
    useState(true);

  // ========================================
  // PERSONAL INFORMATION
  // ========================================

  const savePersonalInformation = () => {
    if (!name.trim()) {
      Alert.alert(
        "Validation",
        "Please enter your name."
      );
      return;
    }

    if (!email.trim()) {
      Alert.alert(
        "Validation",
        "Please enter your email."
      );
      return;
    }

    if (!phone.trim()) {
      Alert.alert(
        "Validation",
        "Please enter your phone number."
      );
      return;
    }

    Alert.alert(
      "Success",
      "Your personal information has been updated.",
      [
        {
          text: "OK",
          onPress: () => {
            setPage("main");
          },
        },
      ]
    );
  };

  // ========================================
  // CHANGE PASSWORD
  // ========================================

  const changePassword = () => {
    if (!oldPassword.trim()) {
      Alert.alert(
        "Validation",
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert(
        "Validation",
        "Please enter a new password."
      );
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        "Validation",
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Validation",
        "Passwords do not match."
      );
      return;
    }

    Alert.alert(
      "Success",
      "Your password has been changed.",
      [
        {
          text: "OK",
          onPress: () => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setPage("main");
          },
        },
      ]
    );
  };

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            console.log("User logged out");

            /*
             * Later, when authentication/backend
             * is connected, clear the user session
             * or authentication token here.
             */

            goToLogin();
          },
        },
      ]
    );
  };

  // ========================================
  // BACK BUTTON
  // ========================================

  const handleBack = () => {
    setPage("main");
  };

  // ========================================
  // HEADER
  // ========================================

  const renderHeader = (
    title: string,
    showBack: boolean = true
  ) => {
    return (
      <View style={styles.header}>
        {showBack ? (
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.headerBackText}>
              ←
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerPlaceholder} />
        )}

        <Text style={styles.headerTitle}>
          {title}
        </Text>

        <View style={styles.headerPlaceholder} />
      </View>
    );
  };

  // ========================================
  // PROFILE HEADER
  // ========================================

  const renderProfileHeader = () => {
    return (
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            G
          </Text>
        </View>

        <Text style={styles.profileName}>
          {name}
        </Text>

        <Text style={styles.profileEmail}>
          {email}
        </Text>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => setPage("personal")}
          activeOpacity={0.8}
        >
          <Text style={styles.editProfileText}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ========================================
  // MENU ITEM
  // ========================================

  const renderMenuItem = (
    icon: string,
    title: string,
    subtitle: string,
    onPress: () => void
  ) => {
    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>
            {icon}
          </Text>
        </View>

        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>
            {title}
          </Text>

          <Text style={styles.menuSubtitle}>
            {subtitle}
          </Text>
        </View>

        <Text style={styles.menuArrow}>
          ›
        </Text>
      </TouchableOpacity>
    );
  };

  // ========================================
  // MAIN PROFILE PAGE
  // ========================================

  const renderMainPage = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderProfileHeader()}

          <Text style={styles.sectionTitle}>
            Account
          </Text>

          <View style={styles.menuCard}>
            {renderMenuItem(
              "👤",
              "Personal Information",
              "Manage your personal details",
              () => setPage("personal")
            )}

            {renderMenuItem(
              "🔒",
              "Change Password",
              "Update your account password",
              () => setPage("password")
            )}
          </View>

          <Text style={styles.sectionTitle}>
            Preferences
          </Text>

          <View style={styles.menuCard}>
            {renderMenuItem(
              "⚙",
              "Settings",
              "Notifications and app preferences",
              () => setPage("settings")
            )}
          </View>

          <Text style={styles.sectionTitle}>
            Support
          </Text>

          <View style={styles.menuCard}>
            {renderMenuItem(
              "❓",
              "Help & Support",
              "Get help and contact support",
              () => setPage("help")
            )}

            {renderMenuItem(
              "ℹ",
              "About",
              "Application information",
              () => setPage("about")
            )}
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutIcon}>
              ⇥
            </Text>

            <Text style={styles.logoutText}>
              Logout
            </Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>
            Version 1.0.0
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // PERSONAL INFORMATION PAGE
  // ========================================

  const renderPersonalInformation = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader("Personal Information")}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageContent}
        >
          <View style={styles.largeAvatar}>
            <Text style={styles.largeAvatarText}>
              G
            </Text>
          </View>

          <TouchableOpacity
            style={styles.changePhotoButton}
            activeOpacity={0.7}
            onPress={() => {
              Alert.alert(
                "Profile Photo",
                "Photo selection can be connected later."
              );
            }}
          >
            <Text style={styles.changePhotoText}>
              Change Photo
            </Text>
          </TouchableOpacity>

          <Text style={styles.inputLabel}>
            Full Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={colors.gray}
            style={styles.input}
          />

          <Text style={styles.inputLabel}>
            Email Address
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.gray}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.inputLabel}>
            Phone Number
          </Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor={colors.gray}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={savePersonalInformation}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // CHANGE PASSWORD PAGE
  // ========================================

  const renderChangePassword = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader("Change Password")}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageContent}
        >
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>
              Create a new password
            </Text>

            <Text style={styles.infoText}>
              Your password should contain at least
              6 characters.
            </Text>
          </View>

          <Text style={styles.inputLabel}>
            Current Password
          </Text>

          <TextInput
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Enter current password"
            placeholderTextColor={colors.gray}
            secureTextEntry
            style={styles.input}
          />

          <Text style={styles.inputLabel}>
            New Password
          </Text>

          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            placeholderTextColor={colors.gray}
            secureTextEntry
            style={styles.input}
          />

          <Text style={styles.inputLabel}>
            Confirm New Password
          </Text>

          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            placeholderTextColor={colors.gray}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={changePassword}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              Change Password
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // SETTINGS PAGE
  // ========================================

  const renderSettings = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader("Settings")}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageContent}
        >
          <Text style={styles.settingsSectionTitle}>
            Notifications
          </Text>

          <View style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                Notifications
              </Text>

              <Text style={styles.settingSubtitle}>
                Receive general notifications
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                Appointment Reminders
              </Text>

              <Text style={styles.settingSubtitle}>
                Get reminders for appointments
              </Text>
            </View>

            <Switch
              value={appointmentReminders}
              onValueChange={
                setAppointmentReminders
              }
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                Chat Notifications
              </Text>

              <Text style={styles.settingSubtitle}>
                Receive new message notifications
              </Text>
            </View>

            <Switch
              value={chatNotifications}
              onValueChange={
                setChatNotifications
              }
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor={colors.white}
            />
          </View>

          <Text style={styles.settingsSectionTitle}>
            Application
          </Text>

          <View style={styles.simpleCard}>
            <Text style={styles.settingTitle}>
              App Language
            </Text>

            <Text style={styles.settingValue}>
              English
            </Text>
          </View>

          <View style={styles.simpleCard}>
            <Text style={styles.settingTitle}>
              App Version
            </Text>

            <Text style={styles.settingValue}>
              1.0.0
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // HELP PAGE
  // ========================================

  const renderHelp = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader("Help & Support")}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageContent}
        >
          <Text style={styles.helpTitle}>
            Frequently Asked Questions
          </Text>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              How do I book an appointment?
            </Text>

            <Text style={styles.faqAnswer}>
              Open the Bookings section and create a
              new appointment by selecting a doctor,
              specialty, date and time.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              How can I change my profile information?
            </Text>

            <Text style={styles.faqAnswer}>
              Go to Profile, select Personal
              Information and update your details.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              How do I change my password?
            </Text>

            <Text style={styles.faqAnswer}>
              Open Profile and select Change Password.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              How can I contact support?
            </Text>

            <Text style={styles.faqAnswer}>
              Contact support through the application
              support channel when backend services
              are connected.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert(
                "Contact Support",
                "Support contact can be connected to your backend later."
              );
            }}
          >
            <Text style={styles.primaryButtonText}>
              Contact Support
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // ABOUT PAGE
  // ========================================

  const renderAbout = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader("About")}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageContent}
        >
          <View style={styles.aboutLogo}>
            <Text style={styles.aboutLogoText}>
              M
            </Text>
          </View>

          <Text style={styles.aboutTitle}>
            Medical App
          </Text>

          <Text style={styles.aboutVersion}>
            Version 1.0.0
          </Text>

          <Text style={styles.aboutDescription}>
            A healthcare application designed to
            help patients explore doctors, manage
            appointments and communicate with
            healthcare professionals.
          </Text>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutCardTitle}>
              Features
            </Text>

            <Text style={styles.aboutFeature}>
              • Doctor discovery
            </Text>

            <Text style={styles.aboutFeature}>
              • Appointment management
            </Text>

            <Text style={styles.aboutFeature}>
              • Healthcare chat
            </Text>

            <Text style={styles.aboutFeature}>
              • Profile management
            </Text>

            <Text style={styles.aboutFeature}>
              • Notification support
            </Text>
          </View>

          <Text style={styles.copyright}>
            © 2026 Medical App
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // PAGE ROUTING
  // ========================================

  if (page === "personal") {
    return renderPersonalInformation();
  }

  if (page === "password") {
    return renderChangePassword();
  }

  if (page === "settings") {
    return renderSettings();
  }

  if (page === "help") {
    return renderHelp();
  }

  if (page === "about") {
    return renderAbout();
  }

  return renderMainPage();
}

// ========================================
// STYLES
// ========================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingBottom: 35,
  },

  pageContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // ========================================
  // PROFILE HEADER
  // ========================================

  profileHeader: {
    backgroundColor: colors.white,
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.primary,
  },

  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.primary,
  },

  profileName: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.darkBlue,
    marginTop: 14,
  },

  profileEmail: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 5,
  },

  editProfileButton: {
    marginTop: 15,
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  editProfileText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },

  // ========================================
  // SECTIONS
  // ========================================

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.darkBlue,
    marginTop: 24,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  menuCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  menuItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  menuIconText: {
    fontSize: 19,
  },

  menuContent: {
    flex: 1,
    marginLeft: 13,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },

  menuSubtitle: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },

  menuArrow: {
    fontSize: 25,
    color: colors.gray,
    marginLeft: 8,
  },

  // ========================================
  // LOGOUT
  // ========================================

  logoutButton: {
    height: 54,
    marginHorizontal: 20,
    marginTop: 28,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutIcon: {
    fontSize: 21,
    color: colors.error,
    marginRight: 9,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.error,
  },

  versionText: {
    textAlign: "center",
    fontSize: 11,
    color: colors.gray,
    marginTop: 16,
  },

  // ========================================
  // HEADER
  // ========================================

  header: {
    height: 64,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  headerBackText: {
    fontSize: 24,
    color: colors.text,
    marginTop: -2,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  headerPlaceholder: {
    width: 40,
  },

  // ========================================
  // PERSONAL INFORMATION
  // ========================================

  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.inputBackground,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    borderWidth: 3,
    borderColor: colors.primary,
  },

  largeAvatarText: {
    fontSize: 40,
    fontWeight: "700",
    color: colors.primary,
  },

  changePhotoButton: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  changePhotoText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 7,
    marginTop: 14,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    fontSize: 14,
    color: colors.text,
  },

  primaryButton: {
    height: 52,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },

  // ========================================
  // PASSWORD
  // ========================================

  infoBox: {
    backgroundColor: colors.inputBackground,
    borderRadius: 13,
    padding: 16,
    marginTop: 22,
    marginBottom: 12,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  infoText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
    lineHeight: 18,
  },

  // ========================================
  // SETTINGS
  // ========================================

  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkBlue,
    marginTop: 24,
    marginBottom: 10,
  },

  settingCard: {
    minHeight: 76,
    backgroundColor: colors.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  settingInfo: {
    flex: 1,
    paddingRight: 12,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },

  settingSubtitle: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
    lineHeight: 17,
  },

  settingValue: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 5,
  },

  simpleCard: {
    backgroundColor: colors.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 10,
  },

  // ========================================
  // HELP
  // ========================================

  helpTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.darkBlue,
    marginTop: 22,
    marginBottom: 12,
  },

  faqCard: {
    backgroundColor: colors.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },

  faqQuestion: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  faqAnswer: {
    fontSize: 12,
    color: colors.gray,
    lineHeight: 18,
    marginTop: 8,
  },

  // ========================================
  // ABOUT
  // ========================================

  aboutLogo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },

  aboutLogoText: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.primary,
  },

  aboutTitle: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "700",
    color: colors.darkBlue,
    marginTop: 15,
  },

  aboutVersion: {
    textAlign: "center",
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
  },

  aboutDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 25,
  },

  aboutCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginTop: 25,
  },

  aboutCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkBlue,
    marginBottom: 12,
  },

  aboutFeature: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 9,
  },

  copyright: {
    textAlign: "center",
    fontSize: 11,
    color: colors.gray,
    marginTop: 25,
  },
});