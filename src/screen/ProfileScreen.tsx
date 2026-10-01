import React, { useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/theme";
import styles from "../theme/profileStyles";

type Props = {
  goToLogin: () => void;
};

type Page =
  | "main"
  | "personal"
  | "password"
  | "settings"
  | "help"
  | "about";

type Icon = keyof typeof Ionicons.glyphMap;

type PopupType = "success" | "error" | "confirm" | "info";

const profileImage =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80";

// ========================================
// HEADER
// ========================================

const Header = ({
  title,
}: {
  title: string;
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerPlaceholder} />

      <Text
        style={styles.headerTitle}
        numberOfLines={1}
      >
        {title}
      </Text>

      <View style={styles.headerPlaceholder} />
    </View>
  );
};

// ========================================
// FIELD
// ========================================

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  secure,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?:
    | "email-address"
    | "phone-pad"
    | "default";
  secure?: boolean;
}) => {
  return (
    <>
      <Text style={styles.inputLabel}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        keyboardType={type || "default"}
        autoCapitalize={
          type === "email-address"
            ? "none"
            : "sentences"
        }
        secureTextEntry={secure}
        style={styles.input}
      />
    </>
  );
};

// ========================================
// BUTTON
// ========================================

const Button = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.primaryButtonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// ========================================
// MENU ITEM
// ========================================

const MenuItem = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: Icon;
  title: string;
  subtitle: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuIcon}>
        <Ionicons
          name={icon}
          size={23}
          color={colors.primary}
        />
      </View>

      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>
          {title}
        </Text>

        <Text style={styles.menuSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.gray}
      />
    </TouchableOpacity>
  );
};

// ========================================
// PROFILE SCREEN
// ========================================

