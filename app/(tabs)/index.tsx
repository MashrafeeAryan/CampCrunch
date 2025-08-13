// Import necessary components and hooks from React Native and React
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressRings from "@/components/ProgressRings"; // Custom progress ring component
import { Link, usePathname, router } from "expo-router";
import { handleLogout } from "@/components/auth/authFunctions";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import Toast from 'react-native-toast-message';
import moment from "moment";

const Index = () => {
  const [pressed, setPressed] = useState(false);
  const [focusedTab, setFocusedTab] = useState("Breakfast");
  const tabs = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  const dailyCalorieAdjustment = useUserHealthStore((s) => s.dailyCalorieAdjustment);
  const diet = useUserHealthStore((s) => s.dietRecommendation);
  const protein = useUserHealthStore((s) => s.protein);
  const carbs = useUserHealthStore((s) => s.carbs);
  const fat = useUserHealthStore((s) => s.fat);
  const fatConsumed = useUserHealthStore((s) => s.fatConsumed);
  const proteinConsumed = useUserHealthStore((s) => s.proteinConsumed);
  const carbsConsumed = useUserHealthStore((s) => s.carbsConsumed);
  const caloriesConsumed = useUserHealthStore((s) => s.caloriesConsumed);
  const foodMap = useUserHealthStore((s) => s.foodMap)



  const setProteinConsumed = useUserHealthStore((s) => s.setProteinConsumed);
  const setCarbsConsumed = useUserHealthStore((s) => s.setCarbsConsumed);
  const setCaloriesConsumed = useUserHealthStore((s) => s.setCaloriesConsumed);
  const setFatConsumed = useUserHealthStore((s) => s.setFatConsumed);
  const setFoodMap = useUserHealthStore((s) => s.setFoodMap)
  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    useUserHealthStore.getState().checkAndResetDailyIntake();
  }, []);

  const handleAddToPlan = (
    proteinVal: number,
    fatVal: number,
    carbsVal: number,
    caloriesVal: number,
    foodName: string,
    focusedTab: string,
    today: string
  ) => {
    // Update nutrition totals
    setProteinConsumed(proteinConsumed + Number(proteinVal));
    setFatConsumed(fatConsumed + Number(fatVal));
    setCarbsConsumed(carbsConsumed + Number(carbsVal));
    setCaloriesConsumed(caloriesConsumed + Number(caloriesVal));

    // Prepare new food item
    const newFoodItem = {
      foodName,
      calories: caloriesVal,
    };

    // Copy current map or initialize
    const updatedMap = { ...foodMap };

    // Ensure date entry exists
    if (!updatedMap[today]) {
      updatedMap[today] = {};
    }

    // Ensure meal type entry exists
    if (!updatedMap[today][focusedTab]) {
      updatedMap[today][focusedTab] = [];
    }

    // Add new food to the correct list
    updatedMap[today][focusedTab].push(newFoodItem);

    // Save updated map to Zustand
    setFoodMap(updatedMap);

    // Show toast
    Toast.show({
      type: 'success',
      text1: `${foodName} added`,
      position: 'bottom',
      visibilityTime: 2000,
      bottomOffset: 60,
      props: {},
    });
   };


  return (
    <SafeAreaView className="flex-1 bg-white"
    edges={["left", "right"]}>
      <ScrollView >
        <View className="items-center mt-5">
          <ProgressRings
            protein={protein.toFixed(0)}
            carbs={carbs.toFixed(0)}
            fat={fat.toFixed(0)}
            dailyCalorieAdjustment={dailyCalorieAdjustment.toFixed(0)}
            proteinConsumed={proteinConsumed.toFixed(0)}
            fatConsumed={fatConsumed.toFixed(0)}
            carbsConsumed={carbsConsumed.toFixed(0)}
            caloriesConsumed={caloriesConsumed.toFixed(0)}
          />

          <View className="w-full px-4 mt-2">
            <Text className="text-left text-lg font-semibold">Your Nutrition Goals</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-4">
            <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[110] h-[80] items-center justify-center border-[#3498db] border-2">
              <Text className="text-2xl font-bold text-[#3498db]">{caloriesConsumed.toFixed(0)}</Text>
              <Text className="text-xs text-gray-700">Daily Calories</Text>
              <Text className="text-xs text-gray-500">of {dailyCalorieAdjustment.toFixed(0)}</Text>
            </View>

            <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[110] h-[80] items-center justify-center border-[#e74c3c] border-2">
              <Text className="text-2xl font-bold text-[#e74c3c]">{proteinConsumed.toFixed(0)}</Text>
              <Text className="text-xs text-gray-700">Daily Protein</Text>
              <Text className="text-xs text-gray-500">of {protein.toFixed(0)}</Text>
            </View>

            <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[110] h-[80] items-center justify-center border-[#9b59b6] border-2">
              <Text className="text-2xl font-bold text-[#9b59b6]">{carbsConsumed.toFixed(0)}</Text>
              <Text className="text-xs text-gray-700">Daily Carbs</Text>
              <Text className="text-xs text-gray-500">of {carbs.toFixed(0)}</Text>
            </View>

            <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[110] h-[80] items-center justify-center border-[#f1c40f] border-2">
              <Text className="text-2xl font-bold text-[#f1c40f]">{fatConsumed.toFixed(0)}</Text>
              <Text className="text-xs text-gray-700">Daily Fat</Text>
              <Text className="text-xs text-gray-500">of {fat.toFixed(0)}</Text>
            </View>

            <View style={{ width: 10 }} />
          </ScrollView>

          <View className="w-full px-4 items-end">
            <TouchableOpacity
              className={`rounded-md p-2 border-[#f8d04a] border-2 ${pressed ? "bg-[#f1c40f]" : "bg-transparent"
                }`}
              onPress={() => {
                setPressed(true);
                router.push("../(hidden)/AdjustGoalsScreen");
              }}
            >
              <Text
                className={`${pressed ? "text-white" : "text-[#f1c40f]"
                  } font-bold text-xs`}
              >
                Adjust Goals
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row mt-5">
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setFocusedTab(tab)}
                className={`
                  px-4 py-3
                  ${index === 0 ? "rounded-l-lg" : ""}
                  ${index === tabs.length - 1 ? "rounded-r-lg" : ""}
                  ${focusedTab === tab ? "bg-[#D4AF37]" : "bg-[#FFFBF0]"}
                `}
              >
                <Text
                  className={`font-bold ${focusedTab === tab ? "text-white" : "text-black"
                    }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="w-full px-4 mt-2">
            <Text className="text-left text-lg font-semibold">
              Recommended {focusedTab}
            </Text>
          </View>

          {diet && diet[focusedTab.toLowerCase()]?.length > 0 ? (
            <View className="w-full px-4 mt-2">
              {diet[focusedTab.toLowerCase()].map((item, index) => (
                <View
                  key={index}
                  className="bg-white p-4 mb-3 rounded-xl shadow border border-gray-200"
                >
                  <Text className="text-base font-bold mb-1">{item.foodName}</Text>
                  <View className="flex-row flex-wrap space-x-1">
                    <Text className="text-xs text-gray-700">{Number(item.calories).toFixed(2)} cal</Text>
                    <Text className="text-xs text-gray-700">•</Text>
                    <Text className="text-xs text-gray-700">{Number(item.protein).toFixed(2)}g protein</Text>
                    <Text className="text-xs text-gray-700">•</Text>
                    <Text className="text-xs text-gray-700">{Number(item.carbohydrates).toFixed(2)}g carbs</Text>
                    <Text className="text-xs text-gray-700">•</Text>
                    <Text className="text-xs text-gray-700">{Number(item.fat).toFixed(2)}g fat</Text>
                  </View>
                  <View className="flex-row space-x-5">
                    <TouchableOpacity className="mt-4">
                      <Text className="text-[#D4AF37] font-bold">View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="mt-4"
                      onPress={() => {
                        handleAddToPlan(
                          Number(item.protein),
                          Number(item.fat),
                          Number(item.carbohydrates),
                          Number(item.calories),
                          item.foodName,
                          focusedTab,
                          today
                        );
                      }}
                    >
                      <Text className="text-[#D4AF37] font-bold">Add to Plan ➔</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-center text-gray-500 text-sm mt-2">
              No items available for {focusedTab}
            </Text>
          )}
        </View>

        <Link href="../(infoPages)/infoHome">Info Pages</Link>
        <Link href="../(infoPages)/soundIntro">Sound Intro</Link>
        <Text>{dailyCalorieAdjustment}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
