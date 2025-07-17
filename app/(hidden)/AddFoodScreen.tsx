import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FoodLogos } from '../../assets/images/addFoodLogos';

export default function AddFoodScreen() {
  const [selectedTab, setSelectedTab] = useState('Dining Hall');

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
        <TouchableOpacity onPress={() => router.push('/infoHome')}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="black"
          />
        </TouchableOpacity>
              
        <Text className="text-lg font-bold ml-2 text-center absolute right-0 left-0 pt-4">Add Food</Text>
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
        onPress={() => console.log('Selected: The Fresh Food Co.')}
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
);

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
  <View className="p-4">
    <Text className="text-base font-semibold mb-2">Manual Entry</Text>
    <Text className="text-gray-500">Allow users to add food manually here.</Text>
  </View>
);
