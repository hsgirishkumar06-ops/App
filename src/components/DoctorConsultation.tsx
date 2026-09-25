import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../theme/theme";

type Props = {
  onBack: () => void;
  onOpenChat: () => void;
  onOpenMedicalRecords: () => void;
};

export default function DoctorConsultation({
  onBack,
  onOpenChat,
  onOpenMedicalRecords,
}: Props) {
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  const endConsultation = () => {
    Alert.alert(
      "End Consultation",
      "Are you sure you want to end this consultation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "End",
          style: "destructive",
          onPress: onBack,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            Doctor Consultation
          </Text>

          <Text style={styles.headerSubtitle}>
            Live consultation
          </Text>
        </View>
      </View>

      {/* =========================
          DOCTOR INFORMATION
      ========================= */}

      <View style={styles.doctorCard}>
        <View style={styles.doctorAvatar}>
          <Text style={styles.avatarText}>
            D
          </Text>
        </View>

        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>
            Dr. Rajesh Kumar
          </Text>

          <Text style={styles.specialization}>
            General Physician
          </Text>

          <Text style={styles.hospital}>
            Apollo Hospitals
          </Text>
        </View>

        <Text style={styles.online}>
          Online
        </Text>
      </View>

      {/* =========================
          VIDEO AREA
      ========================= */}

      <View style={styles.videoContainer}>

        <View style={styles.mainVideo}>
          <View style={styles.largeAvatar}>
            <Text style={styles.largeAvatarText}>
              D
            </Text>
          </View>

          <Text style={styles.videoDoctorName}>
            Dr. Rajesh Kumar
          </Text>

          <Text style={styles.videoStatus}>
            Consultation in progress
          </Text>

          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>
              LIVE
            </Text>
          </View>
        </View>

        {/* PATIENT VIDEO */}

        <View style={styles.patientVideo}>
          {cameraOn ? (
            <>
              <View style={styles.patientAvatar}>
                <Text style={styles.patientAvatarText}>
                  G
                </Text>
              </View>

              <Text style={styles.patientName}>
                You
              </Text>
            </>
          ) : (
            <Text style={styles.cameraOff}>
              Camera Off
            </Text>
          )}
        </View>

      </View>

      {/* =========================
          TIMER
      ========================= */}

      <View style={styles.timerCard}>
        <View>
          <Text style={styles.timerLabel}>
            Consultation started
          </Text>

          <Text style={styles.timerDescription}>
            Your consultation is currently active
          </Text>
        </View>

        <Text style={styles.timer}>
          00:12:35
        </Text>
      </View>

      {/* =========================
          MAIN CONTROLS
      ========================= */}

      <View style={styles.controls}>

        <TouchableOpacity
          style={[
            styles.controlButton,
            muted && styles.controlActive,
          ]}
          onPress={() =>
            setMuted((value) => !value)
          }
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.controlText,
              muted && styles.controlActiveText,
            ]}
          >
            {muted ? "Unmute" : "Mute"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            !cameraOn && styles.controlActive,
          ]}
          onPress={() =>
            setCameraOn((value) => !value)
          }
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.controlText,
              !cameraOn && styles.controlActiveText,
            ]}
          >
            {cameraOn ? "Camera" : "Camera Off"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            !speakerOn && styles.controlActive,
          ]}
          onPress={() =>
            setSpeakerOn((value) => !value)
          }
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.controlText,
              !speakerOn && styles.controlActiveText,
            ]}
          >
            {speakerOn ? "Speaker" : "Speaker Off"}
          </Text>
        </TouchableOpacity>

      </View>

      {/* =========================
          CHAT + MEDICAL RECORDS
      ========================= */}

      <View style={styles.secondaryActions}>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onOpenChat}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryText}>
            Chat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onOpenMedicalRecords}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryText}>
            Medical Records
          </Text>
        </TouchableOpacity>

      </View>

      {/* =========================
          END CONSULTATION
      ========================= */}

      <TouchableOpacity
        style={styles.endButton}
        onPress={endConsultation}
        activeOpacity={0.8}
      >
        <Text style={styles.endButtonText}>
          End Consultation
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* HEADER */

  header: {
    height: 72,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "400",
    lineHeight: 32,
  },

  headerInfo: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  headerSubtitle: {
    fontSize: 12,
    color: colors.success,
    marginTop: 3,
  },

  /* DOCTOR */

  doctorCard: {
    marginHorizontal: 20,
    marginTop: 18,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
  },

  doctorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: colors.white,
    fontSize: 21,
    fontWeight: "700",
  },

  doctorDetails: {
    flex: 1,
    marginLeft: 12,
  },

  doctorName: {
    color: colors.darkBlue,
    fontSize: 16,
    fontWeight: "700",
  },

  specialization: {
    color: colors.primary,
    fontSize: 12,
    marginTop: 4,
  },

  hospital: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 3,
  },

  online: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "700",
  },

  /* VIDEO */

  videoContainer: {
    height: 290,
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#202020",
    position: "relative",
  },

  mainVideo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  largeAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  largeAvatarText: {
    color: colors.white,
    fontSize: 38,
    fontWeight: "700",
  },

  videoDoctorName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
  },

  videoStatus: {
    color: "#D0D0D0",
    fontSize: 12,
    marginTop: 5,
  },

  liveBadge: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.error,
  },

  liveText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "700",
  },

  /* PATIENT VIDEO */

  patientVideo: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 100,
    height: 125,
    borderRadius: 10,
    backgroundColor: "#333333",
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  patientAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  patientAvatarText: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "700",
  },

  patientName: {
    color: colors.white,
    fontSize: 11,
    marginTop: 6,
  },

  cameraOff: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "600",
  },

  /* TIMER */

  timerCard: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 14,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timerLabel: {
    color: colors.darkBlue,
    fontSize: 13,
    fontWeight: "600",
  },

  timerDescription: {
    color: colors.gray,
    fontSize: 11,
    marginTop: 3,
  },

  timer: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700",
  },

  /* CONTROLS */

  controls: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 14,
  },

  controlButton: {
    flex: 1,
    height: 44,
    backgroundColor: colors.white,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  controlActive: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.primary,
  },

  controlText: {
    color: colors.darkBlue,
    fontSize: 11,
    fontWeight: "600",
  },

  controlActiveText: {
    color: colors.primary,
  },

  /* SECONDARY */

  secondaryActions: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },

  secondaryButton: {
    flex: 1,
    height: 42,
    backgroundColor: colors.white,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "600",
  },

  /* END */

  endButton: {
    height: 48,
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 15,
    backgroundColor: colors.error,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  endButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});