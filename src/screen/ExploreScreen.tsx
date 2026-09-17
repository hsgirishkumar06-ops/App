import React, { useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../theme/theme";

type Specialty =
  | "All"
  | "Cardiologist"
  | "Dermatologist"
  | "Neurologist"
  | "Pediatrician";

type Doctor = {
  id: string;
  name: string;
  specialty: Specialty;
  hospital: string;
  rating: string;
  experience: string;
  image: string;
  about: string;
  fee: string;
  availableTime: string;
};

type Hospital = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: string;
  doctors: string;
  image: string;
};

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. John Smith",
    specialty: "Cardiologist",
    hospital: "City Care Hospital",
    rating: "4.8",
    experience: "12 Years",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    about:
      "Dr. John Smith is an experienced cardiologist specializing in heart health, cardiovascular conditions and preventive cardiac care.",
    fee: "₹800",
    availableTime: "10:00 AM - 1:00 PM",
  },
  {
    id: "2",
    name: "Dr. Sarah Wilson",
    specialty: "Dermatologist",
    hospital: "Apollo Hospital",
    rating: "4.7",
    experience: "8 Years",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    about:
      "Dr. Sarah Wilson specializes in skin, hair and cosmetic dermatology. She provides treatment for common and complex skin conditions.",
    fee: "₹700",
    availableTime: "11:00 AM - 3:00 PM",
  },
  {
    id: "3",
    name: "Dr. Michael Brown",
    specialty: "Neurologist",
    hospital: "Global Health Hospital",
    rating: "4.9",
    experience: "15 Years",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    about:
      "Dr. Michael Brown is a neurologist experienced in diagnosing and managing neurological conditions and nervous system disorders.",
    fee: "₹900",
    availableTime: "9:00 AM - 12:00 PM",
  },
  {
    id: "4",
    name: "Dr. Emily Davis",
    specialty: "Pediatrician",
    hospital: "Children Care Hospital",
    rating: "4.8",
    experience: "10 Years",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
    about:
      "Dr. Emily Davis provides pediatric healthcare for children, including routine checkups, vaccinations and general medical care.",
    fee: "₹600",
    availableTime: "10:00 AM - 2:00 PM",
  },
  {
    id: "5",
    name: "Dr. Robert Taylor",
    specialty: "Cardiologist",
    hospital: "City Care Hospital",
    rating: "4.8",
    experience: "14 Years",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
    about:
      "Dr. Robert Taylor specializes in cardiovascular diagnosis, treatment and long-term heart health management.",
    fee: "₹850",
    availableTime: "2:00 PM - 5:00 PM",
  },
];

const hospitals: Hospital[] = [
  {
    id: "1",
    name: "City Care Hospital",
    specialty: "Multi-Specialty",
    location: "Coimbatore",
    rating: "4.7",
    doctors: "120+ Doctors",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    name: "Apollo Hospital",
    specialty: "Multi-Specialty",
    location: "Chennai",
    rating: "4.8",
    doctors: "180+ Doctors",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    name: "Global Health Hospital",
    specialty: "Advanced Care",
    location: "Bangalore",
    rating: "4.6",
    doctors: "150+ Doctors",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "4",
    name: "Children Care Hospital",
    specialty: "Pediatric Care",
    location: "Coimbatore",
    rating: "4.8",
    doctors: "80+ Doctors",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
];

const specialties: Specialty[] = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
];

