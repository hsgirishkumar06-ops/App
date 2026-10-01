import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FBFF",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 100,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#193B7A",
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 8,
    lineHeight: 21,
  },

  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    padding: 22,
    marginTop: 24,
  },

  upcomingBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F4F7FD",
    borderRadius: 7,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginBottom: 15,
  },

  upcomingText: {
    color: "#3569CF",
    fontSize: 12,
    fontWeight: "600",
  },

  appointment: {
    width: "100%",
  },

  doctorName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#193B7A",
  },

  specialty: {
    fontSize: 14,
    color: "#3569CF",
    marginTop: 5,
  },

  detail: {
    fontSize: 14,
    color: "#777777",
    marginTop: 9,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginTop: 18,
    marginBottom: 16,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    height: 46,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "600",
  },

  consultationButton: {
    flex: 1,
    height: 46,
    borderRadius: 9,
    backgroundColor: "#3569CF",
    alignItems: "center",
    justifyContent: "center",
  },

  consultationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  emptyContainer: {
    paddingVertical: 15,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#193B7A",
  },

  emptyText: {
    fontSize: 13,
    color: "#777777",
    marginTop: 6,
  },

  bookButton: {
    height: 53,
    borderRadius: 11,
    backgroundColor: "#3569CF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  pastCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    padding: 22,
    marginTop: 22,
  },

  pastTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#193B7A",
  },

  pastText: {
    fontSize: 14,
    color: "#777777",
    marginTop: 10,
    lineHeight: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 30,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#193B7A",
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#193B7A",
    marginTop: 12,
    marginBottom: 6,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 9,
    paddingHorizontal: 13,
    fontSize: 14,
    color: "#222222",
    backgroundColor: "#FFFFFF",
  },

  iconInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 9,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  fieldValue: {
    flex: 1,
    fontSize: 14,
    color: "#222222",
  },

  placeholder: {
    color: "#777777",
  },

  confirmButton: {
    height: 50,
    backgroundColor: "#3569CF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  confirmText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  calendarContainer: {
    width: "100%",
    maxWidth: 390,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
  },

  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  calendarTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#193B7A",
  },

  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 18,
  },

  monthArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F4F7FD",
    alignItems: "center",
    justifyContent: "center",
  },

  monthTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#193B7A",
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },

  weekDay: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "700",
    color: "#98A2B3",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calendarDay: {
    width: "14.28%",
    height: 43,
    alignItems: "center",
    justifyContent: "center",
  },

  calendarDayText: {
    width: 36,
    height: 36,
    borderRadius: 18,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    color: "#333333",
  },

  selectedCalendarDay: {
    backgroundColor: "#3569CF",
    borderRadius: 18,
  },

  selectedCalendarDayText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  todayCalendarDay: {
    borderWidth: 1,
    borderColor: "#3569CF",
    borderRadius: 18,
  },

  todayCalendarDayText: {
    color: "#3569CF",
    fontWeight: "700",
  },

  timeContainer: {
    width: "100%",
    maxWidth: 390,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
  },

  clockCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#3569CF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 25,
  },

  selectedTime: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "#193B7A",
    marginTop: 18,
  },

  timeSelectorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  timeColumn: {
    alignItems: "center",
  },

  timeArrow: {
    width: 45,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  timeValueBox: {
    width: 65,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#F4F7FD",
    alignItems: "center",
    justifyContent: "center",
  },

  timeValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#193B7A",
  },

  timeColon: {
    fontSize: 26,
    fontWeight: "700",
    color: "#193B7A",
    marginHorizontal: 8,
  },

  periodContainer: {
    marginLeft: 15,
  },

  periodButton: {
    width: 58,
    height: 42,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 3,
    backgroundColor: "#F4F7FD",
  },

  selectedPeriod: {
    backgroundColor: "#3569CF",
  },

  periodText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#3569CF",
  },

  selectedPeriodText: {
    color: "#FFFFFF",
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  popupContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  popupTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#193B7A",
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
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  popupButtonText: {
    color: "#FFFFFF",
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
    color: "#777777",
    fontSize: 15,
    fontWeight: "600",
  },

  popupConfirmButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  popupConfirmButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default styles;
