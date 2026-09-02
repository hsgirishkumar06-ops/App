import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
} from "react-native";

import HomeHeader from "../components/HomeHeader";
import HomeSearch from "../components/HomeSearch";
import SectionTitle from "../components/SectionTitle";
import ScheduleCard from "../components/ScheduleCard";
import SpecialtyList from "../components/SpecialtyList";
import HospitalList from "../components/HospitalList";
import TopDoctors from "../components/TopDoctors";
import HomeBottomNav from "../components/HomeBottomNav";

import colors from "../theme/theme";

type Props = {
  onTabPress?: (tab: string) => void;
  goToOnboarding?: () => void;
};

export default function HomeScreen({
  onTabPress,
  goToOnboarding,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {/* Header */}
          <HomeHeader />

          {/* Search */}
          <HomeSearch />

          {/* Upcoming Schedule */}
          <SectionTitle
            title="Upcoming Schedule"
            badge="8"
          />

          <ScheduleCard />

          {/* Doctor Specialty */}
          <SectionTitle
            title="Doctor Specialty"
          />

          <SpecialtyList />

          {/* Nearby Hospitals */}
          <SectionTitle
            title="Nearby Hospitals"
          />

          <HospitalList />

          {/* Top Doctors */}
          <SectionTitle
            title="Top Doctors"
          />

          <TopDoctors />

        </ScrollView>

        {/* Bottom Navigation */}
        <HomeBottomNav
          onTabPress={onTabPress}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 11,

    // Keeps content below Android status bar
    paddingTop:
      (StatusBar.currentHeight || 0) + 8,

    // Space for bottom navigation
    paddingBottom: 85,
  },
});