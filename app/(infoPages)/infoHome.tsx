import ActivityLevelComponent from "@/components/infoPagesComponents/ActivityLevelComponent";
import AgeComponent from "@/components/infoPagesComponents/AgeComponent";
import GenderComponent from "@/components/infoPagesComponents/GenderComponent";
import HeightComponent from "@/components/infoPagesComponents/HeightComponent";
import WeightComponent from "@/components/infoPagesComponents/WeightComponent";
import { useUserAuthStore } from "@/components/zustandStore/AuthStore";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import infoPageLogos from "../../assets/images/infoPageLogos";


const InfoHome = () => {
  const [showWeightComponent, setShowWeightComponent] = useState(false);
  const [showHeightComponent, setShowHeightComponent] = useState(false);
  const [showAgeComponent, setShowAgeComponent] = useState(false);
  const [showGenderComponent, setShowGenderComponent] = useState(false);
  const [showActivityLevelComponent, setShowActivityLevelComponent] =
    useState(false);

  // Reading state from Zustand
  const weight_KG = useUserHealthStore((state) => state.weight_KG);
  const weight_lbs = useUserHealthStore((state) => state.weight_lbs);
  const heightInches = useUserHealthStore((state) => state.heightInches);
  const heightCM = useUserHealthStore((state) => state.heightCM);
  const ageYears = useUserHealthStore((state) => state.ageYears);
  const gender = useUserHealthStore((state) => state.gender);
  const activityLevel = useUserHealthStore((state) => state.activityLevel);

  // Setters to update the Zustand store
  const setWeight_KG = useUserHealthStore((state) => state.setWeight_KG);
  const setWeight_lbs = useUserHealthStore((state) => state.setWeight_lbs);
  const setHeightInches = useUserHealthStore((state) => state.setHeightInches);
  const setHeightCM = useUserHealthStore((state) => state.setHeightCM);
  const setAgeYears = useUserHealthStore((state) => state.setAgeYears);
  const setGender = useUserHealthStore((state) => state.setGender);
  const setActivityLevel = useUserHealthStore((state) => state.setActivityLevel);

  const router = useRouter();

  // Effect to load the values from Zustand on page load
  useEffect(() => {
    setWeight_KG(weight_KG);
    setWeight_lbs(weight_lbs);
    setHeightInches(heightInches);
    setHeightCM(heightCM);
    setAgeYears(ageYears);
    setGender(gender);
    setActivityLevel(activityLevel);
  }, []); // This will only run once when the component mounts

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1">
        {/* Back button */}
        <TouchableOpacity
          className="absolute top-4 left-4"
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Header Section */}
        <View className="mt-3 items-center justify-center">
          <Image
            source={infoPageLogos.thumbsUpManLogo}
            style={{ width: 190, height: 190 }}
          />
          <Text className="font-bold text-2xl mt-3">Enter your information</Text>
        </View>

        {/* Scrollable content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="w-full p-7">
            {/* Weight Section */}
            <View className="bg-white p-3 w-full rounded-xl">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowWeightComponent(true); // Show the weight pop-up
                }}
              >
                <Image
                  source={infoPageLogos.weightScaleLogo}
                  style={{ width: 60, height: 60 }}
                />
                <Text className="font-bold text-2xl">Weight</Text>
              </TouchableOpacity>
              {showWeightComponent && (
                <WeightComponent
                  showWeightComponent={showWeightComponent}
                  setShowWeightComponent={setShowWeightComponent}
                  setWeight_KG={setWeight_KG}
                  setWeight_lbs={setWeight_lbs}
                  weight_KG={weight_KG}
                  weight_lbs={weight_lbs}
                />
              )}
            </View>

            {/* Height Section */}
            <View className="bg-white p-3 w-full rounded-xl mt-4">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowHeightComponent(true); // Show the height pop-up
                }}
              >
                <Image
                  source={infoPageLogos.HeightScaleLogo}
                  style={{ width: 60, height: 60 }}
                />
                <Text className="font-bold text-2xl">Height</Text>
              </TouchableOpacity>
              {showHeightComponent && (
                <HeightComponent
                  showHeightComponent={showHeightComponent}
                  setShowHeightComponent={setShowHeightComponent}
                  setHeightInches={setHeightInches}
                  setHeightCM={setHeightCM}
                  heightInches={heightInches}
                  heightCM={heightCM}
                />
              )}
            </View>

            {/* Age Section */}
            <View className="bg-white p-3 w-full rounded-xl mt-4">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowAgeComponent(true); // Show the age pop-up
                }}
              >
                <Image
                  source={infoPageLogos.ageLogo}
                  style={{ width: 60, height: 60 }}
                />
                <Text className="font-bold text-2xl">Age</Text>
              </TouchableOpacity>
              {showAgeComponent && (
                <AgeComponent
                  showAgeComponent={showAgeComponent}
                  setShowAgeComponent={setShowAgeComponent}
                  ageYears={ageYears}
                  setAgeYears={setAgeYears}
                />
              )}
            </View>

            {/* Gender Section */}
            <View className="bg-white p-3 w-full rounded-xl mt-4">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowGenderComponent(true); // Show the gender pop-up
                }}
              >
                <Image
                  source={infoPageLogos.genderLogo}
                  style={{ width: 60, height: 60 }}
                />
                <Text className="font-bold text-2xl">Gender</Text>
              </TouchableOpacity>
              {showGenderComponent && (
                <GenderComponent
                  showGenderComponent={showGenderComponent}
                  setShowGenderComponent={setShowGenderComponent}
                  setGender={setGender}
                />
              )}
            </View>

            {/* Activity Level Section */}
            <View className="bg-white p-3 w-full rounded-xl mt-4">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowActivityLevelComponent(true); // Show the activity level pop-up
                }}
              >
                <Image
                  source={infoPageLogos.actvityLogo}
                  style={{ width: 60, height: 60 }}
                />
                <Text className="font-bold text-2xl">Activity Level</Text>
              </TouchableOpacity>
              {showActivityLevelComponent && (
                <ActivityLevelComponent
                  showActivityLevelComponent={showActivityLevelComponent}
                  setShowActivityLevelComponent={setShowActivityLevelComponent}
                  setActivityLevel={setActivityLevel}
                />
              )}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Section with Next and Skip buttons */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "white",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <View className="items-center">
            <Text>You will be able to update this at any time</Text>
          </View>
          <View className="flex-row justify-center space-x-7 mt-2">
            <TouchableOpacity
              className="bg-black w-32 h-[50] items-center justify-center rounded-xl"
              onPress={() => {
                router.push("/(infoPages)/allergies");
              }}
            >
              <Text className="text-white font-bold text-xl">Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-black w-32 h-[50] items-center justify-center rounded-xl"
              onPress={() => {
                router.push("/(infoPages)/allergies");
              }}
            >
              <Text className="text-white font-bold text-xl">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoHome;

