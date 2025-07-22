import CalendarStrip from "@/components/CalendarStrip";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CalendarScreen = () => {
  const router = useRouter()
  const handleAddFood = () => {
 
    router.push("/AddFoodScreen")
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className=" items-center">
          <Text className="font-bold text-xl">Today's Meals</Text>
        </View>
        <CalendarStrip></CalendarStrip>
        <View className="items-center mt-8">
          <View className="border-gray-300 border-2 p-4 rounded-2xl w-[300] bg-white">
            {/* Row for "BREAKFAST" and "0 KCAL" */}
            <View className="flex-row justify-between">
              <Text className="font-bold">BREAKFAST</Text>
              <Text className="font-bold">0 KCAL</Text>
            </View>
            {/* Horizontal line divider */}
            <View className="h-px bg-gray-300 my-4 w-full" />
            <View className="flex-row justify-between">
              <Text>Chicken</Text>
              <Text>450 KCAL</Text>
            </View>
            <View className="h-px bg-gray-300 my-4 w-full" />
            <View className="flex-row justify-between">
              <Text>Chicken</Text>
              <Text>450 KCAL</Text>
            </View>
            <View className="items-center mt-3">
              <TouchableOpacity className="border-2 border-[#f8d04a] rounded-full py-2 px-3"
                onPress={handleAddFood}
              >
                <Text className="text-yellow-500 font-bold">Add Food +</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
