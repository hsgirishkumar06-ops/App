import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../theme/theme";
import { hospitals } from "../data/homeData";

export default function HospitalList() {
  return (
    <View style={styles.container}>
      {hospitals.map((hospital) => (
        <View
          key={hospital.name}
          style={styles.card}
        >
          <Image
            source={{ uri: hospital.image }}
            style={styles.image}
          />

          <View style={styles.rating}>
            <Text style={styles.star}>
              ★
            </Text>

            <Text style={styles.ratingText}>
              {hospital.rating}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={styles.name}
          >
            {hospital.name}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 70,
  },

  card: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    backgroundColor: colors.white,
  },

  image: {
    width: "100%",
    height: 82,
    backgroundColor: "#E9EEF5",
  },

  rating: {
    position: "absolute",
    right: 7,
    top: 65,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    flexDirection: "row",
    gap: 3,
  },

  star: {
    color: "#F59E0B",
    fontSize: 10,
  },

  ratingText: {
    fontSize: 9,
    color: colors.text,
  },

  name: {
    fontSize: 10,
    color: colors.text,
    padding: 8,
  },
});