import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../theme/theme";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experience: string;
  rating: string;
  fee: string;
};

type Hospital = {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: string;
  doctors: string;
};

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. John Smith",
    specialty: "Cardiologist",
    hospital: "City Care Hospital",
    experience: "12 Years",
    rating: "4.8",
    fee: "₹800",
  },
  {
    id: "2",
    name: "Dr. Sarah Wilson",
    specialty: "Dermatologist",
    hospital: "Apollo Hospital",
    experience: "8 Years",
    rating: "4.7",
    fee: "₹600",
  },
  {
    id: "3",
    name: "Dr. Michael Brown",
    specialty: "Neurologist",
    hospital: "Global Health Hospital",
    experience: "15 Years",
    rating: "4.9",
    fee: "₹1000",
  },
  {
    id: "4",
    name: "Dr. Emily Davis",
    specialty: "Pediatrician",
    hospital: "Children Care Hospital",
    experience: "10 Years",
    rating: "4.8",
    fee: "₹700",
  },
  {
    id: "5",
    name: "Dr. Robert Taylor",
    specialty: "Orthopedic",
    hospital: "City Care Hospital",
    experience: "11 Years",
    rating: "4.6",
    fee: "₹750",
  },
];

const hospitals: Hospital[] = [
  {
    id: "1",
    name: "City Care Hospital",
    location: "Coimbatore",
    type: "Multi-Specialty",
    rating: "4.7",
    doctors: "120+ Doctors",
  },
  {
    id: "2",
    name: "Apollo Hospital",
    location: "Chennai",
    type: "Multi-Specialty",
    rating: "4.8",
    doctors: "180+ Doctors",
  },
  {
    id: "3",
    name: "Global Health Hospital",
    location: "Bangalore",
    type: "Advanced Care",
    rating: "4.6",
    doctors: "150+ Doctors",
  },
  {
    id: "4",
    name: "Children Care Hospital",
    location: "Coimbatore",
    type: "Pediatric Care",
    rating: "4.8",
    doctors: "80+ Doctors",
  },
];

const specialties = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic",
];

type ScreenMode = "explore" | "doctor" | "hospital";