export default function ExploreScreen() {
  const [search, setSearch] = useState("");

  const [selectedSpecialty, setSelectedSpecialty] =
    useState<Specialty>("All");

  const [selectedDoctor, setSelectedDoctor] =
    useState<Doctor | null>(null);

  const filteredDoctors = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSpecialty =
        selectedSpecialty === "All" ||
        doctor.specialty === selectedSpecialty;

      const matchesSearch =
        searchText.length === 0 ||
        doctor.name
          .toLowerCase()
          .includes(searchText) ||
        doctor.specialty
          .toLowerCase()
          .includes(searchText) ||
        doctor.hospital
          .toLowerCase()
          .includes(searchText);

      return matchesSpecialty && matchesSearch;
    });
  }, [search, selectedSpecialty]);

  const filteredHospitals = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return hospitals;
    }

    return hospitals.filter(
      (hospital) =>
        hospital.name
          .toLowerCase()
          .includes(searchText) ||
        hospital.specialty
          .toLowerCase()
          .includes(searchText) ||
        hospital.location
          .toLowerCase()
          .includes(searchText)
    );
  }, [search]);

  // =====================================================
  // DOCTOR DETAILS
  // =====================================================

  if (selectedDoctor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.detailsContent
          }
        >
          {/* BACK */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setSelectedDoctor(null);
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>
              ← Back
            </Text>
          </TouchableOpacity>

          {/* DOCTOR IMAGE */}

          <Image
            source={{
              uri: selectedDoctor.image,
            }}
            style={styles.detailsImage}
            resizeMode="cover"
          />

          {/* DOCTOR NAME */}

          <View style={styles.detailsHeader}>
            <Text style={styles.detailsName}>
              {selectedDoctor.name}
            </Text>

            <Text style={styles.detailsSpecialty}>
              {selectedDoctor.specialty}
            </Text>

            <Text style={styles.detailsHospital}>
              {selectedDoctor.hospital}
            </Text>
          </View>

          {/* RATING */}

          <View style={styles.ratingCard}>
            <View style={styles.ratingItem}>
              <Text style={styles.ratingValue}>
                ★ {selectedDoctor.rating}
              </Text>

              <Text style={styles.ratingLabel}>
                Rating
              </Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.ratingItem}>
              <Text style={styles.ratingValue}>
                {selectedDoctor.experience}
              </Text>

              <Text style={styles.ratingLabel}>
                Experience
              </Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.ratingItem}>
              <Text style={styles.ratingValue}>
                {selectedDoctor.fee}
              </Text>

              <Text style={styles.ratingLabel}>
                Consultation
              </Text>
            </View>
          </View>

          {/* ABOUT */}

          <Text style={styles.detailsSectionTitle}>
            About Doctor
          </Text>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              {selectedDoctor.about}
            </Text>
          </View>

          {/* HOSPITAL */}

          <Text style={styles.detailsSectionTitle}>
            Hospital
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>
              {selectedDoctor.hospital}
            </Text>

            <Text style={styles.infoText}>
              Multi-Specialty Hospital
            </Text>
          </View>

          {/* AVAILABILITY */}

          <Text style={styles.detailsSectionTitle}>
            Available Time
          </Text>

          <View style={styles.availabilityCard}>
            <Text style={styles.availabilityLabel}>
              Consultation Hours
            </Text>

            <Text style={styles.availabilityTime}>
              {selectedDoctor.availableTime}
            </Text>
          </View>

          {/* BOOK BUTTON */}

          <TouchableOpacity
            style={styles.bookButton}
            activeOpacity={0.8}
            onPress={() => {
              alert(
                `Appointment booking for ${selectedDoctor.name}`
              );
            }}
          >
            <Text style={styles.bookButtonText}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // =====================================================
  // EXPLORE SCREEN
  // =====================================================

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.title}>
            Explore
          </Text>

          <Text style={styles.subtitle}>
            Find doctors and hospitals near you
          </Text>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>
            ⌕
          </Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search doctors or hospitals"
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
          />
        </View>

        {/* SPECIALTIES */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Specialties
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.specialtiesContainer
          }
        >
          {specialties.map((specialty) => {
            const active =
              selectedSpecialty === specialty;

            return (
              <TouchableOpacity
                key={specialty}
                style={[
                  styles.specialtyButton,
                  active &&
                    styles.activeSpecialtyButton,
                ]}
                onPress={() =>
                  setSelectedSpecialty(specialty)
                }
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.specialtyText,
                    active &&
                      styles.activeSpecialtyText,
                  ]}
                >
                  {specialty}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* DOCTORS */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Doctors
          </Text>

          <Text style={styles.foundText}>
            {filteredDoctors.length} found
          </Text>
        </View>

        {filteredDoctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={styles.doctorCard}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedDoctor(doctor);
            }}
          >
            <Image
              source={{
                uri: doctor.image,
              }}
              style={styles.doctorImage}
              resizeMode="cover"
            />

            <View style={styles.doctorInfo}>
              <Text
                style={styles.doctorName}
                numberOfLines={1}
              >
                {doctor.name}
              </Text>

              <Text
                style={styles.doctorSpecialty}
                numberOfLines={1}
              >
                {doctor.specialty}
              </Text>

              <Text
                style={styles.doctorHospital}
                numberOfLines={1}
              >
                {doctor.hospital}
              </Text>

              <View
                style={styles.doctorBottomRow}
              >
                <Text style={styles.star}>
                  ★
                </Text>

                <Text style={styles.rating}>
                  {doctor.rating}
                </Text>

                <Text
                  style={styles.experience}
                >
                  {doctor.experience}
                </Text>
              </View>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>
        ))}

        {/* NO DOCTORS */}

        {filteredDoctors.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No doctors found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or specialty.
            </Text>
          </View>
        )}

        {/* HOSPITALS */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Hospitals
          </Text>

          <Text style={styles.foundText}>
            {filteredHospitals.length} found
          </Text>
        </View>

        {filteredHospitals.map((hospital) => (
          <TouchableOpacity
            key={hospital.id}
            style={styles.hospitalCard}
            activeOpacity={0.8}
          >
            <Image
              source={{
                uri: hospital.image,
              }}
              style={styles.hospitalImage}
              resizeMode="cover"
            />

            <View style={styles.hospitalInfo}>
              <Text
                style={styles.hospitalName}
                numberOfLines={1}
              >
                {hospital.name}
              </Text>

              <Text
                style={styles.hospitalSpecialty}
                numberOfLines={1}
              >
                {hospital.specialty}
              </Text>

              <Text
                style={styles.hospitalLocation}
                numberOfLines={1}
              >
                {hospital.location}
              </Text>

              <View
                style={styles.hospitalBottomRow}
              >
                <Text style={styles.star}>
                  ★
                </Text>

                <Text style={styles.rating}>
                  {hospital.rating}
                </Text>

                <Text
                  style={styles.doctorCount}
                >
                  {hospital.doctors}
                </Text>
              </View>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </TouchableOpacity>
        ))}

        {/* NO HOSPITALS */}

        {filteredHospitals.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No hospitals found
            </Text>

            <Text style={styles.emptyText}>
              Try another search.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 25,
    color: colors.gray,
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

  star: {
    fontSize: 15,
    color: "#F5A623",
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
    fontSize: 28,
    color: colors.gray,
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