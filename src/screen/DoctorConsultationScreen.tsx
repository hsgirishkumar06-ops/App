import React from "react";
import {
  SafeAreaView,
  StyleSheet,
} from "react-native";

import DoctorConsultation from "../components/DoctorConsultation";

type Props = {
  goBack: () => void;
};

export default function DoctorConsultationScreen({
  goBack,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <DoctorConsultation
        onBack={goBack}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});