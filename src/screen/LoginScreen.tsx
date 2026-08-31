import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomInput from "../components/CustomInput";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import SuccessModal from "../components/SuccessModal";

import colors from "../theme/theme";

type Props = {
  goToSignUp: () => void;
  goToOnboarding: () => void;
};

function LoginScreen({
  goToSignUp,
  goToOnboarding,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [remember, setRemember] =
    useState(false);

  const [emailError, setEmailError] =
    useState("");
  const [passwordError, setPasswordError] =
    useState("");

  const [showSuccess, setShowSuccess] =
    useState(false);

  const validateEmail = (
    value: string
  ) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value
    );
  };

  const handleLogin = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError(
        "Email is required"
      );
      valid = false;
    } else if (
      !validateEmail(email.trim())
    ) {
      setEmailError(
        "Enter a valid email address"
      );
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError(
        "Password is required"
      );
      valid = false;
    } else if (
      password.length < 8
    ) {
      setPasswordError(
        "Password must be at least 8 characters"
      );
      valid = false;
    }

    if (valid) {
      setShowSuccess(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >

        <ScrollView
          contentContainerStyle={
            styles.scroll
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.content}>

            <BackButton
              onPress={goToOnboarding}
            />

            <Image
              source={require("../../assets//logo.png")}
              style={styles.logo}
            />

            <Text style={styles.heading}>
              Login to Your Account
            </Text>

            {/* EMAIL */}
            <View style={styles.field}>

              <CustomInput
                icon="mail-outline"
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                keyboardType="email-address"
                error={!!emailError}
              />

              {emailError ? (
                <Text style={styles.error}>
                  {emailError}
                </Text>
              ) : null}

            </View>

            {/* PASSWORD */}
            <View style={styles.field}>

              <PasswordInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
                error={!!passwordError}
              />

              {passwordError ? (
                <Text style={styles.error}>
                  {passwordError}
                </Text>
              ) : null}

            </View>

            {/* REMEMBER ME */}
            <TouchableOpacity
              style={styles.remember}
              onPress={() =>
                setRemember(!remember)
              }
            >

              <View
                style={[
                  styles.checkbox,
                  remember &&
                    styles.checked,
                ]}
              >
                {remember && (
                  <Ionicons
                    name="checkmark"
                    size={15}
                    color={colors.white}
                  />
                )}
              </View>

              <Text
                style={styles.rememberText}
              >
                Remember me
              </Text>

            </TouchableOpacity>

            {/* SIGN IN */}
            <CustomButton
              title="Sign In"
              onPress={handleLogin}
            />

            {/* FORGOT PASSWORD */}
            <TouchableOpacity>
              <Text style={styles.forgot}>
                Forgot the password?
              </Text>
            </TouchableOpacity>

            {/* DIVIDER */}
            <View style={styles.divider}>

              <View style={styles.line} />

              <Text style={styles.or}>
                or continue with
              </Text>

              <View style={styles.line} />

            </View>

            {/* SOCIAL BUTTONS */}
            <View style={styles.socialRow}>

              <TouchableOpacity
                style={styles.social}
              >
                <Ionicons
                  name="logo-google"
                  size={24}
                  color="#DB4437"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.social}
              >
                <Ionicons
                  name="logo-facebook"
                  size={24}
                  color="#1877F2"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.social}
              >
                <Ionicons
                  name="logo-apple"
                  size={24}
                  color={colors.black}
                />
              </TouchableOpacity>

            </View>

            {/* SIGN UP */}
            <View style={styles.bottom}>

              <Text style={styles.gray}>
                Don't have an account?
              </Text>

              <TouchableOpacity
                onPress={goToSignUp}
              >
                <Text style={styles.link}>
                  {" "}Create Account
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

      {/* SUCCESS MODAL */}
      <SuccessModal
        visible={showSuccess}
        title="Login Successful"
        message="Welcome back to MediConnect!"
        buttonText="OK"
        onPress={() =>
          setShowSuccess(false)
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scroll: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  content: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  logo: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    marginTop: 5,
    marginBottom: 8,
  },

  heading: {
    fontSize: 25,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
    marginBottom: 24,
  },

  field: {
    width: "100%",
    marginBottom: 10,
  },

  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  remember: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  checked: {
    backgroundColor: colors.primary,
  },

  rememberText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333333",
  },

  forgot: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 16,
  },

  divider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },

  or: {
    color: "#777777",
    fontSize: 13,
    marginHorizontal: 10,
  },

  socialRow: {
    flexDirection: "row",
    gap: 14,
  },

  social: {
    width: 72,
    height: 48,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  bottom: {
    flexDirection: "row",
    marginTop: 20,
  },

  gray: {
    color: "#999999",
    fontSize: 13,
  },

  link: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
});

export default LoginScreen;