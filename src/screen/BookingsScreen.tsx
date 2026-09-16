import React, { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../theme/theme";

type Booking = {
  id: number;
  doctor: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  completed: boolean;
};

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [doctor, setDoctor] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const upcoming = bookings.filter(
    (item) => !item.completed
  );

  const past = bookings.filter(
    (item) => item.completed
  );

  const addBooking = () => {
    if (
      !doctor.trim() ||
      !specialty.trim() ||
      !hospital.trim() ||
      !date.trim() ||
      !time.trim()
    ) {
      Alert.alert(
        "Missing Details",
        "Please fill all fields."
      );
      return;
    }

    const newBooking: Booking = {
      id: Date.now(),
      doctor: doctor.trim(),
      specialty: specialty.trim(),
      hospital: hospital.trim(),
      date: date.trim(),
      time: time.trim(),
      completed: false,
    };

    setBookings((current) => [
      ...current,
      newBooking,
    ]);

    setDoctor("");
    setSpecialty("");
    setHospital("");
    setDate("");
    setTime("");
    setShowModal(false);

    Alert.alert(
      "Success",
      "Appointment booked successfully."
    );
  };

  const cancelBooking = (id: number) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            setBookings((current) =>
              current.filter(
                (item) => item.id !== id
              )
            );
          },
        },
      ]
    );
  };

  const completeBooking = (id: number) => {
    setBookings((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, completed: true }
          : item
      )
    );

    Alert.alert(
      "Completed",
      "Appointment moved to Past Appointments."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          My Bookings
        </Text>

        <Text style={styles.subtitle}>
          Manage your appointments and upcoming consultations.
        </Text>

        {/* Upcoming Appointments */}

        <View style={styles.card}>
          <Text style={styles.badge}>
            Upcoming
          </Text>

          {upcoming.length === 0 ? (
            <>
              <Text style={styles.heading}>
                Doctor Appointment
              </Text>

              <Text style={styles.details}>
                Your upcoming appointments will appear here.
              </Text>

              <View style={styles.divider} />

              <Text style={styles.empty}>
                No upcoming appointments
              </Text>
            </>
          ) : (
            upcoming.map((item) => (
              <View key={item.id}>
                <Text style={styles.heading}>
                  {item.doctor}
                </Text>

                <Text style={styles.specialty}>
                  {item.specialty}
                </Text>

                <Text style={styles.details}>
                  🏥 {item.hospital}
                </Text>

                <Text style={styles.details}>
                  📅 {item.date}
                </Text>

                <Text style={styles.details}>
                  🕐 {item.time}
                </Text>

                <View style={styles.divider} />

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() =>
                      cancelBooking(item.id)
                    }
                  >
                    <Text style={styles.cancelText}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() =>
                      completeBooking(item.id)
                    }
                  >
                    <Text style={styles.whiteText}>
                      Completed
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* New Booking */}

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.whiteText}>
            + Book New Appointment
          </Text>
        </TouchableOpacity>

        {/* Past Appointments */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Past Appointments
          </Text>

          {past.length === 0 ? (
            <Text style={styles.details}>
              Your completed appointments will appear here.
            </Text>
          ) : (
            past.map((item) => (
              <View
                key={item.id}
                style={styles.pastItem}
              >
                <Text style={styles.heading}>
                  {item.doctor}
                </Text>

                <Text style={styles.specialty}>
                  {item.specialty}
                </Text>

                <Text style={styles.details}>
                  🏥 {item.hospital}
                </Text>

                <Text style={styles.details}>
                  📅 {item.date}
                </Text>

                <Text style={styles.completed}>
                  ✓ Completed
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Booking Modal */}

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setShowModal(false)
        }
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Book Appointment
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setShowModal(false)
                }
              >
                <Text style={styles.close}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Doctor name"
              placeholderTextColor={colors.gray}
              value={doctor}
              onChangeText={setDoctor}
            />

            <TextInput
              style={styles.input}
              placeholder="Specialty"
              placeholderTextColor={colors.gray}
              value={specialty}
              onChangeText={setSpecialty}
            />

            <TextInput
              style={styles.input}
              placeholder="Hospital"
              placeholderTextColor={colors.gray}
              value={hospital}
              onChangeText={setHospital}
            />

            <TextInput
              style={styles.input}
              placeholder="Date"
              placeholderTextColor={colors.gray}
              value={date}
              onChangeText={setDate}
            />

            <TextInput
              style={styles.input}
              placeholder="Time"
              placeholderTextColor={colors.gray}
              value={time}
              onChangeText={setTime}
            />

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={addBooking}
            >
              <Text style={styles.whiteText}>
                Confirm Appointment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 100,
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

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.inputBackground,
    color: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 12,
    fontWeight: "600",
  },

  heading: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.darkBlue,
  },

  specialty: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 5,
  },

  details: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 8,
    lineHeight: 19,
  },

  empty: {
    fontSize: 13,
    color: colors.text,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 15,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: colors.error,
    fontSize: 12,
    fontWeight: "600",
  },

  completeButton: {
    flex: 1,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  whiteText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "600",
  },

  bookButton: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.darkBlue,
  },

  pastItem: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 15,
    paddingTop: 15,
  },

  completed: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: colors.white,
    padding: 24,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  close: {
    fontSize: 20,
    color: colors.gray,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    color: colors.text,
  },

  confirmButton: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
});