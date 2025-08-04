import { Ionicons } from '@expo/vector-icons';
import {router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FoodLogos } from '../../assets/images/addFoodLogos';
import SearchFoodScreen from './SearchFoodScreen';

export default function AddFoodScreen() {
  const [selectedTab, setSelectedTab] = useState('Dining Hall');
  const router = useRouter()
  const renderContent = () => {
    switch (selectedTab) {
      case 'Dining Hall':
        return <DiningHall />;
      case 'Campus Outlets':
        return <CampusOutlets />;
      case 'Manual Entry':
        return <ManualEntry />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => {
         
          router.back()}}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="black"
          />
        </TouchableOpacity>
              
        <Text className="flex-1 text-lg font-bold text-center">
    Add Food
  </Text>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-2 mt-6" style={{ flexGrow: 0 }}>
        <View className="flex-row">
          {['Dining Hall', 'Campus Outlets', 'Manual Entry'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-full m-1 ${
                selectedTab === tab ? 'bg-yellow-400' : 'bg-gray-200'
              }`}
            >
              <Text className={`${selectedTab === tab ? 'text-black font-bold' : 'text-gray-600'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Content */}
      <ScrollView className="flex-1">
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const DiningHall = () => (
  
  <View className="flex-1 bg-gray-100 p-4 pt-8">
    <Text className="text-xl font-bold mb-4 tracking-wide">Dining Halls</Text>

    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-md"
        activeOpacity={0.8}
        onPress={() =>
          router.push("SearchFoodScreen")
        }

      >
        <Image
          source={FoodLogos.freshfood}
          className="w-16 h-16 mr-5"
          resizeMode="contain"
        />
        <Text className="text-xl font-semibold tracking-wide text-gray-800">The Fresh Food Co.</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
)

const outlets = [
  { name: 'Panda Express', image: FoodLogos.panda },
  { name: "Moe's: Southwest Grill", image: FoodLogos.moes },
  { name: 'Starbucks', image: FoodLogos.starbucks },
  { name: 'Chickfile', image: FoodLogos.chickfile },
  { name: 'Subway', image: FoodLogos.subway },
];

const CampusOutlets = () => (
  <View className="flex-1 bg-gray-100 p-4">
    <Text className="text-xl font-bold mb-4 tracking-wide">Available Locations</Text>

    <ScrollView showsVerticalScrollIndicator={false}>
      {outlets.map((outlet, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-md"
          activeOpacity={0.8}
          onPress={() => console.log(`Selected: ${outlet.name}`)}
        >
          <Image
            source={outlet.image}
            className="w-16 h-16 mr-5"
            resizeMode="contain"
          />
          <Text className="text-xl font-semibold tracking-wide text-gray-800">{outlet.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);


const ManualEntry = () => (
  <KeyboardAvoidingView
    className="flex-1 bg-gray-100"
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={100}
  >
    <ScrollView
      className="p-4 flex-1"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Search Bar with Icon */}
      <View className="bg-white flex-row items-center rounded-xl px-4 py-1 mb-6">
        <Ionicons name="search" size={20} color="#999" className="mr-2" />
        <TextInput
          placeholder="Search food..."
          placeholderTextColor="#999"
          className="text-base text-black flex-1"
        />
      </View>

      {/* Title */}
      <Text className="text-center text-sm font-semibold text-gray-700 mb-4">
        Cooking food on your own?
      </Text>

      {/* Food Name */}
      <Text className="text-base font-bold mb-1">Food Name</Text>
      <TextInput
        placeholder="Enter food name"
        placeholderTextColor="#999"
        className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
      />

      {/* Macros */}
      <View className="flex-row justify-between mb-4">
        <View className="flex-1 mr-2">
          <Text className="text-base font-bold mb-1">Calories</Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#999"
            className="bg-white rounded-xl px-4 py-3 text-black"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-base font-bold mb-1">Carbs</Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#999"
            className="bg-white rounded-xl px-4 py-3 text-black"
          />
        </View>
      </View>

      <View className="flex-row justify-between mb-4">
        <View className="flex-1 mr-2">
          <Text className="text-base font-bold mb-1">Protein</Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#999"
            className="bg-white rounded-xl px-4 py-3 text-black"
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-base font-bold mb-1">Fat</Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#999"
            className="bg-white rounded-xl px-4 py-3 text-black"
          />
        </View>
      </View>

      {/* Ingredients */}
      <Text className="text-base font-bold mb-1">Ingredients</Text>
      <TextInput
        placeholder="Enter ingredients..."
        placeholderTextColor="#999"
        className="bg-white rounded-xl px-4 py-3 h-32 text-black"
        multiline
        textAlignVertical="top"
      />

      {/* Log Food Button */}
      <TouchableOpacity
        className="bg-gray-500 py-2 rounded-xl mt-6 items-center "
        onPress={() => {
          // TODO: Implement log food functionality
          alert('Food logged!');
        }}
      >
        <Text className="text-lg font-bold text-white">Log Food</Text>
      </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
);