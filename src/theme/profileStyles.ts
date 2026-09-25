import { StyleSheet } from "react-native";
import colors from "./theme";

const styles = StyleSheet.create({
  // ========================================
  // COMMON
  // ========================================

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingBottom: 35,
  },

  pageContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 40,
  },

  // ========================================
  // PROFILE HEADER
  // ========================================

  profileHeader: {
    backgroundColor: colors.white,
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.primary,
  },

  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.primary,
  },

  profileName: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.darkBlue,
    marginTop: 14,
  },

  profileEmail: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 5,
  },

  editProfileButton: {
    marginTop: 15,
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  editProfileText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },

  // ========================================
  // SECTIONS
  // ========================================

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.darkBlue,
    marginTop: 24,
    marginBottom: 10,
    paddingHorizontal: 16,
  },

  menuCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  menuItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  menuContent: {
    flex: 1,
    marginLeft: 13,
    paddingVertical: 4,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },

  menuSubtitle: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },

  // ========================================
  // LOGOUT
  // ========================================

  logoutButton: {
    height: 54,
    marginHorizontal: 16,
    marginTop: 28,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  logoutIcon: {
    marginRight: 9,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.error,
  },

  versionText: {
    textAlign: "center",
    fontSize: 11,
    color: colors.gray,
    marginTop: 16,
  },

  // ========================================
  // HEADER
  // ========================================

  header: {
    height: 58,
    width: "100%",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  headerBackButton: {
    position: "absolute",
    left: 12,
    top: 7,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  headerTitle: {
    maxWidth: "72%",
    fontSize: 19,
    fontWeight: "700",
    color: colors.darkBlue,
    textAlign: "center",
  },

  headerPlaceholder: {
    width: 44,
    height: 44,
  },

  // ========================================
  // PERSONAL INFORMATION
  // ========================================

  largeAvatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.inputBackground,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    borderWidth: 3,
    borderColor: colors.primary,
  },

  largeAvatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.primary,
  },

  changePhotoButton: {
    alignSelf: "center",
    marginTop: 9,
    marginBottom: 18,
  },

  changePhotoText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 2,
  },

  input: {
    width: "100%",
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.text,
  },

  primaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },

  // ========================================
  // PASSWORD
  // ========================================

  infoBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 13,
    padding: 15,
    marginTop: 18,
    marginBottom: 2,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.darkBlue,
  },

  infoText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
    lineHeight: 17,
  },

  // ========================================
  // SETTINGS
  // ========================================

  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkBlue,
    marginTop: 20,
    marginBottom: 10,
  },

  settingCard: {
    minHeight: 76,
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  settingInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },

  settingSubtitle: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
    lineHeight: 17,
  },

  settingValue: {
    fontSize: 13,
    color: colors.gray,
  },

  simpleCard: {
    minHeight: 58,
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  simpleCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  // ========================================
  // HELP
  // ========================================

  helpHeader: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 18,
  },

  helpIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  helpTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.darkBlue,
    textAlign: "center",
  },

  faqCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },

  faqQuestion: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  faqAnswer: {
    fontSize: 12,
    color: colors.gray,
    lineHeight: 18,
    marginTop: 8,
  },

  // ========================================
  // ABOUT
  // ========================================

  aboutLogo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 28,
  },

  aboutTitle: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "700",
    color: colors.darkBlue,
    marginTop: 15,
  },

  aboutVersion: {
    textAlign: "center",
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
  },

  aboutDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 22,
    paddingHorizontal: 8,
  },

  aboutCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginTop: 24,
  },

  aboutCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkBlue,
    marginBottom: 14,
  },

  aboutFeature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },

  aboutFeatureText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 9,
  },

  copyright: {
    textAlign: "center",
    fontSize: 11,
    color: colors.gray,
    marginTop: 25,
  },
});

export default styles;