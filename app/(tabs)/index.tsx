// Import necessary components and hooks from React Native and React
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressRings from "@/components/ProgressRings"; // Custom progress ring component
import { Link, usePathname } from "expo-router";
import { router } from "expo-router";
import { handleLogout } from "@/components/auth/authFunctions";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";



const Index = () => {
  // Set static values for calorie tracking
  const calories = 900;
  const goal = 2000;

  // This keeps track of whether the "Adjust Goals" button is pressed
  const [pressed, setPressed] = useState(false);

  // This tracks which tab is selected (e.g., "Breakfast", "Lunch", etc.)
  const [focusedTab, setFocusedTab] = useState("Breakfast");

  // These are the labels for the meal tabs
  const tabs = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  const dailyCalorieAdjustment = useUserHealthStore((s) => s.dailyCalorieAdjustment)

  const diet = useUserHealthStore((s) => s.dietRecommendation);
  const protein = useUserHealthStore((s)=>s.protein)
  const carbs = useUserHealthStore((s)=>s.carbs)
  const fat = useUserHealthStore((s)=>s.fat)


  //NIce
  return (

    // SafeAreaView keeps content out of notches and rounded screen edges
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* Main content wrapper, centered horizontally */}
        <View className="items-center">
          {/* Shows animated progress ring visual for calorie tracking */}
          <ProgressRings protein={protein} carbs={carbs} fat={fat} dailyCalorieAdjustment={dailyCalorieAdjustment.toFixed(0)} />

          {/* Title for the section, aligned to the left with padding */}
          <View className="w-full px-4 mt-2">
            <Text className="text-left text-lg font-semibold">
              Your Nutrition Goals
            </Text>
          </View>

          {/* Horizontal scroll section for showing nutrient summary boxes */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="p-4"
          >
            {/* Each box below shows data for one macro (Calories, Protein, etc.) */}

            <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[110] h-[80] items-center justify-center border-[#3498db] border-2">
              <Text className="text-2xl font-bold text-[#3498db]">800</Text>
              <Text className="text-xs text-gray-700">Daily Calories</Text>
              <Text className="text-xs text-gray-500">of {dailyCalorieAdjustment.toFixed(0)}</Text>
            </View>

            <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[110] h-[80] items-center justify-center border-[#e74c3c] border-2">
              <Text className="text-2xl font-bold text-[#e74c3c]">150</Text>
              <Text className="text-xs text-gray-700">Daily Protein</Text>
              <Text className="text-xs text-gray-500">of {protein.toFixed(0)}</Text>
            </View>

            <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[110] h-[80] items-center justify-center border-[#9b59b6] border-2">
              <Text className="text-2xl font-bold text-[#9b59b6]">200</Text>
              <Text className="text-xs text-gray-700">Daily Carbs</Text>
              <Text className="text-xs text-gray-500">of {carbs.toFixed(0)}</Text>
            </View>

            <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[110] h-[80] items-center justify-center border-[#f1c40f] border-2">
              <Text className="text-2xl font-bold text-[#f1c40f]">800</Text>
              <Text className="text-xs text-gray-700">Daily Fat</Text>
              <Text className="text-xs text-gray-500">of {fat.toFixed(0)}</Text>
            </View>

            {/* Adds some padding to the end of the scroll view */}
            <View style={{ width: 10 }} />
          </ScrollView>

          {/* "Adjust Goals" button aligned to the right side of the screen */}
          <View className="w-full px-4 items-end">
            <TouchableOpacity
              // Conditionally set background based on if it's been pressed
              className={`rounded-md p-2 border-[#f8d04a] border-2 ${pressed ? "bg-[#f1c40f]" : "bg-transparent"
                }`}
              onPress={() => {
                setPressed(true);
                router.push("../(infoPages)/infoHome");

              }}// Updates pressed state when tapped

            >
              <Text
                className={`${pressed ? "text-white" : "text-[#f1c40f]"
                  } font-bold text-xs`}
              >
                Adjust Goals
              </Text>
            </TouchableOpacity>
          </View>

          {/* Meal selection tabs: Breakfast, Lunch, Dinner, Snacks */}
          <View className="flex-row mt-5">
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab} // React requires a unique key when mapping elements
                onPress={() => setFocusedTab(tab)} // Set the focused tab when pressed
                className={`
                px-4 py-3
                ${index === 0 ? "rounded-l-lg" : ""
                  }   // Rounded left corner for first button
                ${index === tabs.length - 1 ? "rounded-r-lg" : ""
                  } // Rounded right corner for last button
                ${focusedTab === tab ? "bg-[#D4AF37]" : "bg-[#FFFBF0]"
                  } // Highlight the selected tab
              `}
              >
                <Text
                  className={`font-bold ${focusedTab === tab ? "text-white" : "text-black"
                    }`} // Change text color if selected
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
                    <Text className="text-xs text-gray-700">{item.calories.toFixed(2)} cal</Text>
                    <Text className="text-xs text-gray-700">•</Text>
                    <Text className="text-xs text-gray-700">{item.protein.toFixed(2)}g protein</Text>
                    <Text className="text-xs text-gray-700">•</Text>

                    <Text className="text-xs text-gray-700">{item.carbohydrates.toFixed(2)}g carbs</Text>
                    <Text className="text-xs text-gray-700">•</Text>

                    <Text className="text-xs text-gray-700">{item.fat.toFixed(2)}g fat</Text>
                  </View>
                  <View className="flex-row space-x-5">

                  <TouchableOpacity className="mt-4">
                    <Text className="text-[#D4AF37] font-bold">View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="mt-4" onPress={()=>{router.push("../SearchFoodScreen")}}>
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
