import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Adjust_goals() {
  const router = useRouter();

  const [calories, setCalories] = useState('2000');
  const [carbs, setCarbs] = useState('250');
  const [fat, setFat] = useState('69');
  const [protein, setProtein] = useState('90');

  const handleGoalChange = () => {
    alert(`Goals updated:\nCalories: ${calories} kcal\nCarbs: ${carbs}g\nFat: ${fat}g\nProtein: ${protein}g`);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="bg-white px-6 pt-10">
      
     

      {/* Title */}
      <Text className="text-4xl font-bold text-center text-black mb-8">
        Adjust Goals
      </Text>

      {/* Calories */}
      <Text className="text-lg font-semibold mb-2">Calories</Text>
      <View className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-3 mb-4">
        <Text className="text-base text-gray-800">Daily Calorie Goal</Text>
        <View className="flex-row items-center">
          <TextInput
            className="text-base text-right w-16 mr-1"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
          <Text className="text-base text-gray-500">kcal</Text>
        </View>
      </View>

      {/* Macronutrients Section */}
      <Text className="text-lg font-semibold mb-2">Macronutrient Goals</Text>

      {/* Carbs */}
      <View className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-3 mb-4">
        <Text className="text-base text-gray-800">Carbohydrates Goal</Text>
        <View className="flex-row items-center">
          <TextInput
            className="text-base text-right w-16 mr-1"
            keyboardType="numeric"
            value={carbs}
            onChangeText={setCarbs}
          />
          <Text className="text-base text-gray-500">g</Text>
        </View>
      </View>

      {/* Fat */}
      <View className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-3 mb-4">
        <Text className="text-base text-gray-800">Fat</Text>
        <View className="flex-row items-center">
          <TextInput
            className="text-base text-right w-16 mr-1"
            keyboardType="numeric"
            value={fat}
            onChangeText={setFat}
          />
          <Text className="text-base text-gray-500">g</Text>
        </View>
      </View>

      {/* Protein */}
      <View className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-3 mb-6">
        <Text className="text-base text-gray-800">Protein</Text>
        <View className="flex-row items-center">
          <TextInput
            className="text-base text-right w-16 mr-1"
            keyboardType="numeric"
            value={protein}
            onChangeText={setProtein}
          />
          <Text className="text-base text-gray-500">g</Text>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleGoalChange} className="bg-yellow-400 py-4 rounded-lg items-center">
        <Text className="text-xl font-semibold text-white">Change your Goals</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
