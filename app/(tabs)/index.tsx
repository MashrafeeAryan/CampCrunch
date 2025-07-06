// Import necessary components and hooks from React Native and React
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressRings from "@/components/ProgressRings"; // Custom progress ring component
import { Link, usePathname } from "expo-router";
import { router } from "expo-router";
import { useEffect } from "react";
 const [LoggedIn,setLoggedIn]=useState(false)



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
  const pathname=usePathname();

  return (
  
    // SafeAreaView keeps content out of notches and rounded screen edges
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
      {/* Main content wrapper, centered horizontally */}
      <View className="items-center">
        {/* Shows animated progress ring visual for calorie tracking */}
        <ProgressRings value={calories} goal={goal} />

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

          <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[120] h-[100] items-center justify-center border-[#3498db] border-2">
            <Text className="text-2xl font-bold text-[#3498db]">800</Text>
            <Text className="text-xs text-gray-700">Daily Calories</Text>
            <Text className="text-xs text-gray-500">of 2000</Text>
          </View>

          <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[120] h-[100] items-center justify-center border-[#e74c3c] border-2">
            <Text className="text-2xl font-bold text-[#e74c3c]">150</Text>
            <Text className="text-xs text-gray-700">Daily Protein</Text>
            <Text className="text-xs text-gray-500">of 2000</Text>
          </View>

          <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[120] h-[100] items-center justify-center border-[#9b59b6] border-2">
            <Text className="text-2xl font-bold text-[#9b59b6]">200</Text>
            <Text className="text-xs text-gray-700">Daily Carbs</Text>
            <Text className="text-xs text-gray-500">of 2000</Text>
          </View>

          <View className="bg-gray-10 rounded-xl p-4 mr-3 w-[120] h-[100] items-center justify-center border-[#f1c40f] border-2">
            <Text className="text-2xl font-bold text-[#f1c40f]">800</Text>
            <Text className="text-xs text-gray-700">Daily Fat</Text>
            <Text className="text-xs text-gray-500">of 2000</Text>
          </View>

          {/* Adds some padding to the end of the scroll view */}
          <View style={{ width: 10 }} />
        </ScrollView>

        {/* "Adjust Goals" button aligned to the right side of the screen */}
        <View className="w-full px-4 items-end">
          <TouchableOpacity
            // Conditionally set background based on if it's been pressed
            className={`rounded-md p-2 border-[#f8d04a] border-2 ${
              pressed ? "bg-[#f1c40f]" : "bg-transparent"
            }`}
            onPress={() => {setPressed(true);
              router.push("../(infoPages)/infoHome");
              
            } }// Updates pressed state when tapped
          
          >
            <Text
              className={`${
                pressed ? "text-white" : "text-[#f1c40f]"
              } font-bold text-sm`}
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
                ${
                  index === 0 ? "rounded-l-lg" : ""
                }   // Rounded left corner for first button
                ${
                  index === tabs.length - 1 ? "rounded-r-lg" : ""
                } // Rounded right corner for last button
                ${
                  focusedTab === tab ? "bg-[#D4AF37]" : "bg-[#FFFBF0]"
                } // Highlight the selected tab
              `}
            >
              <Text
                className={`font-bold ${
                  focusedTab === tab ? "text-white" : "text-black"
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
      </View>
      <Link href="../(infoPages)/infoHome">Info Pages</Link>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
