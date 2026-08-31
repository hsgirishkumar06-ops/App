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
  goToLogin: () => void;
};

function SignUpScreen({
  goToLogin,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [phone, setPhone] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [agree, setAgree] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    agree: "",
  });

  const validateEmail = (
    value: string
  ) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value
    );
  };

  const handleSignup = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
      agree: "",
    };

    let valid = true;

    if (!name.trim()) {
      newErrors.name =
        "Full name is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email =
        "Email is required";
      valid = false;
    } else if (
      !validateEmail(email.trim())
    ) {
      newErrors.email =
        "Enter a valid email address";
      valid = false;
    }

    if (!phone.trim()) {
      newErrors.phone =
        "Phone number is required";
      valid = false;
    } else if (
      !/^[0-9]{10}$/.test(phone)
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password =
        "Password is required";
      valid = false;
    } else if (
      password.length < 8
    ) {
      newErrors.password =
        "Password must be at least 8 characters";
      valid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirm =
        "Please confirm your password";
      valid = false;
    } else if (
      password !== confirmPassword
    ) {
      newErrors.confirm =
        "Passwords do not match";
      valid = false;
    }

    if (!agree) {
      newErrors.agree =
        "Please accept the terms and conditions";
      valid = false;
    }

    setErrors(newErrors);

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
              onPress={goToLogin}
            />

            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />

            <Text style={styles.heading}>
              Create New Account
            </Text>

            {/* NAME */}
            <View style={styles.field}>

              <CustomInput
                icon="person-outline"
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => {
                  setName(text);

                  setErrors({
                    ...errors,
                    name: "",
                  });
                }}
                error={!!errors.name}
              />

              {errors.name ? (
                <Text style={styles.error}>
                  {errors.name}
                </Text>
              ) : null}

            </View>

            {/* EMAIL */}
            <View style={styles.field}>

              <CustomInput
                icon="mail-outline"
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);

                  setErrors({
                    ...errors,
                    email: "",
                  });
                }}
                keyboardType="email-address"
                error={!!errors.email}
              />

              {errors.email ? (
                <Text style={styles.error}>
                  {errors.email}
                </Text>
              ) : null}

            </View>

            {/* PHONE */}
            <View style={styles.field}>

              <CustomInput
                icon="call-outline"
                placeholder="Phone Number"
                value={phone}
                onChangeText={(text) => {
                  setPhone(
                    text.replace(
                      /[^0-9]/g,
                      ""
                    )
                  );

                  setErrors({
                    ...errors,
                    phone: "",
                  });
                }}
                keyboardType="phone-pad"
                error={!!errors.phone}
              />

              {errors.phone ? (
                <Text style={styles.error}>
                  {errors.phone}
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

                  setErrors({
                    ...errors,
                    password: "",
                  });
                }}
                error={!!errors.password}
              />

              {errors.password ? (
                <Text style={styles.error}>
                  {errors.password}
                </Text>
              ) : null}

            </View>

            {/* CONFIRM PASSWORD */}
            <View style={styles.field}>

              <PasswordInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);

                  setErrors({
                    ...errors,
                    confirm: "",
                  });
                }}
                error={!!errors.confirm}
              />

              {errors.confirm ? (
                <Text style={styles.error}>
                  {errors.confirm}
                </Text>
              ) : null}

            </View>

            {/* TERMS */}
            <TouchableOpacity
              style={styles.terms}
              onPress={() => {
                setAgree(!agree);

                setErrors({
                  ...errors,
                  agree: "",
                });
              }}
            >

              <View
                style={[
                  styles.checkbox,
                  agree &&
                    styles.checked,
                ]}
              >
                {agree && (
                  <Ionicons
                    name="checkmark"
                    size={15}
                    color={colors.white}
                  />
                )}
              </View>

              <Text style={styles.termsText}>
                I agree to the Terms &
                Conditions
              </Text>

            </TouchableOpacity>

            {errors.agree ? (
              <Text
                style={styles.agreeError}
              >
                {errors.agree}
              </Text>
            ) : null}

            {/* CREATE ACCOUNT */}
            <CustomButton
              title="Create Account"
              onPress={handleSignup}
            />

            {/* LOGIN */}
            <View style={styles.bottom}>

              <Text style={styles.gray}>
                Already have an account?
              </Text>

              <TouchableOpacity
                onPress={goToLogin}
              >
                <Text style={styles.link}>
                  {" "}Sign In
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

      {/* SUCCESS MODAL */}
      <SuccessModal
        visible={showSuccess}
        title="Account Created Successfully"
        message="Your MediConnect account has been created successfully."
        buttonText="Continue to Login"
        onPress={() => {
          setShowSuccess(false);
          goToLogin();
        }}
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
    marginBottom: 20,
  },

  field: {
    width: "100%",
    marginBottom: 9,
  },

  error: {
    color: colors.error,
    fontSize: 11,
    marginTop: 3,
    marginLeft: 4,
  },

  terms: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  checked: {
    backgroundColor: colors.primary,
  },

  termsText: {
    color: "#555555",
    fontSize: 12,
    marginLeft: 8,
  },

  agreeError: {
    width: "100%",
    color: colors.error,
    fontSize: 11,
    marginTop: 3,
  },

  bottom: {
    flexDirection: "row",
    marginTop: 18,
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

export default SignUpScreen;