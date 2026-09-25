import React, { useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../theme/theme";
import styles from "../theme/exploreStyles";

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
        doctor.name.toLowerCase().includes(searchText) ||
        doctor.specialty.toLowerCase().includes(searchText) ||
        doctor.hospital.toLowerCase().includes(searchText);

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
        hospital.name.toLowerCase().includes(searchText) ||
        hospital.specialty.toLowerCase().includes(searchText) ||
        hospital.location.toLowerCase().includes(searchText)
    );
  }, [search]);

  /* ========================================
     DOCTOR DETAILS
  ======================================== */

  if (selectedDoctor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.detailsContent}
        >
          {/* BACK */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedDoctor(null)}
            activeOpacity={0.7}
          >
            <View style={styles.backContent}>
              <Ionicons
                name="arrow-back"
                size={20}
                color={colors.primary}
              />

              <Text style={styles.backText}>Back</Text>
            </View>
          </TouchableOpacity>

          {/* DOCTOR IMAGE */}

          <Image
            source={{
              uri: selectedDoctor.image,
            }}
            style={styles.detailsImage}
            resizeMode="cover"
          />

          {/* DOCTOR INFORMATION */}

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
              <View style={styles.ratingValueRow}>
                <Ionicons
                  name="star"
                  size={16}
                  color="#F5A623"
                />

                <Text style={styles.ratingValue}>
                  {selectedDoctor.rating}
                </Text>
              </View>

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

          {/* AVAILABLE TIME */}

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

          {/* BOOK APPOINTMENT */}

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

  /* ========================================
     EXPLORE SCREEN
  ======================================== */

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
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.gray}
            style={styles.searchIcon}
          />

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
          contentContainerStyle={styles.specialtiesContainer}
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
            onPress={() => setSelectedDoctor(doctor)}
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

              <View style={styles.doctorBottomRow}>
                <Ionicons
                  name="star"
                  size={15}
                  color="#F5A623"
                />

                <Text style={styles.rating}>
                  {doctor.rating}
                </Text>

                <Text style={styles.experience}>
                  {doctor.experience}
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.gray}
              style={styles.arrow}
            />
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

              <View style={styles.hospitalBottomRow}>
                <Ionicons
                  name="star"
                  size={15}
                  color="#F5A623"
                />

                <Text style={styles.rating}>
                  {hospital.rating}
                </Text>

                <Text style={styles.doctorCount}>
                  {hospital.doctors}
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.gray}
              style={styles.arrow}
            />
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