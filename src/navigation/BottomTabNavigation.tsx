import React, { useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import BottomTabBar from "../components/BottomTabBar";

import HomeScreen from "../screen/HomeScreen";
import ExploreScreen from "../screen/ExploreScreen";
import BookingsScreen from "../screen/BookingsScreen";
import ChatScreen from "../screen/ChatScreen";
import ProfileScreen from "../screen/ProfileScreen";

type Tab =
  | "home"
  | "explore"
  | "bookings"
  | "chat"
  | "profile";

type Props = {
  goToLogin: () => void;
  goToConsultation: () => void;
};

export default function BottomTabNavigation({
  goToLogin,
  goToConsultation,
}: Props) {
  const [activeTab, setActiveTab] =
    useState<Tab>("home");

  return (
    <View style={styles.container}>

      <View style={styles.screenContainer}>

        {activeTab === "home" && (
          <HomeScreen />
        )}

        {activeTab === "explore" && (
          <ExploreScreen />
        )}

        {activeTab === "bookings" && (
          <BookingsScreen
            goToConsultation={
              goToConsultation
            }
          />
        )}

        {activeTab === "chat" && (
          <ChatScreen />
        )}

        {activeTab === "profile" && (
          <ProfileScreen
            goToLogin={goToLogin}
          />
        )}

      </View>

      <BottomTabBar
        activeTab={activeTab}
        onTabPress={(tab) => {
          setActiveTab(tab);
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  screenContainer: {
    flex: 1,
  },
});