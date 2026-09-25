import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/theme";
import styles from "../theme/profileStyles";

type Props = { goToLogin: () => void };
type Page = "main" | "personal" | "password" | "settings" | "help" | "about";
type Icon = keyof typeof Ionicons.glyphMap;

const Header = ({ title, back }: { title: string; back: () => void }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.headerBackButton} onPress={back}>
      <Ionicons name="arrow-back" size={24} color={colors.text} />
    </TouchableOpacity>
    <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
    <View style={styles.headerPlaceholder} />
  </View>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  secure = false,
  type = "default",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  secure?: boolean;
  type?: "default" | "email-address" | "phone-pad";
}) => (
  <>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      secureTextEntry={secure}
      keyboardType={type}
      autoCapitalize={type === "email-address" ? "none" : "sentences"}
      style={styles.input}
    />
  </>
);

const Button = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
    <Text style={styles.primaryButtonText}>{title}</Text>
  </TouchableOpacity>
);

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
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <Ionicons name={icon} size={23} color={colors.primary} />
    </View>
    <View style={styles.menuContent}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.gray} />
  </TouchableOpacity>
);

export default function ProfileScreen({ goToLogin }: Props) {
  const [page, setPage] = useState<Page>("main");
  const [name, setName] = useState("Girish Kumar");
  const [email, setEmail] = useState("girish@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [chatNotifications, setChatNotifications] = useState(true);

  const back = () => setPage("main");

  const validate = (value: string, message: string) => {
    if (!value.trim()) {
      Alert.alert("Validation", message);
      return false;
    }
    return true;
  };

  const savePersonal = () => {
    if (!validate(name, "Please enter your name.")) return;
    if (!validate(email, "Please enter your email.")) return;
    if (!validate(phone, "Please enter your phone number.")) return;

    Alert.alert(
      "Success",
      "Your personal information has been updated.",
      [{ text: "OK", onPress: back }]
    );
  };

  const changePassword = () => {
    if (!validate(oldPassword, "Please enter your current password."))
      return;
    if (!validate(newPassword, "Please enter a new password."))
      return;

    if (newPassword.length < 6) {
      Alert.alert(
        "Validation",
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match.");
      return;
    }

    Alert.alert(
      "Success",
      "Your password has been changed.",
      [{
        text: "OK",
        onPress: () => {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          back();
        },
      }]
    );
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: goToLogin },
    ]);
  };

  const renderMain = () => (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>G</Text>
          </View>

          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => setPage("personal")}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuCard}>
          <MenuItem
            icon="person-outline"
            title="Personal Information"
            subtitle="Manage your personal details"
            onPress={() => setPage("personal")}
          />
          <MenuItem
            icon="lock-closed-outline"
            title="Change Password"
            subtitle="Update your account password"
            onPress={() => setPage("password")}
          />
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.menuCard}>
          <MenuItem
            icon="settings-outline"
            title="Settings"
            subtitle="Notifications and app preferences"
            onPress={() => setPage("settings")}
          />
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuCard}>
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => setPage("help")}
          />
          <MenuItem
            icon="information-circle-outline"
            title="About"
            subtitle="Application information"
            onPress={() => setPage("about")}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color={colors.error}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );

  const renderPersonal = () => (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Personal Information" back={back} />

      <ScrollView
        contentContainerStyle={styles.pageContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.largeAvatar}>
          <Text style={styles.largeAvatarText}>G</Text>
        </View>

        <TouchableOpacity
          style={styles.changePhotoButton}
          onPress={() =>
            Alert.alert(
              "Profile Photo",
              "Photo selection can be connected later."
            )
          }
        >
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

        <Field
          label="Full Name"
          value={name}
          onChange={setName}
          placeholder="Enter your name"
        />

        <Field
          label="Email Address"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          type="email-address"
        />

        <Field
          label="Phone Number"
          value={phone}
          onChange={setPhone}
          placeholder="Enter your phone number"
          type="phone-pad"
        />

        <Button title="Save Changes" onPress={savePersonal} />
      </ScrollView>
    </SafeAreaView>
  );

  const renderPassword = () => (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Change Password" back={back} />

      <ScrollView
        contentContainerStyle={styles.pageContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.infoBox}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color={colors.primary}
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Create a new password
            </Text>
            <Text style={styles.infoText}>
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

  const renderSettings = () => {
    const items = [
      [
        "notifications-outline",
        "Notifications",
        "Receive general notifications",
        notifications,
        setNotifications,
      ],
      [
        "calendar-outline",
        "Appointment Reminders",
        "Get reminders for appointments",
        appointmentReminders,
        setAppointmentReminders,
      ],
      [
        "chatbubble-outline",
        "Chat Notifications",
        "Receive new message notifications",
        chatNotifications,
        setChatNotifications,
      ],
    ] as const;

    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Settings" back={back} />

        <ScrollView contentContainerStyle={styles.pageContent}>
          <Text style={styles.settingsSectionTitle}>
            Notifications
          </Text>

          {items.map(([icon, title, subtitle, value, setValue]) => (
            <View key={title} style={styles.settingCard}>
              <View style={styles.settingIcon}>
                <Ionicons
                  name={icon}
                  size={22}
                  color={colors.primary}
                />
              </View>

              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{title}</Text>
                <Text style={styles.settingSubtitle}>
                  {subtitle}
                </Text>
              </View>

              <Switch
                value={value}
                onValueChange={setValue}
                trackColor={{
                  false: colors.border,
                  true: colors.primary,
                }}
                thumbColor={colors.white}
              />
            </View>
          ))}

          <Text style={styles.settingsSectionTitle}>
            Application
          </Text>

          {[
            ["language-outline", "App Language", "English"],
            [
              "information-circle-outline",
              "App Version",
              "1.0.0",
            ],
          ].map(([icon, title, value]) => (
            <View key={title} style={styles.simpleCard}>
              <View style={styles.simpleCardLeft}>
                <Ionicons
                  name={icon as Icon}
                  size={21}
                  color={colors.primary}
                />
                <Text style={styles.settingTitle}>
                  {title}
                </Text>
              </View>
              <Text style={styles.settingValue}>{value}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };

  const renderHelp = () => {
    const faqs = [
      [
        "How do I book an appointment?",
        "Open the Bookings section and create a new appointment by selecting a doctor, specialty, date and time.",
      ],
      [
        "How can I change my profile information?",
        "Go to Profile, select Personal Information and update your details.",
      ],
      [
        "How do I change my password?",
        "Open Profile and select Change Password.",
      ],
      [
        "How can I contact support?",
        "Contact support through the application support channel when backend services are connected.",
      ],
    ];

    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Help & Support" back={back} />

        <ScrollView contentContainerStyle={styles.pageContent}>
          <View style={styles.helpHeader}>
            <View style={styles.helpIcon}>
              <Ionicons
                name="help-circle-outline"
                size={34}
                color={colors.primary}
              />
            </View>
            <Text style={styles.helpTitle}>
              Frequently Asked Questions
            </Text>
          </View>

          {faqs.map(([question, answer]) => (
            <View key={question} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>
                {question}
              </Text>
              <Text style={styles.faqAnswer}>
                {answer}
              </Text>
            </View>
          ))}

          <Button
            title="Contact Support"
            onPress={() =>
              Alert.alert(
                "Contact Support",
                "Support contact can be connected to your backend later."
              )
            }
          />
        </ScrollView>
      </SafeAreaView>
    );
  };

  const renderAbout = () => (
    <SafeAreaView style={styles.safeArea}>
      <Header title="About" back={back} />

      <ScrollView contentContainerStyle={styles.pageContent}>
        <View style={styles.aboutLogo}>
          <Ionicons
            name="medical-outline"
            size={46}
            color={colors.primary}
          />
        </View>

        <Text style={styles.aboutTitle}>Medical App</Text>
        <Text style={styles.aboutVersion}>
          Version 1.0.0
        </Text>

        <Text style={styles.aboutDescription}>
          A healthcare application designed to help
          patients explore doctors, manage appointments
          and communicate with healthcare professionals.
        </Text>

        <View style={styles.aboutCard}>
          <Text style={styles.aboutCardTitle}>
            Features
          </Text>

          {[
            "Doctor discovery",
            "Appointment management",
            "Healthcare chat",
            "Profile management",
            "Notification support",
          ].map((item) => (
            <View key={item} style={styles.aboutFeature}>
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.aboutFeatureText}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.copyright}>
          2026 Medical App
        </Text>
      </ScrollView>
    </SafeAreaView>
  );

  if (page === "personal") return renderPersonal();
  if (page === "password") return renderPassword();
  if (page === "settings") return renderSettings();
  if (page === "help") return renderHelp();
  if (page === "about") return renderAbout();

  return renderMain();
}