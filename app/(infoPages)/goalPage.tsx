import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import goalPageLogos from "../../assets/images/goalPageLogos";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { updateHealthInfo } from "@/components/databaseComponents/updateHealthInfo";
import { useUserAuthStore } from "@/components/zustandStore/AuthStore";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import { calculateCalories } from "@/utils/CalculateCalories";

const GoalPage = () => {
  const router = useRouter();
  //Get this from zustand:
  const userID = useUserAuthStore((s) => s.userID)
  const weight_KG = useUserHealthStore((s) => s.weight_KG)
  const weight_lbs = useUserHealthStore((s) => s.weight_lbs)
  const heightInches = useUserHealthStore((s) => s.heightInches)
  const heightCM = useUserHealthStore((s) => s.heightCM)
  const ageYears = useUserHealthStore((s) => s.ageYears)
  const gender = useUserHealthStore((s) => s.gender)
  const activityLevel = useUserHealthStore((s) => s.activityLevel)
  const allergies = useUserHealthStore((s) => s.allergies)
  const preferences = useUserHealthStore((s) => s.preferences)
  const goals = useUserHealthStore((s) => s.goals)
  const setGoals = useUserHealthStore((s) => s.setGoals)


  const bmr = useUserHealthStore((s) => s.bmr)
  const maintenance = useUserHealthStore((s) => s.maintenance)
  const setMaintenance = useUserHealthStore((s) => s.setMaintenance)
  const setBMR = useUserHealthStore((s) => s.setBMR)
  const setDailyCalorieAdjustment = useUserHealthStore((s) => s.setDailyCalorieAdjustment)

  const handleUpdateUserData = async () => {
    try {
      await updateHealthInfo({
        userID,
        weight_KG,
        weight_lbs,
        heightInches,
        heightCM,
        ageYears,
        gender,
        activityLevel,
        preferences,
        allergies,
        goals
      })

      if (
        weight_KG !== 0 &&
        weight_lbs !== 0 &&
        heightInches !== 0 &&
        heightCM !== 0 &&
        ageYears !== 0 &&
        gender !== "" &&
        activityLevel !== "" &&
        preferences !== "" &&
        allergies !== "" &&
        goals !== 0
      ) {
        // ✅ All fields exist
        calculateCalories(
          gender,
          weight_lbs,
          ageYears,
          heightInches,
          goals,
          bmr,
          maintenance,
          activityLevel,
          setBMR,
          setMaintenance,
          setDailyCalorieAdjustment
        )
      }
      router.replace("/(tabs)")
      console.log('Info Page Results Uploded')

    } catch (error) {
      console.log("Info Page Results not Uploaded", error)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
          <View className="items-center flex-1">
            {/* Arrow */}
            <View className="absolute top-4 left-4">
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>

            {/* Image */}
            <View className="mt-3">
              <Image
                source={goalPageLogos.thumbsUpManLogo}
                style={{ width: 190, height: 190 }}
              />
            </View>

            <View className="mt-3">
              <Text className="font-bold text-2xl">Enter your information</Text>
            </View>

            {/* Selection Boxes */}
            <View className="w-full p-7">
              <View className="bg-[#7ed957] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                  onPress={
                    () => { setGoals(-0.5) }
                  }
                >
                  <Image
                    source={goalPageLogos.loose0_5}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[21px]">
                      Loose 0.5 lbs per week
                    </Text>
                    <Text className="font-bold text-[12px]">
                      Recommended for beginners
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-[#c1ff72] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                  onPress={
                    () => { setGoals(-1) }
                  }
                >
                  <Image
                    source={goalPageLogos.gain1}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Loose 1 lbs per week
                    </Text>
                    <Text className="font-bold text-[12px]">
                      Recommended for beginners
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-[#ffbd59] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                  onPress={
                    () => { setGoals(-1.5) }
                  }
                >
                  <Image
                    source={goalPageLogos.loose1_5}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Loose 1.5 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-[#ff914d] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                  onPress={
                    () => { setGoals(-2) }
                  }
                >

                  <Image
                    source={goalPageLogos.loose2}
                    className="w-[60px] h-[60px] rounded-[30px]"

                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Loose 2 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="w-full rounded-xl mt-4 overflow-hidden">
                <LinearGradient
                  colors={["#a7a7a7", "#fdfdfd"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="p-3 w-full"
                >
                  <TouchableOpacity className="flex-row space-x-5 items-center"
                    onPress={
                      () => { setGoals(0) }
                    }
                  >
                    <Image
                      source={goalPageLogos.maintain}
                      className="w-[60px] h-[60px] rounded-[30px]"
                    />
                    <View className="flex-1">
                      <Text className="font-bold text-[20px]">
                        Maintain Weight
                      </Text>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View className="bg-[#ffbd59] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                  onPress={
                    () => { setGoals(0.5) }
                  }>
                  <Image
                    source={goalPageLogos.gain0_5}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Gain 0.5 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-[#ffbd59] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                  onPress={
                    () => { setGoals(1) }
                  }
                >
                  <Image
                    source={goalPageLogos.gain1}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Gain 1 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
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
          <View style={{ position: "relative", alignItems: "center" }}>
            {/* Transparent arrow, absolutely positioned */}
            <Ionicons
              name="chevron-down-outline"
              size={70}
              color="rgba(0, 0, 0, 0.15)" // semi-transparent black
              style={{
                position: "absolute",
                top: -50, // adjust to hover over text nicely
                left: "50%",
                right: 0,
                transform: [{ translateX: -35 }],
                marginHorizontal: "auto",
                pointerEvents: "none", // so arrow doesn't block taps
              }}
            />

            {/* The actual text */}
            <Text className="text-center mb-2 text-gray-600 text-base">
              You will be able to update this at any time
            </Text>
          </View>

          <View className="flex-row justify-center space-x-7 mt-2">
            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={handleUpdateUserData}

            >
              <Text className="text-white font-bold text-xl">Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={handleUpdateUserData}
            >
              <Text className="text-white font-bold text-xl">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GoalPage;
