import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import infoPageLogos from "../../assets/images/infoPageLogos";
import { Ionicons } from "@expo/vector-icons";
import WeightComponent from "@/components/WeightComponent";
import HeightComponent from "@/components/HeightComponent";
import AgeComponent from "@/components/AgeComponent";
import { router } from "expo-router";
import GenderComponent from "@/components/GenderComponent";
import ActivityLevelComponent from "@/components/ActivityLevelComponent";
import { useRouter } from "expo-router";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";

const infoHome = () => {
  const [showWeightComponent, setShowWeightComponent] = useState(false);
  const [showHeightComponent, setShowHeightComponent] = useState(false);
  const [showAgeComponent, setShowAgeComponent] = useState(false);
  const [showGenderComponent, setShowGenderComponent] = useState(false);
  const [showActivityLevelComponent, setShowActivityLevelComponent] =
    useState(false);
  // Reading state
  const userID = useUserHealthStore((s) => s.userID);
  const weight_KG = useUserHealthStore((s) => s.weight_KG);
  const weight_lbs = useUserHealthStore((s) => s.weight_lbs);
  const heightInches = useUserHealthStore((s) => s.heightInches);
  const heightCM = useUserHealthStore((s) => s.heightCM);
  const ageYears = useUserHealthStore((s) => s.ageYears);
  const gender = useUserHealthStore((s) => s.gender);
  const activityLevel = useUserHealthStore((s) => s.activityLevel);

  // Setters
  const setUserID = useUserHealthStore((s) => s.setUserID);
  const setWeight_KG = useUserHealthStore((s) => s.setWeight_KG);
  const setWeight_lbs = useUserHealthStore((s) => s.setWeight_lbs);
  const setHeightInches = useUserHealthStore((s) => s.setHeightInches);
  const setHeightCM = useUserHealthStore((s) => s.setHeightCM);
  const setAgeYears = useUserHealthStore((s) => s.setAgeYears);
  const setGender = useUserHealthStore((s) => s.setGender);
  const setActivityLevel = useUserHealthStore((s) => s.setActivityLevel);

  const router = useRouter();
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className=" flex-1">
        <TouchableOpacity
          className="absolute top-4 left-4"
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View className="mt-3 items-center justify-center">
          <Image
            source={infoPageLogos.thumbsUpManLogo}
            style={{ width: 190, height: 190 }}
          />
          <Text className="font-bold text-2xl mt-3">
            Enter your information
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="w-full p-7">
            <View className="bg-white p-3 w-full rounded-xl ">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowWeightComponent(true);
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
            <View className="bg-white p-3 w-full rounded-xl mt-4">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowHeightComponent(true);
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

            <View className="bg-white p-3 w-full rounded-xl mt-4">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowAgeComponent(true);
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

            <View className="bg-white p-3 w-full rounded-xl mt-4">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowGenderComponent(true);
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

            <View className="bg-white p-3 w-full rounded-xl mt-4">
              <TouchableOpacity
                className="flex-row space-x-5 items-center"
                onPress={() => {
                  setShowActivityLevelComponent(true);
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
            <TouchableOpacity className="bg-black w-32 h-[50] items-center justify-center rounded-xl">
              <Text
                className="text-white font-bold text-xl"
                onPress={() => {
                  router.push("/(infoPages)/allergies");
                }}
              >
                Skip
              </Text>
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

export default infoHome;
