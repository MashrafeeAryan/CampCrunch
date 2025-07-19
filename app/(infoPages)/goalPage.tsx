import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import goalPageLogos from "../../assets/images/goalPageLogos";
import { useRouter } from "expo-router";
import { updateHealthInfo } from "@/components/databaseComponents/updateHealthInfo";
import { useUserAuthStore } from "@/components/zustandStore/AuthStore";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import { calculateCalories } from "@/utils/CalculateCalories";

const GoalPage = () => {
  const router = useRouter();

  // box style for selected and default box...
  const selectedStyle = "bg-[#333333]"; // darker background when selected
  const defaultStyle = "bg-white";
  
  // text style for selected and default box...
  const textSelectedStyle = "text-white"; // darker background when selected
  const textDefaultStyle = "text-black";

  // Get user data from Zustand store
  const userID = useUserAuthStore((s) => s.userID);
  const weight_KG = useUserHealthStore((s) => s.weight_KG);
  const weight_lbs = useUserHealthStore((s) => s.weight_lbs);
  const heightInches = useUserHealthStore((s) => s.heightInches);
  const heightCM = useUserHealthStore((s) => s.heightCM);
  const ageYears = useUserHealthStore((s) => s.ageYears);
  const gender = useUserHealthStore((s) => s.gender);
  const activityLevel = useUserHealthStore((s) => s.activityLevel);
  const allergies = useUserHealthStore((s) => s.allergies);
  const preferences = useUserHealthStore((s) => s.preferences);
  const goals = useUserHealthStore((s) => s.goals); // Get current selected goal
  const setGoals = useUserHealthStore((s) => s.setGoals); // Set selected goal

  const bmr = useUserHealthStore((s) => s.bmr);
  const maintenance = useUserHealthStore((s) => s.maintenance);
  const setMaintenance = useUserHealthStore((s) => s.setMaintenance);
  const setBMR = useUserHealthStore((s) => s.setBMR);
  const setDailyCalorieAdjustment = useUserHealthStore((s) => s.setDailyCalorieAdjustment);

  // Set up state for selected goal ID
  const [selectedGoal, setSelectedGoal] = useState<number | null>(goals); // Initialize with the global goal value

  // Update user health information
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
        goals,
      });

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
        // Calculate calories if all required data is provided
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
        );
      }
      router.replace("/(tabs)");
      console.log("Info Page Results Uploaded");
    } catch (error) {
      console.log("Info Page Results not Uploaded", error);
    }
  };

  // Handle goal selection and update state
  const handleGoalSelection = (goalID: number) => {
    setSelectedGoal(goalID); // Update the selected goal ID in the state
    setGoals(goalID); // Update the Zustand store with the selected goal ID
  };

  useEffect(() => {
    // If goals are set globally, initialize local state with the current goal
    setSelectedGoal(goals);
  }, [goals]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View style={{ flex: 1 }}>
        {/* 🔙 Back Arrow (top-left) - Outside scroll view */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* 👤 Image + Text - Center aligned */}
        <View className="mt-3 items-center justify-center">
          <Image
            source={goalPageLogos.thumbsUpManLogo}
            style={{ width: 190, height: 190 }}
          />
          <Text className="font-bold text-2xl mt-3">Enter your information</Text>
        </View>

        {/* 🧾 Scrollable Content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
          <View className="items-center flex-1">
            {/* Goal selection cards */}
            <View className="w-full p-7">
              {/* Goal: Lose 0.5 lbs per week */}
              <View
                className={`p-3 w-full rounded-xl mt-4 ${selectedGoal === -0.5 ? selectedStyle : defaultStyle}`} // White by default, gray when selected
              >
                <TouchableOpacity
                  className="flex-row space-x-5 items-center"
                  onPress={() => handleGoalSelection(-0.5)} // Set goal to lose 0.5 lbs per week
                >
                  <Image
                    source={goalPageLogos.loose0_5}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className={`font-bold text-[21px] ${selectedGoal === -0.5 ? textSelectedStyle : textDefaultStyle}`}>
                      Loose 0.5 lbs per week
                    </Text>
                    <Text className={`font-bold text-[12px]  ${selectedGoal === -0.5 ? textSelectedStyle : textDefaultStyle}`}>
                      Recommended for beginners
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Goal: Lose 1 lbs per week */}
              <View
                className={`p-3 w-full rounded-xl mt-4 ${selectedGoal === -1 ? selectedStyle : defaultStyle}`} // White by default, gray when selected
              >
                <TouchableOpacity
                  className="flex-row space-x-5 items-center"
                  onPress={() => handleGoalSelection(-1)} // Set goal to lose 1 lbs per week
                >
                  <Image
                    source={goalPageLogos.gain1}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className={`font-bold text-[21px] ${selectedGoal === -1 ? textSelectedStyle : textDefaultStyle}`}>
                      Loose 1 lbs per week
                    </Text>
                    <Text className={`font-bold text-[12px]  ${selectedGoal === -1 ? textSelectedStyle : textDefaultStyle}`}>
                      Recommended for beginners
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Goal: Lose 1.5 lbs per week */}
              <View
                className={`p-3 w-full rounded-xl mt-4 ${selectedGoal === -1.5 ? selectedStyle : defaultStyle}`} // White by default, gray when selected
              >
                <TouchableOpacity
                  className="flex-row space-x-5 items-center"
                  onPress={() => handleGoalSelection(-1.5)} // Set goal to lose 1.5 lbs per week
                >
                  <Image
                    source={goalPageLogos.loose1_5}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className={`font-bold text-[21px] ${selectedGoal === -1.5 ? textSelectedStyle : textDefaultStyle}`}>
                      Loose 1.5 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Goal: Lose 2 lbs per week */}
              <View
                className={`p-3 w-full rounded-xl mt-4 ${selectedGoal === -2 ? selectedStyle : defaultStyle}`} // White by default, gray when selected
              >
                <TouchableOpacity
                  className="flex-row space-x-5 items-center"
                  onPress={() => handleGoalSelection(-2)} // Set goal to lose 2 lbs per week
                >
                  <Image
                    source={goalPageLogos.loose2}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className={`font-bold text-[21px] ${selectedGoal === -2 ? textSelectedStyle : textDefaultStyle}`}>
                      Loose 2 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Maintain weight */}
              <View
                className={`p-3 w-full rounded-xl mt-4 ${selectedGoal === 0 ? selectedStyle: defaultStyle}`}
                // White by default, gray when selected
              >
                <TouchableOpacity
                  className="flex-row space-x-5 items-center"
                  onPress={() => handleGoalSelection(0)} // Set goal to maintain current weight
                >
                  <Image
                    source={goalPageLogos.maintain}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className={`font-bold text-[21px] ${selectedGoal === 0 ? textSelectedStyle : textDefaultStyle}`}>Maintain weight</Text>
                    <Text className={`font-bold text-[12px]  ${selectedGoal === 0 ? textSelectedStyle : textDefaultStyle}`}>
                      Stay at your current weight
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Gain weight */}
              <View
                className={`p-3 w-full rounded-xl mt-4 ${selectedGoal === 1 ? selectedStyle : defaultStyle}`}
                // White by default, gray when selected
              >
                <TouchableOpacity
                  className="flex-row space-x-5 items-center"
                  onPress={() => handleGoalSelection(1)} // Set goal to gain weight
                >
                  <Image
                    source={goalPageLogos.gain1}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className={`font-bold text-[21px] ${selectedGoal === 1 ? textSelectedStyle : textDefaultStyle}`}>Gain weight</Text>
                    <Text className={`font-bold text-[12px]  ${selectedGoal === 1 ? textSelectedStyle : textDefaultStyle}`}>
                      Gain muscle and strength
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* 🧭 Bottom Section */}
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
          <View style={{ alignItems: "center" }}>
            <Text className="text-center mb-2 text-gray-600 text-base">
              You will be able to update this at any time.
            </Text>
          </View>

          <View className="flex-row justify-center space-x-7 mt-2">
            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={() => router.push("/(tabs)/ProfileScreen")}
            >
              <Text className="text-white font-bold text-xl">Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={() => {
                handleUpdateUserData
                router.push('/(tabs)/ProfileScreen')  
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

export default GoalPage;
