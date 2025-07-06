import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Feather,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const userInfo = {
    username: '@reallygreatsite',
    email: 'hello@reallygreatsite.com',
    phone: '+123-456-7890',
    address: '123 Anywhere St., Any City, ST 12345',
  };

  const accountInfoItems = [
    {
      label: 'Username',
      value: userInfo.username,
      icon: <FontAwesome name="user" size={20} color="white" />,
      key: 'username',
    },
    {
      label: 'E-mail Address',
      value: userInfo.email,
      icon: <MaterialCommunityIcons name="email" size={24} color="white" />,
      key: 'email',
    },
    {
      label: 'Phone Number',
      value: userInfo.phone,
      icon: <Feather name="phone" size={20} color="white" />,
      key: 'phone',
    },
    {
      label: 'Address',
      value: userInfo.address,
      icon: <Feather name="map-pin" size={20} color="white" />,
      key: 'address',
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-[#FAFAFA] px-5 pt-10"
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Top Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center space-x-1">
          <Entypo name="help-with-circle" size={20} color="black" />
          <Text className="font-bold text-sm">Help</Text>
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <View className="mb-4">
        <Text className="text-xl font-bold">Account</Text>
        <Text className="text-xl font-bold">Information</Text>
      </View>

      {/* Account Info */}
      {accountInfoItems.map((item) => (
        <View
          key={item.key}
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
        >
          <View className="flex-row items-center space-x-3 w-[80%]">
            <View className="w-10 h-10 bg-black rounded-lg justify-center items-center">
              {item.icon}
            </View>
            <View>
              <Text className="font-semibold">{item.label}</Text>
              <Text className="text-sm text-gray-600">{item.value}</Text>
            </View>
          </View>

          <TouchableOpacity className="w-8 h-8 bg-black rounded-lg justify-center items-center">
            <Feather name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Privacy Section */}
      <View className="mt-6 mb-4">
        <Text className="text-xl font-bold">Privacy</Text>
      </View>

      {/* Password (no toggle, just arrow) */}
      <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 bg-black rounded-lg justify-center items-center">
            <FontAwesome name="lock" size={20} color="white" />
          </View>
          <Text className="font-semibold">Password</Text>
        </View>
        <TouchableOpacity className="w-8 h-8 bg-black rounded-lg justify-center items-center">
          <Feather name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* 2FA */}
      <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 bg-black rounded-lg justify-center items-center">
            <MaterialIcons name="security" size={20} color="white" />
          </View>
          <Text className="font-semibold">Two-factor authentication</Text>
        </View>
        <TouchableOpacity className="w-8 h-8 bg-black rounded-lg justify-center items-center">
          <Feather name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* App Section */}
      <View className="mt-6 mb-4">
        <Text className="text-xl font-bold">App</Text>
      </View>

      {/* Notifications */}
      <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 bg-black rounded-lg justify-center items-center">
            <Feather name="bell" size={20} color="white" />
          </View>
          <Text className="font-semibold">Notifications & Message</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={() => setNotifications(!notifications)}
        />
      </View>

      {/* Theme Toggle */}
      <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 bg-black rounded-lg justify-center items-center">
            <Feather name="moon" size={20} color="white" />
          </View>
          <View>
            <Text className="font-semibold">Theme</Text>
            <Text className="text-sm text-gray-600">Dark Mode</Text>
          </View>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
        />
      </View>

      {/* Sign Out + Privacy Row */}
      <View className="flex-row justify-between items-center mt-10">
        <TouchableOpacity className="bg-yellow-400 rounded-full py-3 px-6 w-[48%]">
          <Text className="text-center font-bold text-black">Sign Out</Text>
        </TouchableOpacity>
        <Text className="text-xs text-gray-500">Privacy & Policy</Text>
      </View>
    </ScrollView>
  );
}
