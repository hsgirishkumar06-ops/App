import React, { useState } from "react";
import {
  Modal, SafeAreaView,
  ScrollView, Text,
  TextInput, TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/theme";
import styles from "../theme/bookingStyles";
type Booking = {
  id: number; doctor: string;
  specialty: string; hospital: string;
  date: string; time: string;
  status: "upcoming" | "completed";
};
type Props = {
  goToConsultation: () => void;
};
type PopupType = "success" | "warning" | "confirm";
type FieldProps = {
  label: string; placeholder: string;
  value: string; onChangeText: (value: string) => void;
};
const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
];
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
function InputField({ label, placeholder, value, onChangeText }: FieldProps) {
  return (
    <> <Text style={styles.inputLabel}>{label}</Text>
      <TextInput style={styles.input}
        placeholder={placeholder} placeholderTextColor={colors.gray}
        value={value} onChangeText={onChangeText}
      /> </>
  );
}
type IconFieldProps = {
  value: string; placeholder: string;
  icon: any; onPress: () => void;
};
function IconField({ value, placeholder, icon, onPress }: IconFieldProps) {
  return (
    <TouchableOpacity style={styles.iconInput}
      onPress={onPress} activeOpacity={0.8}
    > <Text style={[styles.fieldValue, !value && styles.placeholder]}>
        {value || placeholder} </Text>
      <Ionicons name={icon} size={21} color={colors.blue} /> </TouchableOpacity>
  );
}
type ModalHeaderProps = {
  title: string; onClose: () => void;
};
function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <View style={styles.modalHeader}> <Text style={styles.modalTitle}>{title}</Text>
      <TouchableOpacity onPress={onClose}> <Ionicons name="close" size={25} color={colors.gray} />
      </TouchableOpacity> </View>
  );
}
type TimeColumnProps = {
  value: number; increase: () => void;
  decrease: () => void;
};
function TimeColumn({ value, increase, decrease }: TimeColumnProps) {
  return (
    <View style={styles.timeColumn}> <TouchableOpacity style={styles.timeArrow} onPress={increase}>
        <Ionicons name="chevron-up" size={24} color={colors.blue} /> </TouchableOpacity>
      <View style={styles.timeValueBox}> <Text style={styles.timeValue}>
          {String(value).padStart(2, "0")} </Text>
      </View> <TouchableOpacity style={styles.timeArrow} onPress={decrease}>
        <Ionicons name="chevron-down" size={24} color={colors.blue} /> </TouchableOpacity>
    </View> );
}
export default function BookingsScreen({ goToConsultation }: Props) {
  const today = new Date();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1, doctor: "girish",
      specialty: "density", hospital: "kmch",
      date: "18/09/2026", time: "5:30 PM",
      status: "upcoming",
    }, ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState(5);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [selectedPeriod, setSelectedPeriod] =
    useState<"AM" | "PM">("PM");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupButtonText, setPopupButtonText] = useState("Continue");
  const [popupType, setPopupType] = useState<PopupType>("success");
  const [popupConfirmAction, setPopupConfirmAction] =
    useState<(() => void) | null>(null);
  const showPopup = (
    title: string, message: string,
    buttonText = "Continue", type: PopupType = "success",
    action?: () => void ) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupButtonText(buttonText);
    setPopupType(type);
    setPopupConfirmAction(() => action || null);
    setPopupVisible(true);
  };
  const closePopup = () => {
    setPopupVisible(false);
    setPopupConfirmAction(null);
  };
  const handlePopupConfirm = () => {
    const action = popupConfirmAction;
    closePopup();
    if (action) action();
  };
  const openBookingForm = () => {
    setDoctor("");
    setSpecialty("");
    setHospital("");
    setDate("");
    setTime("");
    setModalVisible(true);
  };
  const closeBookingForm = () => {
    setModalVisible(false);
    setCalendarVisible(false);
    setTimePickerVisible(false);
  };
  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDay = (month: number, year: number) =>
    new Date(year, month, 1).getDay();
  const previousMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };
  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };
  const selectDate = (day: number) => {
    const formatted =
      `${String(day).padStart(2, "0")}/` + `${String(calendarMonth + 1).padStart(2, "0")}/` +
      calendarYear;
    setDate(formatted);
    setCalendarVisible(false);
  };
  const renderCalendarDays = () => {
    const totalDays = getDaysInMonth(calendarMonth, calendarYear);
    const firstDay = getFirstDay(calendarMonth, calendarYear);
    const cells: React.ReactNode[] = [];
    for (let i = 0; i < firstDay; i++) {
      cells.push( <View key={`empty-${i}`} style={styles.calendarDay} />
      );
    }
    for (let day = 1; day <= totalDays; day++) {
      const formatted =
        `${String(day).padStart(2, "0")}/` + `${String(calendarMonth + 1).padStart(2, "0")}/` +
        calendarYear;
      const dayDate = new Date(calendarYear, calendarMonth, day);
      const selected = date === formatted;
      const isToday =
        dayDate.getDate() === today.getDate() && dayDate.getMonth() === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear(); cells.push(
        <TouchableOpacity key={`day-${day}`}
          style={[ styles.calendarDay,
            selected && styles.selectedCalendarDay, !selected && isToday && styles.todayCalendarDay,
          ]} onPress={() => selectDate(day)}
          activeOpacity={0.7} >
          <Text style={[
              styles.calendarDayText, selected && styles.selectedCalendarDayText,
              !selected && isToday && styles.todayCalendarDayText, ]}
          > {day}
          </Text> </TouchableOpacity>
      );
    }
    return cells;
  };
  const formatTime = () =>
    `${String(selectedHour).padStart(2, "0")}:` + `${String(selectedMinute).padStart(2, "0")} ${selectedPeriod}`;
  const selectTime = () => {
    setTime(formatTime());
    setTimePickerVisible(false);
  };
  const increaseHour = () =>
    setSelectedHour(selectedHour === 12 ? 1 : selectedHour + 1);
  const decreaseHour = () =>
    setSelectedHour(selectedHour === 1 ? 12 : selectedHour - 1);
  const increaseMinute = () =>
    setSelectedMinute(selectedMinute >= 55 ? 0 : selectedMinute + 5);
  const decreaseMinute = () =>
    setSelectedMinute(selectedMinute <= 0 ? 55 : selectedMinute - 5);
  const bookAppointment = () => {
    if (
      !doctor.trim() || !specialty.trim() ||
      !hospital.trim() || !date.trim() ||
      !time.trim() ) {
      showPopup( "Missing Details",
        "Please enter all appointment details.", "Continue",
        "warning" );
      return;
    }
    const appointment: Booking = {
      id: Date.now(), doctor: doctor.trim(),
      specialty: specialty.trim(), hospital: hospital.trim(),
      date: date.trim(), time: time.trim(),
      status: "upcoming",
    };
    setBookings((current) => [appointment, ...current]);
    closeBookingForm(); showPopup(
      "Appointment Booked Successfully", "Your appointment has been booked successfully."
    );
  };
  const cancelAppointment = (id: number) => {
    showPopup( "Cancel Appointment",
      "Are you sure you want to cancel this appointment?", "Yes, Cancel",
      "confirm", () => {
        setBookings((current) =>
          current.filter((booking) => booking.id !== id) );
      } );
  };
  const renderBooking = (booking: Booking) => (
    <View key={booking.id} style={styles.appointment}> <Text style={styles.doctorName}>{booking.doctor}</Text>
      <Text style={styles.specialty}>{booking.specialty}</Text> <Text style={styles.detail}>Hospital: {booking.hospital}</Text>
      <Text style={styles.detail}>Date: {booking.date}</Text> <Text style={styles.detail}>Time: {booking.time}</Text>
      <View style={styles.divider} /> <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton}
          onPress={() => cancelAppointment(booking.id)} >
          <Text style={styles.cancelText}>Cancel</Text> </TouchableOpacity>
        <TouchableOpacity style={styles.consultationButton}
          onPress={goToConsultation} >
          <Text style={styles.consultationText}> Start Consultation
          </Text> </TouchableOpacity>
      </View> </View>
  );
  const popupIcon =
    popupType === "warning" ? "alert-circle-outline"
      : popupType === "confirm" ? "help-circle-outline"
      : "checkmark";
  const upcoming = bookings.filter(
    (booking) => booking.status === "upcoming" );
  return (
    <SafeAreaView style={styles.safeArea}> <ScrollView
        showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}
      > <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}> Manage your appointments and upcoming consultations.
        </Text> <View style={styles.bookingCard}>
          <View style={styles.upcomingBadge}> <Text style={styles.upcomingText}>Upcoming</Text>
          </View> {upcoming.length > 0 ? (
            upcoming.map(renderBooking) ) : (
            <View style={styles.emptyContainer}> <Text style={styles.emptyTitle}>
                No Upcoming Appointments </Text>
              <Text style={styles.emptyText}> Book an appointment to see it here.
              </Text> </View>
          )} </View>
        <TouchableOpacity style={styles.bookButton}
          onPress={openBookingForm} activeOpacity={0.8}
        > <Text style={styles.bookButtonText}>
            + Book New Appointment </Text>
        </TouchableOpacity> <View style={styles.pastCard}>
          <Text style={styles.pastTitle}>Past Appointments</Text> <Text style={styles.pastText}>
            Your completed appointments will appear here. </Text>
        </View> </ScrollView>
      <Modal
        visible={modalVisible} transparent
        animationType="slide" onRequestClose={closeBookingForm}
      > <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <ModalHeader
              title="Book Appointment" onClose={closeBookingForm}
            /> <InputField
              label="Doctor Name" placeholder="Enter doctor name"
              value={doctor} onChangeText={setDoctor}
            /> <InputField
              label="Specialty" placeholder="Enter specialty"
              value={specialty} onChangeText={setSpecialty}
            /> <InputField
              label="Hospital" placeholder="Enter hospital name"
              value={hospital} onChangeText={setHospital}
            /> <Text style={styles.inputLabel}>Date</Text>
            <IconField value={date}
              placeholder="Select Date" icon="calendar-outline"
              onPress={() => setCalendarVisible(true)} />
            <Text style={styles.inputLabel}>Time</Text> <IconField
              value={time} placeholder="Select Time"
              icon="time-outline" onPress={() => setTimePickerVisible(true)}
            /> <TouchableOpacity
              style={styles.confirmButton} onPress={bookAppointment}
              activeOpacity={0.8} >
              <Text style={styles.confirmText}> Confirm Appointment
              </Text> </TouchableOpacity>
          </View> </View>
      </Modal>
      <Modal
        visible={calendarVisible} transparent
        animationType="fade" onRequestClose={() => setCalendarVisible(false)}
      > <View style={styles.pickerOverlay}>
          <View style={styles.calendarContainer}>
            <ModalHeader
              title="Select Date" onClose={() => setCalendarVisible(false)}
            /> <View style={styles.monthHeader}>
              <TouchableOpacity style={styles.monthArrow}
                onPress={previousMonth} >
                <Ionicons name="chevron-back"
                  size={22} color={colors.blue}
                /> </TouchableOpacity>
              <Text style={styles.monthTitle}> {monthNames[calendarMonth]} {calendarYear}
              </Text> <TouchableOpacity
                style={styles.monthArrow} onPress={nextMonth}
              > <Ionicons
                  name="chevron-forward" size={22}
                  color={colors.blue} />
              </TouchableOpacity> </View>
            <View style={styles.weekRow}> {weekDays.map((day) => (
                <Text key={day} style={styles.weekDay}> {day}
                </Text> ))}
            </View> <View style={styles.calendarGrid}>
              {renderCalendarDays()} </View>
          </View> </View>
      </Modal>
      <Modal
        visible={timePickerVisible} transparent
        animationType="fade" onRequestClose={() => setTimePickerVisible(false)}
      > <View style={styles.pickerOverlay}>
          <View style={styles.timeContainer}>
            <ModalHeader
              title="Select Time" onClose={() => setTimePickerVisible(false)}
            /> <View style={styles.clockCircle}>
              <Ionicons name="time-outline"
                size={40} color={colors.white}
              /> </View>
            <Text style={styles.selectedTime}> {formatTime()}
            </Text> <View style={styles.timeSelectorRow}>
              <TimeColumn value={selectedHour}
                increase={increaseHour} decrease={decreaseHour}
              /> <Text style={styles.timeColon}>:</Text>
              <TimeColumn value={selectedMinute}
                increase={increaseMinute} decrease={decreaseMinute}
              /> <View style={styles.periodContainer}>
                {(["AM", "PM"] as const).map((period) => ( <TouchableOpacity
                    key={period} style={[
                      styles.periodButton, selectedPeriod === period &&
                        styles.selectedPeriod, ]}
                    onPress={() => setSelectedPeriod(period)} >
                    <Text style={[
                        styles.periodText, selectedPeriod === period &&
                          styles.selectedPeriodText, ]}
                    > {period}
                    </Text> </TouchableOpacity>
                ))} </View>
            </View> <TouchableOpacity
              style={styles.confirmButton} onPress={selectTime}
              activeOpacity={0.8} >
              <Text style={styles.confirmText}>Select Time</Text> </TouchableOpacity>
          </View> </View>
      </Modal>
      <Modal
        visible={popupVisible} transparent
        animationType="fade" onRequestClose={closePopup}
      > <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}> <View style={styles.popupIcon}>
              <Ionicons name={popupIcon as any}
                size={34} color={colors.white}
              /> </View>
            <Text style={styles.popupTitle}>{popupTitle}</Text> <Text style={styles.popupMessage}>
              {popupMessage} </Text>
            {popupType === "confirm" ? ( <View style={styles.popupButtonRow}>
                <TouchableOpacity style={styles.popupCancelButton}
                  onPress={closePopup} >
                  <Text style={styles.popupCancelButtonText}> No
                  </Text> </TouchableOpacity>
                <TouchableOpacity style={styles.popupConfirmButton}
                  onPress={handlePopupConfirm} >
                  <Text style={styles.popupConfirmButtonText}> Yes
                  </Text> </TouchableOpacity>
              </View> ) : (
              <TouchableOpacity style={styles.popupButton}
                onPress={handlePopupConfirm} >
                <Text style={styles.popupButtonText}> {popupButtonText}
                </Text> </TouchableOpacity>
            )} </View>
        </View>
      </Modal>
    </SafeAreaView> );
}
