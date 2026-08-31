import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomButton from "../components/CustomButton";
import colors from "../theme/theme";

const { height } = Dimensions.get("window");

type Props = {
  goToLogin: () => void;
};

const slides = [
  {
    title: "Your Health, Our Priority",
    description:
      "Get trusted healthcare services and manage your health journey with MediConnect.",
    image: require("../../assets/onboarding1.png"),
  },

  {
    title: "Find the Right Doctor",
    description:
      "Discover experienced doctors and choose the right healthcare professional for your needs.",
    image: require("../../assets/onboarding2.png"),
  },

  {
    title: "Book Appointments Easily",
    description:
      "Book appointments quickly and manage your healthcare anytime, anywhere.",
    image: require("../../assets/onboarding3.png"),
  },
];

function OnboardingScreen({
  goToLogin,
}: Props) {
  const [current, setCurrent] =
    useState(0);

  const slide = slides[current];

  const previousSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleContinue = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      goToLogin();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>

        {/* TOP BAR */}
        <View style={styles.topBar}>

          <TouchableOpacity
            style={styles.topBack}
            onPress={previousSlide}
            disabled={current === 0}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color={
                current === 0
                  ? "#C8D3E3"
                  : colors.darkBlue
              }
            />
          </TouchableOpacity>

          <View style={styles.topRight}>

            <Text style={styles.page}>
              {current + 1}/3
            </Text>

            <TouchableOpacity
              onPress={goToLogin}
            >
              <Text style={styles.skip}>
                Skip
              </Text>
            </TouchableOpacity>

          </View>

        </View>

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>

        {/* IMAGE */}
        <View style={styles.imageContainer}>

          <View
            style={styles.backgroundCircle}
          />

          <Image
            source={slide.image}
            style={styles.onboardingImage}
          />

        </View>

        {/* TITLE */}
        <Text style={styles.title}>
          {slide.title}
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          {slide.description}
        </Text>

        {/* DOTS */}
        <View style={styles.dots}>

          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                current === index &&
                  styles.activeDot,
              ]}
            />
          ))}

        </View>

        {/* NAVIGATION */}
        <View style={styles.navigation}>

          {/* PREVIOUS */}
          <TouchableOpacity
            style={[
              styles.previousButton,
              current === 0 &&
                styles.disabledButton,
            ]}
            onPress={previousSlide}
            disabled={current === 0}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={
                current === 0
                  ? "#B8C7DB"
                  : colors.blue
              }
            />
          </TouchableOpacity>

          {/* CONTINUE */}
          <View style={styles.continueContainer}>

            <CustomButton
              title={
                current === slides.length - 1
                  ? "Get Started"
                  : "Continue"
              }
              icon={
                current === slides.length - 1
                  ? "checkmark"
                  : "arrow-forward"
              }
              onPress={handleContinue}
            />

          </View>

        </View>

        {/* SIGN IN */}
        <View style={styles.signInRow}>

          <Text style={styles.signInText}>
            Already have an account?
          </Text>

          <TouchableOpacity
            onPress={goToLogin}
          >
            <Text style={styles.signInLink}>
              {" "}Sign In
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  screen: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 28,
    paddingTop: 10,
  },

  topBack: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  topRight: {
    alignItems: "flex-end",
  },

  page: {
    color: colors.darkBlue,
    fontSize: 13,
    fontWeight: "700",
  },

  skip: {
    color: colors.darkBlue,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 9,
  },

  logoContainer: {
    alignItems: "center",
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  imageContainer: {
    height: Math.min(
      height * 0.43,
      350
    ),
    marginHorizontal: 25,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  backgroundCircle: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#E8F2FF",
  },

  onboardingImage: {
    width: "95%",
    height: "95%",
    resizeMode: "contain",
  },

  title: {
    color: colors.darkBlue,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    textAlign: "center",
    paddingHorizontal: 25,
  },

  description: {
    color: "#667085",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 38,
    marginTop: 10,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#D2E0F3",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 23,
    backgroundColor: colors.blue,
  },

  navigation: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    marginTop: 19,
    gap: 12,
  },

  previousButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#BCD4F5",
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#F3F7FC",
    borderColor: "#E3EAF3",
  },

  continueContainer: {
    flex: 1,
  },

  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
  },

  signInText: {
    color: "#98A2B3",
    fontSize: 12,
  },

  signInLink: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: "800",
  },
});

export default OnboardingScreen;