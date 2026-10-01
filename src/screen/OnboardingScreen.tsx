import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

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
  const [current, setCurrent] = useState(0);

  const slide = slides[current];

  // =====================================================
  // CONTINUE
  // =====================================================

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

        {/* =================================================
            LOGO
        ================================================= */}

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>

        {/* =================================================
            IMAGE
        ================================================= */}

        <View style={styles.imageContainer}>

          <View style={styles.backgroundCircle} />

          <Image
            source={slide.image}
            style={styles.onboardingImage}
          />

        </View>

        {/* =================================================
            TITLE
        ================================================= */}

        <Text style={styles.title}>
          {slide.title}
        </Text>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <Text style={styles.description}>
          {slide.description}
        </Text>

        {/* =================================================
            DOTS
        ================================================= */}

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

        {/* =================================================
            CONTINUE BUTTON
        ================================================= */}

        <View style={styles.navigation}>
          <CustomButton
            title={
              current === slides.length - 1
                ? "Get Started"
                : "Continue"
            }
            onPress={handleContinue}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // =====================================================
  // MAIN
  // =====================================================

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

  // =====================================================
  // LOGO
  // =====================================================

  logoContainer: {
    alignItems: "center",
    paddingTop: 10,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  // =====================================================
  // IMAGE
  // =====================================================

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

  // =====================================================
  // TITLE
  // =====================================================

  title: {
    color: colors.darkBlue,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    textAlign: "center",
    paddingHorizontal: 25,
  },

  // =====================================================
  // DESCRIPTION
  // =====================================================

  description: {
    color: "#667085",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 38,
    marginTop: 10,
  },

  // =====================================================
  // DOTS
  // =====================================================

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

  // =====================================================
  // CONTINUE BUTTON
  // =====================================================

  navigation: {
    width: "100%",
    paddingHorizontal: 28,
    marginTop: 19,
  },
});

export default OnboardingScreen;