import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

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

export default function BottomTabNavigation() {
  const [activeTab, setActiveTab] =
    useState<Tab>("home");

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        {activeTab === "home" && <HomeScreen />}

        {activeTab === "explore" && (
          <ExploreScreen />
        )}

        {activeTab === "bookings" && (
          <BookingsScreen />
        )}

        {activeTab === "chat" && (
          <ChatScreen />
        )}

        {activeTab === "profile" && (
          <ProfileScreen />
        )}
      </View>

      <BottomTabBar
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  screen: {
    flex: 1,
  },
});