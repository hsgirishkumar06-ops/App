import React, { useState } from "react";

import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/theme";

type Message = {
  id: string;
  text: string;
  sender: "user" | "doctor";
  time: string;
};

const doctorImage =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80";

export default function ChatScreen() {
  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: "1",
        text: "Hello! How can I help you today?",
        sender: "doctor",
        time: "4:30 PM",
      },
    ]);

  const [message, setMessage] =
    useState("");

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  /* =========================
     SEND MESSAGE
  ========================= */

  const sendMessage = () => {
    const trimmedMessage =
      message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: trimmedMessage,
      sender: "user",
      time: getCurrentTime(),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);

    setMessage("");
  };

  /* =========================
     PHONE CALL
  ========================= */

  const makePhoneCall = () => {
    Alert.alert(
      "Phone Call",
      "Start a phone call with Dr. John Smith?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call",
          onPress: () => {
            Linking.openURL(
              "tel:+919999999999"
            );
          },
        },
      ]
    );
  };

  /* =========================
     VIDEO CALL
  ========================= */

  const startVideoCall = () => {
    Alert.alert(
      "Video Call",
      "Starting video call with Dr. John Smith..."
    );
  };

  /* =========================
     VOICE MESSAGE
  ========================= */

  const sendVoiceMessage = () => {
    Alert.alert(
      "Voice Message",
      "Voice message recording will start here."
    );
  };

  /* =========================
     MESSAGE ITEM
  ========================= */

  const renderMessage = ({
    item,
  }: {
    item: Message;
  }) => {
    const isUser =
      item.sender === "user";

    return (
      <View
        style={[
          styles.messageRow,
          isUser &&
            styles.userMessageRow,
        ]}
      >
        {!isUser && (
          <Image
            source={{
              uri: doctorImage,
            }}
            style={styles.smallDoctorImage}
          />
        )}

        <View
          style={[
            styles.messageBubble,
            isUser
              ? styles.userBubble
              : styles.doctorBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUser &&
                styles.userMessageText,
            ]}
          >
            {item.text}
          </Text>

          <Text
            style={[
              styles.messageTime,
              isUser &&
                styles.userMessageTime,
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

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

        {/* =========================
            DOCTOR HEADER
        ========================= */}

        <View style={styles.header}>

          <Image
            source={{
              uri: doctorImage,
            }}
            style={styles.doctorImage}
          />

          <View style={styles.doctorInfo}>
            <Text
              style={styles.doctorName}
              numberOfLines={1}
            >
              Dr. John Smith
            </Text>

            <View
              style={styles.statusContainer}
            >
              <View
                style={styles.onlineDot}
              />

              <Text
                style={styles.onlineText}
              >
                Online
              </Text>
            </View>
          </View>

          {/* PHONE */}

          <TouchableOpacity
            style={styles.headerButton}
            onPress={makePhoneCall}
            activeOpacity={0.7}
          >
            <Ionicons
              name="call-outline"
              size={21}
              color={colors.blue}
            />
          </TouchableOpacity>

          {/* VIDEO */}

          <TouchableOpacity
            style={styles.headerButton}
            onPress={startVideoCall}
            activeOpacity={0.7}
          >
            <Ionicons
              name="videocam-outline"
              size={23}
              color={colors.blue}
            />
          </TouchableOpacity>

        </View>

        {/* =========================
            CHAT AREA
        ========================= */}

        <View
          style={styles.chatContainer}
        >
          <FlatList
            data={messages}
            keyExtractor={(item) =>
              item.id
            }
            renderItem={
              renderMessage
            }
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.messageList
            }
            keyboardShouldPersistTaps="handled"
          />
        </View>

        {/* =========================
            MESSAGE INPUT
        ========================= */}

        <View style={styles.inputArea}>

          {/* MICROPHONE */}

          <TouchableOpacity
            style={styles.micButton}
            onPress={
              sendVoiceMessage
            }
            activeOpacity={0.7}
          >
            <Ionicons
              name="mic-outline"
              size={24}
              color={colors.blue}
            />
          </TouchableOpacity>

          {/* TEXT INPUT */}

          <View
            style={styles.inputContainer}
          >
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor={
                colors.gray
              }
              style={styles.input}
              multiline
              maxLength={500}
              textAlignVertical="center"
            />
          </View>

          {/* SEND */}

          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() &&
                styles.disabledSendButton,
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="send"
              size={19}
              color={colors.white}
            />
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* =========================
     MAIN
  ========================= */

  safeArea: {
    flex: 1,
    backgroundColor:
      colors.background,
  },

  container: {
    flex: 1,
    backgroundColor:
      colors.background,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    height: 64,

    backgroundColor:
      colors.white,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 12,

    borderBottomWidth: 1,

    borderBottomColor:
      colors.border,
  },

  doctorImage: {
    width: 46,

    height: 46,

    borderRadius: 23,
  },

  doctorInfo: {
    marginLeft: 10,

    flex: 1,

    justifyContent: "center",
  },

  doctorName: {
    fontSize: 17,

    lineHeight: 21,

    fontWeight: "700",

    color: colors.darkBlue,
  },

  statusContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 2,
  },

  onlineDot: {
    width: 7,

    height: 7,

    borderRadius: 4,

    backgroundColor:
      colors.success,

    marginRight: 5,
  },

  onlineText: {
    fontSize: 13,

    lineHeight: 16,

    color: colors.gray,
  },

  headerButton: {
    width: 38,

    height: 38,

    alignItems: "center",

    justifyContent: "center",

    marginLeft: 2,
  },

  /* =========================
     CHAT
  ========================= */

  chatContainer: {
    flex: 1,
  },

  messageList: {
    paddingHorizontal: 12,

    paddingTop: 20,

    paddingBottom: 15,
  },

  messageRow: {
    flexDirection: "row",

    alignItems: "flex-end",

    marginBottom: 14,
  },

  userMessageRow: {
    justifyContent: "flex-end",
  },

  smallDoctorImage: {
    width: 34,

    height: 34,

    borderRadius: 17,

    marginRight: 8,
  },

  messageBubble: {
    maxWidth: "78%",

    paddingHorizontal: 15,

    paddingVertical: 10,

    borderRadius: 16,
  },

  doctorBubble: {
    backgroundColor:
      colors.white,

    borderWidth: 1,

    borderColor:
      colors.border,

    borderBottomLeftRadius: 4,
  },

  userBubble: {
    backgroundColor:
      colors.blue,

    borderBottomRightRadius: 4,
  },

  messageText: {
    fontSize: 15,

    lineHeight: 21,

    color: colors.text,
  },

  userMessageText: {
    color: colors.white,
  },

  messageTime: {
    fontSize: 10,

    color: colors.gray,

    marginTop: 4,

    textAlign: "right",
  },

  userMessageTime: {
    color: colors.white,

    opacity: 0.8,
  },

  /* =========================
     INPUT AREA
  ========================= */

  inputArea: {
    minHeight: 68,

    backgroundColor:
      colors.white,

    borderTopWidth: 1,

    borderTopColor:
      colors.border,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 10,

    paddingVertical: 8,
  },

  micButton: {
    width: 42,

    height: 48,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 4,
  },

  inputContainer: {
    flex: 1,

    height: 50,

    backgroundColor:
      colors.inputBackground,

    borderRadius: 25,

    justifyContent: "center",

    paddingHorizontal: 16,

    marginRight: 8,
  },

  input: {
    height: 50,

    fontSize: 15,

    color: colors.text,

    paddingTop: 0,

    paddingBottom: 0,
  },

  sendButton: {
    width: 50,

    height: 50,

    borderRadius: 25,

    backgroundColor:
      colors.blue,

    alignItems: "center",

    justifyContent: "center",
  },

  disabledSendButton: {
    backgroundColor:
      "#AFC4EF",
  },
});