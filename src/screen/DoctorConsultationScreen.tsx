import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import DoctorConsultation from "../components/DoctorConsultation";
import ChatScreen from "./ChatScreen";
import colors from "../theme/theme";

type ScreenMode =
  | "consultation"
  | "chat"
  | "records";

type Props = {
  goBack: () => void;
};

export default function DoctorConsultationScreen({
  goBack,
}: Props) {
  const [screenMode, setScreenMode] =
    useState<ScreenMode>("consultation");

  // ========================================
  // GO BACK TO DOCTOR CONSULTATION
  // ========================================
  const goToConsultation = () => {
    setScreenMode("consultation");
  };

  // ========================================
  // OPEN CHAT
  // ========================================
  const openChat = () => {
    setScreenMode("chat");
  };

  // ========================================
  // OPEN MEDICAL RECORDS
  // ========================================
  const openRecords = () => {
    setScreenMode("records");
  };

  // ========================================
  // CHAT SCREEN
  // ========================================
  if (screenMode === "chat") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={goToConsultation}
            activeOpacity={0.6}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={colors.primary}
            />
          </TouchableOpacity>

          <Text
            style={styles.subHeaderTitle}
            pointerEvents="none"
          >
            Chat
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <View style={styles.content}>
          <ChatScreen />
        </View>
      </SafeAreaView>
    );
  }

  // ========================================
  // MEDICAL RECORDS SCREEN
  // ========================================
  if (screenMode === "records") {
    return (
      <SafeAreaView style={styles.container}>
        {/* MEDICAL RECORDS HEADER */}
        <View style={styles.subHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setScreenMode("consultation");
            }}
            activeOpacity={0.6}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={colors.primary}
            />
          </TouchableOpacity>

          <Text
            style={styles.subHeaderTitle}
            pointerEvents="none"
          >
            Medical Records
          </Text>

          <View style={styles.headerSpace} />
        </View>

        {/* MEDICAL RECORDS CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.recordsContent}
        >
          {/* PATIENT INFORMATION */}
          <View style={styles.patientCard}>
            <Text style={styles.patientName}>
              Girish Kumar
            </Text>

            <Text style={styles.patientInfo}>
              Patient ID: P00124
            </Text>

            <Text style={styles.patientInfo}>
              Age: 25
            </Text>
          </View>

          {/* MEDICAL HISTORY */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Medical History
            </Text>

            <View
              style={[
                styles.tableRow,
                styles.tableHeader,
              ]}
            >
              <Text
                style={[
                  styles.tableText,
                  styles.dateColumn,
                  styles.headerText,
                ]}
              >
                Date
              </Text>

              <Text
                style={[
                  styles.tableText,
                  styles.conditionColumn,
                  styles.headerText,
                ]}
              >
                Condition
              </Text>

              <Text
                style={[
                  styles.tableText,
                  styles.doctorColumn,
                  styles.headerText,
                ]}
              >
                Doctor
              </Text>
            </View>

            <RecordRow
              date="12 Sep"
              condition="Fever"
              doctor="Dr. Rajesh"
            />

            <RecordRow
              date="05 Aug"
              condition="Headache"
              doctor="Dr. Kumar"
            />

            <RecordRow
              date="21 Jul"
              condition="Allergy"
              doctor="Dr. Priya"
            />

            <RecordRow
              date="14 Jun"
              condition="Cold"
              doctor="Dr. Rajesh"
            />
          </View>

          {/* PRESCRIPTIONS */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Prescriptions
            </Text>

            <View style={styles.recordRow}>
              <View>
                <Text style={styles.medicineName}>
                  Paracetamol 500mg
                </Text>

                <Text style={styles.medicineInfo}>
                  1 tablet • Twice daily
                </Text>
              </View>

              <Text style={styles.activeText}>
                Active
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.recordRow}>
              <View>
                <Text style={styles.medicineName}>
                  Cetirizine 10mg
                </Text>

                <Text style={styles.medicineInfo}>
                  1 tablet • Night
                </Text>
              </View>

              <Text style={styles.activeText}>
                Active
              </Text>
            </View>
          </View>

          {/* RECENT REPORTS */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Recent Reports
            </Text>

            <ReportRow
              name="Blood Test"
              date="12 Sep 2026"
            />

            <ReportRow
              name="CBC Report"
              date="12 Sep 2026"
            />

            <ReportRow
              name="X-Ray"
              date="05 Aug 2026"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ========================================
  // DOCTOR CONSULTATION SCREEN
  // ========================================
  return (
    <SafeAreaView style={styles.container}>
      <DoctorConsultation
        onBack={goBack}
        onOpenChat={openChat}
        onOpenMedicalRecords={openRecords}
      />
    </SafeAreaView>
  );
}

// ========================================
// MEDICAL HISTORY ROW
// ========================================

type RecordRowProps = {
  date: string;
  condition: string;
  doctor: string;
};

function RecordRow({
  date,
  condition,
  doctor,
}: RecordRowProps) {
  return (
    <View style={styles.tableRow}>
      <Text
        style={[
          styles.tableText,
          styles.dateColumn,
        ]}
      >
        {date}
      </Text>

      <Text
        style={[
          styles.tableText,
          styles.conditionColumn,
        ]}
      >
        {condition}
      </Text>

      <Text
        style={[
          styles.tableText,
          styles.doctorColumn,
        ]}
      >
        {doctor}
      </Text>
    </View>
  );
}

// ========================================
// REPORT ROW
// ========================================

type ReportRowProps = {
  name: string;
  date: string;
};

function ReportRow({
  name,
  date,
}: ReportRowProps) {
  return (
    <View style={styles.reportRow}>
      <Text style={styles.reportName}>
        {name}
      </Text>

      <Text style={styles.reportDate}>
        {date}
      </Text>
    </View>
  );
}

// ========================================
// STYLES
// ========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
  },

  // ========================================
  // HEADER
  // ========================================

  subHeader: {
    height: 62,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  backButton: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  subHeaderTitle: {
    position: "absolute",
    left: 56,
    right: 56,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  headerSpace: {
    width: 56,
  },

  // ========================================
  // MEDICAL RECORDS
  // ========================================

  recordsContent: {
    padding: 18,
    paddingBottom: 35,
  },

  patientCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 15,
  },

  patientName: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  patientInfo: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 5,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 15,
    overflow: "hidden",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkBlue,
    padding: 16,
    paddingBottom: 12,
  },

  // ========================================
  // TABLE
  // ========================================

  tableRow: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  tableHeader: {
    backgroundColor: colors.inputBackground,
    borderTopWidth: 0,
  },

  tableText: {
    fontSize: 12,
    color: colors.text,
    paddingHorizontal: 4,
  },

  dateColumn: {
    width: "24%",
  },

  conditionColumn: {
    width: "36%",
  },

  doctorColumn: {
    width: "40%",
  },

  headerText: {
    fontWeight: "700",
    color: colors.darkBlue,
  },

  // ========================================
  // PRESCRIPTIONS
  // ========================================

  recordRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  medicineName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },

  medicineInfo: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },

activeText: {
  fontSize: 12,
  fontWeight: "600",
  color: colors.success,
},

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },

  // ========================================
  // REPORTS
  // ========================================

  reportRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  reportName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },

  reportDate: {
    fontSize: 12,
    color: colors.gray,
  },
});