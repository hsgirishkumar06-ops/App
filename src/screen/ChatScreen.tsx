import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import colors from "../theme/theme";

// =====================================================
// MESSAGE TYPE
// =====================================================

type Message = {
  id: string;
  text: string;
  sender: "patient" | "doctor";
  time: string;
};

// =====================================================
// CHAT SCREEN
// =====================================================

export default function ChatScreen() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  // ===================================================
  // GET CURRENT TIME
  // ===================================================

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ===================================================
  // DOCTOR RESPONSE
  // ===================================================

  const getDoctorResponse = (userMessage: string) => {
    const text = userMessage.toLowerCase();

    // Greeting
    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return "Hello! How can I help you today?";
    }

    // Headache
    if (
      text.includes("headache") ||
      text.includes("head pain")
    ) {
      return "I understand. Please take some rest and drink enough water. If the headache continues or becomes severe, please consult a doctor.";
    }

    // Fever
    if (
      text.includes("fever") ||
      text.includes("temperature")
    ) {
      return "Please monitor your temperature and stay hydrated. If the fever is high or persistent, please consult a healthcare professional.";
    }

    // Cold / Cough
    if (
      text.includes("cold") ||
      text.includes("cough")
    ) {
      return "Please take adequate rest and drink plenty of fluids. If your symptoms continue or become severe, please consult a doctor.";
    }

    // Stomach
    if (
      text.includes("stomach") ||
      text.includes("abdominal")
    ) {
      return "Can you tell me how long you have been experiencing the stomach discomfort and whether you have any other symptoms?";
    }

    // Pain
    if (text.includes("pain")) {
      return "Please tell me where you are experiencing the pain and how long you have had it.";
    }

    // Medicine
    if (
      text.includes("medicine") ||
      text.includes("tablet") ||
      text.includes("medication")
    ) {
      return "Please do not take or change medication without medical advice. Tell me more about your symptoms.";
    }

    // Appointment
    if (
      text.includes("appointment") ||
      text.includes("booking")
    ) {
      return "You can use the Bookings section to manage your doctor appointments.";
    }

    // Thank you
    if (text.includes("thank")) {
      return "You're welcome! Please let me know if you have any other questions.";
    }

    // Help
    if (text.includes("help")) {
      return "Of course. Please describe your symptoms or tell me what you need help with.";
    }

    // Default response
    return "I understand. Could you provide a little more information about your symptoms or concern?";
  };

  // ===================================================
  // SEND MESSAGE
  // ===================================================

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    // Create patient message
    const patientMessage: Message = {
      id: Date.now().toString(),
      text: trimmedMessage,
      sender: "patient",
      time: getCurrentTime(),
    };

    // Add patient message
    setMessages((previousMessages) => [
      ...previousMessages,
      patientMessage,
    ]);

    // Clear input
    setMessage("");

    // Get doctor response
    const doctorResponse = getDoctorResponse(
      trimmedMessage
    );

    // Simulate doctor reply
    setTimeout(() => {
      const doctorMessage: Message = {
        id: `${Date.now()}-doctor`,
        text: doctorResponse,
        sender: "doctor",
        time: getCurrentTime(),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        doctorMessage,
      ]);
    }, 1000);
  };

  // ===================================================
  // RENDER MESSAGE
  // ===================================================

  const renderMessage = ({
    item,
  }: {
    item: Message;
  }) => {
    const isPatient = item.sender === "patient";

    return (
      <View
        style={[
          styles.messageRow,
          isPatient && styles.patientMessageRow,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isPatient
              ? styles.patientBubble
              : styles.doctorBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isPatient &&
                styles.patientMessageText,
            ]}
          >
            {item.text}
          </Text>

          <Text
            style={[
              styles.messageTime,
              isPatient &&
                styles.patientMessageTime,
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  // ===================================================
  // SCREEN
  // ===================================================

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        {/* =========================================
            HEADER
        ========================================= */}

        <View style={styles.header}>
          <View style={styles.doctorAvatar}>
            <Text style={styles.doctorAvatarText}>
              D
            </Text>
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.doctorName}>
              Doctor
            </Text>

            <View style={styles.onlineContainer}>
              <View style={styles.onlineDot} />

              <Text style={styles.onlineText}>
                Online
              </Text>
            </View>
          </View>
        </View>

        {/* =========================================
            CHAT MESSAGE LIST
        ========================================= */}

        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.messagesContainer
          }
        />

        {/* =========================================
            MESSAGE INPUT
        ========================================= */}

        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={colors.gray}
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() &&
                styles.disabledSendButton,
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.sendIcon}>
              ➤
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  // ===================================================
  // MAIN
  // ===================================================

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    height: 68,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  doctorAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  doctorAvatarText: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.primary,
  },

  headerInfo: {
    marginLeft: 14,
  },

  doctorName: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  onlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 6,
  },

  onlineText: {
    fontSize: 12,
    color: colors.gray,
  },

  // ===================================================
  // MESSAGE LIST
  // ===================================================

  messagesContainer: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 20,

    // Keeps the empty chat area expanded
    flexGrow: 1,
  },

  messageRow: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  patientMessageRow: {
    alignItems: "flex-end",
  },

  // ===================================================
  // MESSAGE BUBBLE
  // ===================================================

  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 16,
  },

  doctorBubble: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },

  patientBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },

  patientMessageText: {
    color: colors.white,
  },

  // ===================================================
  // MESSAGE TIME
  // ===================================================

  messageTime: {
    fontSize: 10,
    color: colors.gray,
    marginTop: 5,
    alignSelf: "flex-end",
  },

  patientMessageTime: {
    color: "#DCE7FF",
  },

  // ===================================================
  // INPUT CONTAINER
  // ===================================================

  inputContainer: {
    minHeight: 70,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  // ===================================================
  // TEXT INPUT
  // ===================================================

  input: {
    flex: 1,
    minHeight: 46,
    maxHeight: 100,
    backgroundColor: colors.inputBackground,
    borderRadius: 23,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    marginRight: 10,
  },

  // ===================================================
  // SEND BUTTON
  // ===================================================

  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  disabledSendButton: {
    opacity: 0.45,
  },

  sendIcon: {
    fontSize: 19,
    color: colors.white,
    marginLeft: 2,
  },
});