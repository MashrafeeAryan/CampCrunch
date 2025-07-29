import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarStrip from "@/components/CalendarStrip";
import moment from "moment";

// Dummy food data keyed by date
const foodMap = {
  "2023-08-18": {
    breakfast: [],
    lunch: [{ name: "Fried Chicken x2 (*location*)", kcal: 450 }],
    dinner: [
      { name: "Alfredo Pasta (*location*)", kcal: 800 },
      { name: "Oreo Milkshake (*location*)", kcal: 600 },
    ],
  },
};

const CalendarScreen = () => {
  const router = useRouter();
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);

  const handleAddFood = () => {
    router.push("/AddFoodScreen");
  };

  const renderMealSection = (title, items) => {
    const totalKcal = items.reduce((sum, item) => sum + item.kcal, 0);

    return (
      <View className="border-gray-300 border-2 p-4 rounded-2xl w-11/12 bg-white mb-6">
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">{title.toUpperCase()}</Text>
          <Text className="font-bold text-lg">{totalKcal} KCAL</Text>
        </View>

        {items.map((item, index) => (
          <View key={index}>
            <View className="h-px bg-gray-300 my-4 w-full" />
            <View className="flex-row justify-between">
              <Text>{item.name}</Text>
              <Text>{item.kcal} KCAL</Text>
            </View>
          </View>
        ))}

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

  const foodData = foodMap[selectedDate] || {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 30 }}>
        <Text className="font-bold text-2xl mt-4">Today's Meals</Text>

        {/* Inject selected date + handler */}
        <CalendarStrip
          selectedDate={selectedDate}
          onSelectDate={(date) => setSelectedDate(date)}
        />

        {renderMealSection("Breakfast", foodData.breakfast)}
        {renderMealSection("Lunch", foodData.lunch)}
        {renderMealSection("Dinner", foodData.dinner)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
