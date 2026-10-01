import React, { useState } from "react";

import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
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

type PopupType = "success" | "warning" | "confirm";

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

  const [message, setMessage] = useState("");

  // =====================================================
  // CUSTOM POPUP STATE
  // =====================================================

  const [popupVisible, setPopupVisible] =
    useState(false);

  const [popupTitle, setPopupTitle] =
    useState("");

  const [popupMessage, setPopupMessage] =
    useState("");

  const [popupButtonText, setPopupButtonText] =
    useState("Continue");

  const [popupType, setPopupType] =
    useState<PopupType>("success");

  const [popupConfirmAction, setPopupConfirmAction] =
    useState<(() => void) | null>(null);

  // =====================================================
  // CURRENT TIME
  // =====================================================

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // =====================================================
  // CUSTOM POPUP FUNCTIONS
  // =====================================================

  const showPopup = (
    title: string,
    message: string,
    buttonText: string = "Continue",
    type: PopupType = "success",
    confirmAction?: () => void
  ) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupButtonText(buttonText);
    setPopupType(type);

    setPopupConfirmAction(
      () => confirmAction || null
    );

    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupConfirmAction(null);
  };

  const handlePopupConfirm = () => {
    const action = popupConfirmAction;

    setPopupVisible(false);
    setPopupConfirmAction(null);

    if (action) {
      action();
    }
  };

  // =====================================================
  // SEND MESSAGE
  // =====================================================

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

  // =====================================================
  // PHONE CALL
  // =====================================================

  const makePhoneCall = () => {
    showPopup(
      "Phone Call",
      "Start a phone call with Dr. John Smith?",
      "Call",
      "confirm",
      () => {
        Linking.openURL(
          "tel:+919999999999"
        );
      }
    );
  };

  // =====================================================
  // VIDEO CALL
  // =====================================================

  const startVideoCall = () => {
    showPopup(
      "Video Call",
      "Starting video call with Dr. John Smith...",
      "Continue",
      "success"
    );
  };

  // =====================================================
  // VOICE MESSAGE
  // =====================================================

  const sendVoiceMessage = () => {
    showPopup(
      "Voice Message",
      "Voice message recording will start here.",
      "Continue",
      "success"
    );
  };

  // =====================================================
  // MESSAGE ITEM
  // =====================================================

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

  // =====================================================
  // POPUP ICON
  // =====================================================

  const getPopupIcon = () => {
    if (popupType === "warning") {
      return "alert-circle-outline";
    }

    if (popupType === "confirm") {
      return "help-circle-outline";
    }

    return "checkmark";
  };

  // =====================================================
  // MAIN UI
  // =====================================================

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
        {/* =================================================
            DOCTOR HEADER
        ================================================= */}

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

        {/* =================================================
            CHAT AREA
        ================================================= */}

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

        {/* =================================================
            MESSAGE INPUT
        ================================================= */}

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

      {/* =================================================
          CUSTOM POPUP
      ================================================= */}

      <Modal
        visible={popupVisible}
        transparent
        animationType="fade"
        onRequestClose={closePopup}
      >
        <View style={styles.popupOverlay}>
          <View
            style={styles.popupContainer}
          >
            {/* POPUP ICON */}

            <View style={styles.popupIcon}>
              <Ionicons
                name={getPopupIcon()}
                size={34}
                color={colors.white}
              />
            </View>

            {/* POPUP TITLE */}

            <Text style={styles.popupTitle}>
              {popupTitle}
            </Text>

            {/* POPUP MESSAGE */}

            <Text
              style={styles.popupMessage}
            >
              {popupMessage}
            </Text>

            {/* POPUP BUTTONS */}

            {popupType === "confirm" ? (
              <View
                style={
                  styles.popupButtonRow
                }
              >
                {/* NO */}

                <TouchableOpacity
                  style={
                    styles.popupCancelButton
                  }
                  onPress={closePopup}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      styles.popupCancelButtonText
                    }
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                {/* YES */}

                <TouchableOpacity
                  style={
                    styles.popupConfirmButton
                  }
                  onPress={
                    handlePopupConfirm
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      styles.popupConfirmButtonText
                    }
                  >
                    {popupButtonText}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.popupButton}
                onPress={
                  handlePopupConfirm
                }
                activeOpacity={0.8}
              >
                <Text
                  style={
                    styles.popupButtonText
                  }
                >
                  {popupButtonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
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
    backgroundColor:
      colors.background,
  },

  container: {
    flex: 1,
    backgroundColor:
      colors.background,
  },

  // ===================================================
  // HEADER
  // ===================================================

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

  // ===================================================
  // CHAT
  // ===================================================

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

  // ===================================================
  // INPUT AREA
  // ===================================================

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

  // ===================================================
  // CUSTOM POPUP
  // ===================================================

  popupOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  popupContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor:
      colors.white,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },

  popupIcon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor:
      colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  popupTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.darkBlue,
    textAlign: "center",
    lineHeight: 29,
  },

  popupMessage: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 24,
  },

  popupButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    backgroundColor:
      colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  popupButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  popupButtonRow: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },

  popupCancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },

  popupCancelButtonText: {
    color: colors.gray,
    fontSize: 15,
    fontWeight: "600",
  },

  popupConfirmButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor:
      colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  popupConfirmButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
});