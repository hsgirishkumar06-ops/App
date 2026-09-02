import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../theme/theme";
import { topDoctors } from "../data/homeData";

function TopDoctors() {
  return (
    <View style={styles.container}>
      {topDoctors.map((doctor) => (
        <View
          key={doctor.name}
          style={styles.card}
        >
          <Image
            source={{ uri: doctor.image }}
            style={styles.image}
          />

          <View style={styles.details}>
            <Text
              numberOfLines={1}
              style={styles.name}
            >
              {doctor.name}
            </Text>

            <Text
              numberOfLines={1}
              style={styles.specialty}
            >
              {doctor.specialty}
            </Text>

            <View style={styles.rating}>
              <Text style={styles.star}>
                ★
              </Text>

              <Text style={styles.ratingText}>
                {doctor.rating}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
    marginBottom: 30,
  },

  card: {
    width: "48%",
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
  },

  details: {
    flex: 1,
    marginLeft: 8,
  },

  name: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.text,
  },

  specialty: {
    fontSize: 8,
    color: colors.gray,
    marginTop: 3,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  star: {
    fontSize: 9,
    color: "#F59E0B",
  },

  ratingText: {
    fontSize: 8,
    color: colors.text,
    marginLeft: 3,
  },
});

export default TopDoctors;