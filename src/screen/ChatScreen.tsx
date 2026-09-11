import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../theme/theme";

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Chat
        </Text>

        <Text style={styles.subtitle}>
          Chat with doctors and manage your
          conversations.
        </Text>

        <TouchableOpacity
          style={styles.chatCard}
          activeOpacity={0.8}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              D
            </Text>
          </View>

          <View style={styles.chatInfo}>
            <Text style={styles.doctorName}>
              Doctor
            </Text>

            <Text style={styles.message}>
              Start a conversation with your
              doctor.
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No conversations yet
          </Text>

          <Text style={styles.emptyText}>
            Your doctor conversations will
            appear here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 8,
    lineHeight: 21,
  },

  chatCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 25,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },

  chatInfo: {
    flex: 1,
    marginLeft: 14,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkBlue,
  },

  message: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
  },

  arrow: {
    fontSize: 28,
    color: colors.gray,
    marginLeft: 8,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 70,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },

  emptyText: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 8,
    textAlign: "center",
  },
});