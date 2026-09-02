import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/theme";
import { appointment } from "../data/homeData";

export default function ScheduleCard() {
  const handleCall = () => {
    Alert.alert(
      "Call Doctor",
      `Calling ${appointment.doctor}`
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.doctorContainer}>
          <Image
            source={{ uri: appointment.image }}
            style={styles.doctorImage}
          />

          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>
              {appointment.doctor}
            </Text>

            <Text style={styles.specialty}>
              {appointment.specialty}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCall}
        >
          <Ionicons
            name="call"
            size={17}
            color={colors.blue}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons
            name="calendar-outline"
            size={15}
            color={colors.white}
          />

          <Text style={styles.detailText}>
            {appointment.date}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <Ionicons
            name="time-outline"
            size={15}
            color={colors.white}
          />

          <Text style={styles.detailText}>
            {appointment.time}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    padding: 13,
    marginBottom: 18,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
  },

  doctorContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  doctorImage: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: colors.white,
    marginRight: 9,
  },

  doctorDetails: {
    flex: 1,
  },

  doctorName: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "600",
  },

  specialty: {
    color: "#EAF2FF",
    fontSize: 10,
    marginTop: 2,
  },

  callButton: {
    width: 33,
    height: 33,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  detailsContainer: {
    height: 35,
    borderRadius: 7,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  detailText: {
    color: colors.white,
    fontSize: 9,
  },

  divider: {
    width: 1,
    height: 17,
    backgroundColor: "#8AB5FF",
  },
});