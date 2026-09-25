import { StyleSheet } from "react-native";

import colors from "./theme";

const exploreStyles = StyleSheet.create({
  // =====================================================
  // MAIN
  // =====================================================

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 5,
  },

  // =====================================================
  // SEARCH
  // =====================================================

  searchContainer: {
    height: 54,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: colors.text,
  },

  // =====================================================
  // SECTIONS
  // =====================================================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },

  foundText: {
    fontSize: 12,
    color: colors.gray,
  },

  // =====================================================
  // SPECIALTIES
  // =====================================================

  specialtiesContainer: {
    gap: 10,
    paddingBottom: 2,
  },

  specialtyButton: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  activeSpecialtyButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  specialtyText: {
    fontSize: 13,
    color: colors.gray,
  },

  activeSpecialtyText: {
    color: colors.white,
    fontWeight: "600",
  },

  // =====================================================
  // DOCTOR CARD
  // =====================================================

  doctorCard: {
    minHeight: 124,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  doctorImage: {
    width: 76,
    height: 94,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 14,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  doctorSpecialty: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 5,
  },

  doctorHospital: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },

  doctorBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  rating: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 4,
    fontWeight: "600",
  },

  experience: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 12,
  },

  arrow: {
    marginLeft: 8,
  },

  // =====================================================
  // HOSPITAL CARD
  // =====================================================

  hospitalCard: {
    minHeight: 120,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  hospitalImage: {
    width: 82,
    height: 82,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
  },

  hospitalInfo: {
    flex: 1,
    marginLeft: 14,
  },

  hospitalName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  hospitalSpecialty: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 5,
  },

  hospitalLocation: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },

  hospitalBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  doctorCount: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 12,
  },

  // =====================================================
  // EMPTY
  // =====================================================

  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 25,
    alignItems: "center",
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },

  emptyText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
  },

  // =====================================================
  // DOCTOR DETAILS
  // =====================================================

  detailsContent: {
    paddingBottom: 35,
  },

  backButton: {
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  backText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: "600",
  },

  detailsImage: {
    width: "100%",
    height: 300,
    backgroundColor: colors.inputBackground,
  },

  detailsHeader: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  detailsName: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  detailsSpecialty: {
    fontSize: 15,
    color: colors.primary,
    marginTop: 6,
    fontWeight: "600",
  },

  detailsHospital: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 5,
  },

  // =====================================================
  // RATING CARD
  // =====================================================

  ratingCard: {
    marginHorizontal: 20,
    marginTop: 18,
    paddingVertical: 18,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  ratingItem: {
    flex: 1,
    alignItems: "center",
  },

  ratingValueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  ratingValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  ratingLabel: {
    fontSize: 11,
    color: colors.gray,
    marginTop: 5,
  },

  verticalLine: {
    width: 1,
    height: 35,
    backgroundColor: colors.border,
  },

  // =====================================================
  // ABOUT
  // =====================================================

  detailsSectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.darkBlue,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },

  aboutCard: {
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  aboutText: {
    fontSize: 13,
    color: colors.gray,
    lineHeight: 21,
  },

  // =====================================================
  // INFO
  // =====================================================

  infoCard: {
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },

  infoText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
  },

  // =====================================================
  // AVAILABILITY
  // =====================================================

  availabilityCard: {
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  availabilityLabel: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "600",
  },

  availabilityTime: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },

  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  bookButton: {
    height: 54,
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: colors.primary,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  bookButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default exploreStyles;