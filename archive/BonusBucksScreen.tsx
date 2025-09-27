import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BonusBucksLogo from "../assets/images/BonusBucksLogo"
const transactions = [
  { 
    id: '1', 
    name: 'Starbucks', 
    date: 'May 4, 2025', 
    amount: '-$12',
    logo: require('../../assets/images/BonusBucksLogo/starbucks_logo.png') // Replace with actual path
  },
  { 
    id: '2', 
    name: 'Panda Express', 
    date: 'May 6, 2025', 
    amount: '-$18',
    logo: require('../../assets/images/BonusBucksLogo/starbucks_logo.png') // Replace with actual path
  },
];

export default function BonusBucksScreen() {
  const router = useRouter();

  const renderShopLogo = (item) => {
    // In future, this will be loaded from database
    // For now, we'll use a fallback system
    try {
      return (
        <Image 
          source={item.logo}
          className="w-10 h-10 rounded"
          onError={() => {
            // Fallback to generic shop icon if logo fails to load
            console.log(`Failed to load logo for ${item.name}`);
          }}
        />
      );
    } catch (error) {
      // Fallback generic shop icon
      return (
        <View className="w-10 h-10 bg-gray-700 rounded items-center justify-center">
          <Ionicons name="storefront" size={20} color="white" />
        </View>
      );
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 pt-6">
        {/* User Name */}
        <Text className="text-lg font-bold mb-6">Sonam Sherpa</Text>

        {/* Balance Card */}
        <View className="bg-gray-800 p-5 rounded-2xl flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-3xl font-bold">$280</Text>
            <Text className="text-gray-300 text-sm">Balance</Text>
          </View>
          <View className="items-end p-4">
            <Image 
              source={require('../../assets/images/BonusBucksLogo/BonusBucksLogo.png')}
              className="w-12 h-8 mb-2"
            />
            <Text className="text-yellow-400 text-xs">Bonus Bucks</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-center space-x-12 mb-6">
          <TouchableOpacity className="items-center">
            <View className="bg-gray-800 p-4 rounded-2xl mb-2">
              <Image 
                source={BonusBucksLogo.AddBucksLogo}
                className="w-7 h-7"
              />
            </View>
            <Text className="text-sm">Add funds</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center">
            <View className="bg-gray-800 p-4 rounded-2xl mb-2">
              <Image 
                source={BonusBucksLogo.QRLogo}
                className="w-7 h-7"
              />
            </View>
            <Text className="text-sm">QR Code</Text>
          </TouchableOpacity>
        </View>

        {/* GET App Button */}
        <TouchableOpacity className="bg-gray-800 py-3 rounded-full items-center mb-6">
          <Text className="text-white font-semibold">Get the GET App</Text>
        </TouchableOpacity>

        {/* Transactions Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-semibold text-base">Transaction</Text>
          <Text className="text-gray-600 text-sm">Sort by Latest ▼</Text>
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        className="px-5"
        renderItem={({ item }) => (
          <View className="flex-row items-center py-4 border-b border-gray-200">
            {renderShopLogo(item)}
            <View className="flex-1 ml-4">
              <Text className="font-semibold text-base">{item.name}</Text>
              <Text className="text-gray-500 text-sm">{item.date}</Text>
            </View>
            <Text className="font-semibold text-base">{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}