export default function ExploreScreen() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [mode, setMode] = useState<ScreenMode>("explore");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSpecialty =
        specialty === "All" || doctor.specialty === specialty;

      const matchesSearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.hospital.toLowerCase().includes(query);

      return matchesSpecialty && matchesSearch;
    });
  }, [search, specialty]);

  const filteredHospitals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return hospitals.filter((hospital) => {
      return (
        !query ||
        hospital.name.toLowerCase().includes(query) ||
        hospital.location.toLowerCase().includes(query) ||
        hospital.type.toLowerCase().includes(query)
      );
    });
  }, [search]);

  const openDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setMode("doctor");
  };

  const openHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setMode("hospital");
  };

  const goBack = () => {
    setSelectedDoctor(null);
    setSelectedHospital(null);
    setMode("explore");
  };

  if (mode === "doctor" && selectedDoctor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.detailsHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Doctor Details</Text>
          <View style={styles.headerSpace} />
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>DR</Text>
          </View>

          <Text style={styles.detailsName}>{selectedDoctor.name}</Text>
          <Text style={styles.detailsSpecialty}>
            {selectedDoctor.specialty}
          </Text>

          <View style={styles.ratingBox}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingText}>{selectedDoctor.rating}</Text>
          </View>

          <InfoRow title="Hospital" value={selectedDoctor.hospital} />
          <InfoRow title="Experience" value={selectedDoctor.experience} />
          <InfoRow title="Consultation Fee" value={selectedDoctor.fee} />

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>View Hospital</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (mode === "hospital" && selectedHospital) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.detailsHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hospital Details</Text>
          <View style={styles.headerSpace} />
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.hospitalIconLarge}>
            <Text style={styles.hospitalIconText}>H</Text>
          </View>

          <Text style={styles.detailsName}>{selectedHospital.name}</Text>
          <Text style={styles.detailsSpecialty}>
            {selectedHospital.type}
          </Text>

          <View style={styles.ratingBox}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingText}>{selectedHospital.rating}</Text>
          </View>

          <InfoRow title="Location" value={selectedHospital.location} />
          <InfoRow title="Hospital Type" value={selectedHospital.type} />
          <InfoRow title="Available Doctors" value={selectedHospital.doctors} />

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>View Doctors</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.subtitle}>
              Find doctors and hospitals near you
            </Text>

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search doctors or hospitals"
                placeholderTextColor={colors.gray}
                style={styles.searchInput}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <Text style={styles.clearText}>×</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.sectionTitle}>Specialties</Text>

            <FlatList
              data={specialties}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.specialtyList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.specialtyButton,
                    specialty === item && styles.specialtyActive,
                  ]}
                  onPress={() => setSpecialty(item)}
                >
                  <Text
                    style={[
                      styles.specialtyText,
                      specialty === item && styles.specialtyTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Doctors</Text>
              <Text style={styles.countText}>
                {filteredDoctors.length} found
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.doctorCard}
            onPress={() => openDoctor(item)}
            activeOpacity={0.8}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>DR</Text>
            </View>

            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
              <Text style={styles.hospitalName}>{item.hospital}</Text>

              <View style={styles.doctorBottom}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.experience}>{item.experience}</Text>
              </View>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No doctors found</Text>
            <Text style={styles.emptyText}>
              Try another search or specialty.
            </Text>
          </View>
        }
        ListFooterComponent={
          <View>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Hospitals</Text>
              <Text style={styles.countText}>
                {filteredHospitals.length} found
              </Text>
            </View>

            {filteredHospitals.map((hospital) => (
              <TouchableOpacity
                key={hospital.id}
                style={styles.hospitalCard}
                onPress={() => openHospital(hospital)}
                activeOpacity={0.8}
              >
                <View style={styles.hospitalIcon}>
                  <Text style={styles.hospitalIconText}>H</Text>
                </View>

                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalTitle}>{hospital.name}</Text>
                  <Text style={styles.hospitalType}>{hospital.type}</Text>
                  <Text style={styles.location}>{hospital.location}</Text>

                  <View style={styles.doctorBottom}>
                    <Text style={styles.star}>★</Text>
                    <Text style={styles.ratingText}>{hospital.rating}</Text>
                    <Text style={styles.experience}>
                      {hospital.doctors}
                    </Text>
                  </View>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      />
    </SafeAreaView>
  );
}

function InfoRow({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 5,
    marginBottom: 18,
  },
  searchBox: {
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchIcon: {
    fontSize: 25,
    color: colors.gray,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  clearText: {
    fontSize: 25,
    color: colors.gray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 22,
    marginBottom: 10,
  },
  specialtyList: {
    paddingBottom: 4,
  },
  specialtyButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  specialtyActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  specialtyText: {
    fontSize: 12,
    color: colors.gray,
  },
  specialtyTextActive: {
    color: colors.white,
    fontWeight: "600",
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countText: {
    color: colors.gray,
    fontSize: 12,
  },
  doctorCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#E8F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E8F0FF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  avatarText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 13,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  doctorSpecialty: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 3,
  },
  hospitalName: {
    fontSize: 11,
    color: colors.gray,
    marginTop: 3,
  },
  doctorBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  star: {
    color: "#F5A623",
    fontSize: 13,
    marginRight: 3,
  },
  ratingText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: "600",
  },
  experience: {
    fontSize: 11,
    color: colors.gray,
    marginLeft: 12,
  },
  arrow: {
    fontSize: 28,
    color: colors.gray,
    marginLeft: 5,
  },
  hospitalCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  hospitalIcon: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  hospitalIconLarge: {
    width: 90,
    height: 90,
    borderRadius: 18,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  hospitalIconText: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.primary,
  },
  hospitalInfo: {
    flex: 1,
    marginLeft: 13,
  },
  hospitalTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  hospitalType: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 3,
  },
  location: {
    fontSize: 11,
    color: colors.gray,
    marginTop: 3,
  },
  emptyBox: {
    alignItems: "center",
    paddingVertical: 35,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  emptyText: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 5,
  },
  detailsHeader: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 32,
    color: colors.text,
    marginTop: -4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  headerSpace: {
    width: 40,
  },
  detailsCard: {
    backgroundColor: colors.white,
    margin: 18,
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailsName: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    color: colors.text,
  },
  detailsSpecialty: {
    textAlign: "center",
    color: colors.primary,
    fontSize: 14,
    marginTop: 5,
  },
  ratingBox: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  infoRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 14,
  },
  infoTitle: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  primaryButton: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});