export default function ProfileScreen({
  goToLogin,
}: Props) {
  const [page, setPage] =
    useState<Page>("main");

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
  // CUSTOM POPUP
  // ========================================

  const [popupVisible, setPopupVisible] =
    useState(false);

  const [popupType, setPopupType] =
    useState<PopupType>("success");

  const [popupTitle, setPopupTitle] =
    useState("");

  const [popupMessage, setPopupMessage] =
    useState("");

  const [popupButtonText, setPopupButtonText] =
    useState("OK");

  const [popupCancelText, setPopupCancelText] =
    useState("");

  const [popupAction, setPopupAction] =
    useState<(() => void) | null>(null);

  const showPopup = (
    type: PopupType,
    title: string,
    message: string,
    buttonText: string = "OK",
    action: (() => void) | null = null,
    cancelText: string = ""
  ) => {
    setPopupType(type);
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupButtonText(buttonText);
    setPopupAction(() => action);
    setPopupCancelText(cancelText);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupAction(null);
    setPopupCancelText("");
  };

  const handlePopupButton = () => {
    const action = popupAction;

    setPopupVisible(false);
    setPopupAction(null);
    setPopupCancelText("");

    if (action) {
      action();
    }
  };

  // ========================================
  // BACK TO PROFILE
  // ========================================

  const back = () => {
    setPage("main");
  };

  // ========================================
  // VALIDATION
  // ========================================

  const validate = (
    value: string,
    message: string
  ) => {
    if (!value.trim()) {
      showPopup(
        "error",
        "Validation",
        message,
        "OK"
      );

      return false;
    }

    return true;
  };

  // ========================================
  // SAVE PERSONAL INFORMATION
  // ========================================

  const savePersonal = () => {
    if (
      !validate(
        name,
        "Please enter your name."
      )
    ) {
      return;
    }

    if (
      !validate(
        email,
        "Please enter your email."
      )
    ) {
      return;
    }

    if (
      !validate(
        phone,
        "Please enter your phone number."
      )
    ) {
      return;
    }

    showPopup(
      "success",
      "Success",
      "Your personal information has been updated.",
      "OK",
      back
    );
  };

  // ========================================
  // CHANGE PASSWORD
  // ========================================

  const changePassword = () => {
    if (
      !validate(
        oldPassword,
        "Please enter your current password."
      )
    ) {
      return;
    }

    if (
      !validate(
        newPassword,
        "Please enter a new password."
      )
    ) {
      return;
    }

    if (newPassword.length < 6) {
      showPopup(
        "error",
        "Validation",
        "New password must be at least 6 characters.",
        "OK"
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      showPopup(
        "error",
        "Validation",
        "Passwords do not match.",
        "OK"
      );

      return;
    }

    showPopup(
      "success",
      "Success",
      "Your password has been changed.",
      "OK",
      () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        back();
      }
    );
  };

  // ========================================
  // LOGOUT
  // ========================================

  const logout = () => {
    showPopup(
      "confirm",
      "Logout",
      "Are you sure you want to logout?",
      "Logout",
      goToLogin,
      "Cancel"
    );
  };

  // ========================================
  // PROFILE HEADER
  // ========================================

  const renderProfileHeader = () => {
    return (
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: profileImage,
          }}
          style={styles.avatar}
        />

        <Text style={styles.profileName}>
          {name}
        </Text>

        <Text style={styles.profileEmail}>
          {email}
        </Text>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() =>
            setPage("personal")
          }
          activeOpacity={0.8}
        >
          <Text
            style={styles.editProfileText}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ========================================
  // MAIN PROFILE PAGE
  // ========================================

  const renderMain = () => {
    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }
        >
          {renderProfileHeader()}

          {/* ACCOUNT */}

          <Text
            style={styles.sectionTitle}
          >
            Account
          </Text>

          <View
            style={styles.menuCard}
          >
            <MenuItem
              icon="person-outline"
              title="Personal Information"
              subtitle="Manage your personal details"
              onPress={() =>
                setPage("personal")
              }
            />

            <MenuItem
              icon="lock-closed-outline"
              title="Change Password"
              subtitle="Update your account password"
              onPress={() =>
                setPage("password")
              }
            />
          </View>

          {/* PREFERENCES */}

          <Text
            style={styles.sectionTitle}
          >
            Preferences
          </Text>

          <View
            style={styles.menuCard}
          >
            <MenuItem
              icon="settings-outline"
              title="Settings"
              subtitle="Notifications and app preferences"
              onPress={() =>
                setPage("settings")
              }
            />
          </View>

          {/* SUPPORT */}

          <Text
            style={styles.sectionTitle}
          >
            Support
          </Text>

          <View
            style={styles.menuCard}
          >
            <MenuItem
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Get help and contact support"
              onPress={() =>
                setPage("help")
              }
            />

            <MenuItem
              icon="information-circle-outline"
              title="About"
              subtitle="Application information"
              onPress={() =>
                setPage("about")
              }
            />
          </View>

          {/* LOGOUT */}

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
            activeOpacity={0.8}
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color={colors.error}
              style={styles.logoutIcon}
            />

            <Text
              style={styles.logoutText}
            >
              Logout
            </Text>
          </TouchableOpacity>

          <Text
            style={styles.versionText}
          >
            Version 1.0.0
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // PERSONAL INFORMATION
  // ========================================

  const renderPersonal = () => {
    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <Header
          title="Personal Information"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.pageContent
          }
          keyboardShouldPersistTaps="handled"
        >
          {/* PROFILE IMAGE */}

          <Image
            source={{
              uri: profileImage,
            }}
            style={styles.largeAvatar}
          />

          <TouchableOpacity
            style={
              styles.changePhotoButton
            }
            activeOpacity={0.7}
            onPress={() => {
              showPopup(
                "info",
                "Profile Photo",
                "Photo selection can be connected later.",
                "OK"
              );
            }}
          >
            <Text
              style={
                styles.changePhotoText
              }
            >
              Change Photo
            </Text>
          </TouchableOpacity>

          {/* FULL NAME */}

          <Field
            label="Full Name"
            value={name}
            onChange={setName}
            placeholder="Enter your name"
          />

          {/* EMAIL */}

          <Field
            label="Email Address"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            type="email-address"
          />

          {/* PHONE */}

          <Field
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            placeholder="Enter your phone number"
            type="phone-pad"
          />

          {/* SAVE */}

          <Button
            title="Save Changes"
            onPress={savePersonal}
          />
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // CHANGE PASSWORD
  // ========================================

  const renderPassword = () => {
    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <Header
          title="Change Password"
        />

        <ScrollView
          contentContainerStyle={
            styles.pageContent
          }
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={styles.infoBox}
          >
            <View
              style={styles.infoIcon}
            >
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <View
              style={styles.infoContent}
            >
              <Text
                style={styles.infoTitle}
              >
                Create a new password
              </Text>

              <Text
                style={styles.infoText}
              >
                Your password should contain at least 6 characters.
              </Text>
            </View>
          </View>

          <Field
            label="Current Password"
            value={oldPassword}
            onChange={setOldPassword}
            placeholder="Enter current password"
            secure
          />

          <Field
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Enter new password"
            secure
          />

          <Field
            label="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm new password"
            secure
          />

          <Button
            title="Change Password"
            onPress={changePassword}
          />
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // SETTINGS
  // ========================================

  const renderSettings = () => {
    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <Header
          title="Settings"
        />

        <ScrollView
          contentContainerStyle={
            styles.pageContent
          }
        >
          <Text
            style={
              styles.settingsSectionTitle
            }
          >
            Notifications
          </Text>

          <View
            style={styles.settingCard}
          >
            <View
              style={styles.settingIcon}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <View
              style={styles.settingInfo}
            >
              <Text
                style={styles.settingTitle}
              >
                Notifications
              </Text>

              <Text
                style={
                  styles.settingSubtitle
                }
              >
                Receive general notifications
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={
                setNotifications
              }
            />
          </View>

          <View
            style={styles.settingCard}
          >
            <View
              style={styles.settingIcon}
            >
              <Ionicons
                name="calendar-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <View
              style={styles.settingInfo}
            >
              <Text
                style={styles.settingTitle}
              >
                Appointment Reminders
              </Text>

              <Text
                style={
                  styles.settingSubtitle
                }
              >
                Get reminders for appointments
              </Text>
            </View>

            <Switch
              value={
                appointmentReminders
              }
              onValueChange={
                setAppointmentReminders
              }
            />
          </View>

          <View
            style={styles.settingCard}
          >
            <View
              style={styles.settingIcon}
            >
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <View
              style={styles.settingInfo}
            >
              <Text
                style={styles.settingTitle}
              >
                Chat Notifications
              </Text>

              <Text
                style={
                  styles.settingSubtitle
                }
              >
                Receive new message notifications
              </Text>
            </View>

            <Switch
              value={chatNotifications}
              onValueChange={
                setChatNotifications
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // HELP
  // ========================================

  const renderHelp = () => {
    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <Header
          title="Help & Support"
        />

        <ScrollView
          contentContainerStyle={
            styles.pageContent
          }
        >
          <View
            style={styles.helpHeader}
          >
            <View
              style={styles.helpIcon}
            >
              <Ionicons
                name="help-circle-outline"
                size={34}
                color={colors.primary}
              />
            </View>

            <Text
              style={styles.helpTitle}
            >
              How can we help?
            </Text>
          </View>

          <View
            style={styles.faqCard}
          >
            <Text
              style={styles.faqQuestion}
            >
              How do I book an appointment?
            </Text>

            <Text
              style={styles.faqAnswer}
            >
              Go to the Explore section, select a doctor, and choose an available appointment time.
            </Text>
          </View>

          <View
            style={styles.faqCard}
          >
            <Text
              style={styles.faqQuestion}
            >
              How can I contact a doctor?
            </Text>

            <Text
              style={styles.faqAnswer}
            >
              Open your booking and use the chat or call options to contact your doctor.
            </Text>
          </View>

          <View
            style={styles.faqCard}
          >
            <Text
              style={styles.faqQuestion}
            >
              How can I change my profile information?
            </Text>

            <Text
              style={styles.faqAnswer}
            >
              Open Profile and select Personal Information to update your details.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // ABOUT
  // ========================================

  const renderAbout = () => {
    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <Header title="About" />

        <ScrollView
          contentContainerStyle={
            styles.pageContent
          }
        >
          <View
            style={styles.aboutLogo}
          >
            <Image
              source={{
                uri: profileImage,
              }}
              style={styles.aboutLogoImage}
            />
          </View>

          <Text
            style={styles.aboutTitle}
          >
            Healthcare App
          </Text>

          <Text
            style={styles.aboutVersion}
          >
            Version 1.0.0
          </Text>

          <Text
            style={styles.aboutDescription}
          >
            A simple healthcare application that helps users discover doctors, manage appointments, communicate with doctors, and manage their profile information.
          </Text>

          <View
            style={styles.aboutCard}
          >
            <Text
              style={styles.aboutCardTitle}
            >
              Features
            </Text>

            <View
              style={styles.aboutFeature}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.primary}
              />

              <Text
                style={
                  styles.aboutFeatureText
                }
              >
                Doctor appointments
              </Text>
            </View>

            <View
              style={styles.aboutFeature}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.primary}
              />

              <Text
                style={
                  styles.aboutFeatureText
                }
              >
                Doctor chat
              </Text>
            </View>

            <View
              style={styles.aboutFeature}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.primary}
              />

              <Text
                style={
                  styles.aboutFeatureText
                }
              >
                Medical records
              </Text>
            </View>

            <View
              style={styles.aboutFeature}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.primary}
              />

              <Text
                style={
                  styles.aboutFeatureText
                }
              >
                Profile management
              </Text>
            </View>
          </View>

          <Text
            style={styles.copyright}
          >
            © 2026 Healthcare App
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // ========================================
  // PAGE SWITCH
  // ========================================

  if (page === "personal") {
    return (
      <>
        {renderPersonal()}
        {renderPopup()}
      </>
    );
  }

  if (page === "password") {
    return (
      <>
        {renderPassword()}
        {renderPopup()}
      </>
    );
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

  return (
    <>
      {renderMain()}
      {renderPopup()}
    </>
  );

  // ========================================
  // CUSTOM POPUP RENDER
  // ========================================

  function renderPopup() {
    return (
      <Modal
        visible={popupVisible}
        transparent
        animationType="fade"
        onRequestClose={closePopup}
      >
        <View style={popupStyles.overlay}>
          <View style={popupStyles.container}>
            <View
              style={[
                popupStyles.icon,
                popupType === "error" &&
                  popupStyles.errorIcon,
                popupType === "confirm" &&
                  popupStyles.confirmIcon,
                popupType === "info" &&
                  popupStyles.infoIcon,
              ]}
            >
              <Ionicons
                name={
                  popupType === "success"
                    ? "checkmark"
                    : popupType === "confirm"
                    ? "log-out-outline"
                    : popupType === "info"
                    ? "information"
                    : "close"
                }
                size={36}
                color={colors.white}
              />
            </View>

            <Text style={popupStyles.title}>
              {popupTitle}
            </Text>

            <Text
              style={popupStyles.message}
            >
              {popupMessage}
            </Text>

            <View
              style={
                popupCancelText
                  ? popupStyles.buttonRow
                  : undefined
              }
            >
              {popupCancelText ? (
                <TouchableOpacity
                  style={
                    popupStyles.cancelButton
                  }
                  activeOpacity={0.8}
                  onPress={closePopup}
                >
                  <Text
                    style={
                      popupStyles.cancelButtonText
                    }
                  >
                    {popupCancelText}
                  </Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                style={[
                  popupStyles.button,
                  popupCancelText &&
                    popupStyles.confirmButton,
                ]}
                activeOpacity={0.8}
                onPress={handlePopupButton}
              >
                <Text
                  style={
                    popupStyles.buttonText
                  }
                >
                  {popupButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

// ========================================
// POPUP STYLES
// ========================================

const popupStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  container: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },

  icon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  errorIcon: {
    backgroundColor: colors.error,
  },

  confirmIcon: {
    backgroundColor: colors.blue,
  },

  infoIcon: {
    backgroundColor: colors.blue,
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.darkBlue,
    textAlign: "center",
    lineHeight: 29,
  },

  message: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 24,
  },

  button: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonRow: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },

  confirmButton: {
    flex: 1,
  },

  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    color: colors.gray,
    fontSize: 15,
    fontWeight: "600",
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});