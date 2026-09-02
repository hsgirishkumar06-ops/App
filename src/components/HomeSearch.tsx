import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/theme";

export default function HomeSearch() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={18}
          color={colors.blue}
        />

        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.gray}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.filterButton}>
        <Ionicons
          name="options-outline"
          size={20}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },

  searchBox: {
    flex: 1,
    height: 38,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },

  input: {
    flex: 1,
    marginLeft: 7,
    fontSize: 12,
    color: colors.text,
  },

  filterButton: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
});