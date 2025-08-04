import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarStrip from "@/components/CalendarStrip";
import moment from "moment";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";

const CalendarScreen = () => {
  const router = useRouter();
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);

  const foodMap = useUserHealthStore((s) => s.foodMap);

  const handleAddFood = () => {
    router.push("/AddFoodScreen");
  };

  const renderMealSection = (title, items = []) => {
    const totalKcal = items.reduce((sum, item) => sum + (item.calories || 0), 0);

    return (
      <View className="border-gray-300 border-2 p-4 rounded-2xl w-11/12 bg-white mb-6">
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">{title.toUpperCase()}</Text>
          <Text className="font-bold text-lg">{totalKcal.toFixed(0)} KCAL</Text>
        </View>

        {items.length === 0 ? (
          <Text className="text-gray-400 mt-4">No food added</Text>
        ) : (
          items.map((item, index) => (
            <View key={index}>
              <View className="h-px bg-gray-300 my-4 w-full" />
              <View className="flex-row justify-between">
                <Text>{item.foodName}</Text>
                <Text>{item.calories.toFixed(0)} KCAL</Text>
              </View>
            </View>
          ))
        )}

        <View className="items-center mt-4">
          <TouchableOpacity
            className="border-2 border-[#f8d04a] rounded-full py-2 px-4"
            onPress={handleAddFood}
          >
            <Text className="text-yellow-500 font-bold">Add Food +</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Ensure correct capitalization to match your actual foodMap keys
  const foodData = foodMap?.[selectedDate] ?? {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 30 }}>
        <Text className="font-bold text-2xl mt-4">Today's Meals</Text>

        <CalendarStrip
          selectedDate={selectedDate}
          onSelectDate={(date) => setSelectedDate(date)}
        />

        {renderMealSection("Breakfast", foodData.Breakfast)}
        {renderMealSection("Lunch", foodData.Lunch)}
        {renderMealSection("Dinner", foodData.Dinner)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
