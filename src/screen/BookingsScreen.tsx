import React, { useState } from "react";
import {
  Alert, Modal, SafeAreaView, ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from "react-native";
import colors from "../theme/theme";
type Booking = {
  id: number;
  doctor: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  status: "upcoming" | "completed";
};
type Props = { goToConsultation: () => void };

export default function BookingsScreen({ goToConsultation }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([{
    id: 1, doctor: "girish", specialty: "density", hospital: "kmch",
    date: "18/9/2026", time: "5:30", status: "upcoming",
  }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const upcomingBookings = bookings.filter(b => b.status === "upcoming");
  const pastBookings = bookings.filter(b => b.status === "completed");

  const clearForm = () => {
    setDoctor(""); setSpecialty(""); setHospital(""); setDate(""); setTime("");
  };
  const openBookingForm = () => {
    clearForm(); setModalVisible(true);
  };
  const closeBookingForm = () => {
    setModalVisible(false); clearForm();
  };

  const bookAppointment = () => {
    if ([doctor, specialty, hospital, date, time].some(v => !v.trim())) {
      Alert.alert("Missing Details", "Please enter all appointment details.");
      return;
    }
    const newAppointment: Booking = {
      id: Date.now(), doctor: doctor.trim(), specialty: specialty.trim(),
      hospital: hospital.trim(), date: date.trim(), time: time.trim(),
      status: "upcoming",
    };
    setBookings(current => [...current, newAppointment]);
    closeBookingForm();
    Alert.alert("Appointment Booked", "Your appointment has been booked successfully.");
  };

  const cancelAppointment = (id: number) => {
    Alert.alert("Cancel Appointment", "Are you sure you want to cancel this appointment?", [
      { text: "No", style: "cancel" },
      { text: "Yes", style: "destructive",
        onPress: () => setBookings(current => current.filter(b => b.id !== id)) },
    ]);
  };

  const completeAppointment = (id: number) => {
    setBookings(current => current.map(b =>
      b.id === id ? { ...b, status: "completed" } : b
    ));
  };

  const renderInput = (
    label: string, placeholder: string, value: string,
    onChangeText: (text: string) => void
  ) => (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  const renderBooking = (booking: Booking, past = false) => (
    <View key={booking.id} style={past ? styles.pastAppointment : styles.appointment}>
      <Text style={styles.doctorName}>{booking.doctor}</Text>
      <Text style={styles.specialty}>{booking.specialty}</Text>
      <Text style={styles.detail}>Hospital: {booking.hospital}</Text>
      <Text style={styles.detail}>Date: {booking.date}</Text>
      <Text style={styles.detail}>Time: {booking.time}</Text>
      {!past && (
        <>
          <View style={styles.divider} />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton}
              onPress={() => cancelAppointment(booking.id)} activeOpacity={0.8}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.consultationButton}
              onPress={goToConsultation} activeOpacity={0.8}>
              <Text style={styles.consultationText}>Start Consultation</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>
          Manage your appointments and upcoming consultations.
        </Text>

        <View style={styles.bookingCard}>
          <View style={styles.upcomingBadge}>
            <Text style={styles.upcomingText}>Upcoming</Text>
          </View>
          {upcomingBookings.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Upcoming Appointments</Text>
              <Text style={styles.emptyText}>Book an appointment to see it here.</Text>
            </View>
          ) : upcomingBookings.map(booking => renderBooking(booking))}
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={openBookingForm} activeOpacity={0.8}>
          <Text style={styles.bookButtonText}>+ Book New Appointment</Text>
        </TouchableOpacity>

        <View style={styles.pastCard}>
          <Text style={styles.pastTitle}>Past Appointments</Text>
          {pastBookings.length === 0 ? (
            <Text style={styles.pastText}>
              Your completed appointments will appear here.
            </Text>
          ) : pastBookings.map(booking => renderBooking(booking, true))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeBookingForm}>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Appointment</Text>
              <TouchableOpacity onPress={closeBookingForm}>
                <Text style={styles.closeText}>X</Text>
              </TouchableOpacity>
            </View>

            {renderInput("Doctor Name", "Enter doctor name", doctor, setDoctor)}
            {renderInput("Specialty", "Enter specialty", specialty, setSpecialty)}
            {renderInput("Hospital", "Enter hospital name", hospital, setHospital)}
            {renderInput("Date", "DD/MM/YYYY", date, setDate)}
            {renderInput("Time", "Example: 5:30 PM", time, setTime)}

            <TouchableOpacity style={styles.confirmButton}
              onPress={bookAppointment} activeOpacity={0.8}>
              <Text style={styles.confirmText}>Confirm Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FBFF" },
  content: { paddingHorizontal: 24, paddingTop: 25, paddingBottom: 100 },
  title: { fontSize: 30, fontWeight: "700", color: "#193B7A" },
  subtitle: { fontSize: 14, color: "#777777", marginTop: 8, lineHeight: 21 },
  bookingCard: {
    backgroundColor: "#FFFFFF", borderRadius: 14, borderWidth: 1,
    borderColor: "#E5E5E5", padding: 22, marginTop: 24,
  },
  upcomingBadge: {
    alignSelf: "flex-start", backgroundColor: "#F4F7FD",
    borderRadius: 7, paddingHorizontal: 11, paddingVertical: 7, marginBottom: 15,
  },
  upcomingText: { color: "#3569CF", fontSize: 12, fontWeight: "600" },
  appointment: { width: "100%" },
  doctorName: { fontSize: 18, fontWeight: "700", color: "#193B7A" },
  specialty: { fontSize: 14, color: "#3569CF", marginTop: 5 },
  detail: { fontSize: 14, color: "#777777", marginTop: 9 },
  divider: { height: 1, backgroundColor: "#EEEEEE", marginTop: 18, marginBottom: 16 },
  buttonRow: { flexDirection: "row", gap: 10 },
  cancelButton: {
    flex: 1, height: 46, borderRadius: 9, borderWidth: 1,
    borderColor: "#E5E5E5", alignItems: "center", justifyContent: "center",
  },
  cancelText: { color: "#E53935", fontSize: 14, fontWeight: "600" },
  consultationButton: {
    flex: 1, height: 46, borderRadius: 9, backgroundColor: "#3569CF",
    alignItems: "center", justifyContent: "center",
  },
  consultationText: {
    color: "#FFFFFF", fontSize: 12, fontWeight: "700", textAlign: "center",
  },
  emptyContainer: { paddingVertical: 15 },
  emptyTitle: { fontSize: 15, fontWeight: "600", color: "#193B7A" },
  emptyText: { fontSize: 13, color: "#777777", marginTop: 6 },
  bookButton: {
    height: 53, borderRadius: 11, backgroundColor: "#3569CF",
    alignItems: "center", justifyContent: "center", marginTop: 20,
  },
  bookButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  pastCard: {
    backgroundColor: "#FFFFFF", borderRadius: 14, borderWidth: 1,
    borderColor: "#E5E5E5", padding: 22, marginTop: 22,
  },
  pastTitle: { fontSize: 19, fontWeight: "700", color: "#193B7A" },
  pastText: { fontSize: 14, color: "#777777", marginTop: 10, lineHeight: 20 },
  pastAppointment: {
    marginTop: 18, paddingTop: 18, borderTopWidth: 1, borderTopColor: "#EEEEEE",
  },
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#FFFFFF", borderTopLeftRadius: 22, borderTopRightRadius: 22,
    paddingHorizontal: 24, paddingTop: 22, paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    marginBottom: 8,
  },
  modalTitle: { fontSize: 21, fontWeight: "700", color: "#193B7A" },
  closeText: { fontSize: 18, fontWeight: "600", color: "#777777" },
  inputLabel: {
    fontSize: 13, fontWeight: "600", color: "#193B7A",
    marginTop: 12, marginBottom: 6,
  },
  input: {
    height: 46, borderWidth: 1, borderColor: "#E1E1E1", borderRadius: 9,
    paddingHorizontal: 13, fontSize: 14, color: "#222222", backgroundColor: "#FFFFFF",
  },
  confirmButton: {
    height: 50, backgroundColor: "#3569CF", borderRadius: 10,
    alignItems: "center", justifyContent: "center", marginTop: 20,
  },
  confirmText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
});
