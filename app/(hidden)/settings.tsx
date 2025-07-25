import { handleLogout } from '@/components/auth/authFunctions';
import { useUserAuthStore } from '@/components/zustandStore/AuthStore';
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

import { useThemeStore } from '@/components/zustandStore/themeStore';
import { darkTheme } from '@/utils/themeColors';






export default function SettingsScreen() {
  const theme = useThemeStore((state) => state.theme);

  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [notifications, setNotifications] = useState(false);

  const userID = useUserAuthStore((s) => s.userID);
  const userEmail = useUserAuthStore((s) => s.userEmail);
  const userName = useUserAuthStore((s) => s.userName);

  //Get it from zustand:
  const campCrunchUserName = useUserAuthStore((s)=> s.campCrunchUserName)
  const userInfo = {
    username: userName,
    email: userEmail,
    phone: "+123-456-7890",
  
  };

  const accountInfoItems = [
    {
      label: "Username",
      value: userInfo.username,
      icon: <FontAwesome name="user" size={20} color="white" />,
      key: "username",
    },
    {
      label: "E-mail Address",
      value: userInfo.email,
      icon: <MaterialCommunityIcons name="email" size={24} color="white" />,
      key: "email",
    },
    {
      label: "Phone Number",
      value: userInfo.phone,
      icon: <Feather name="phone" size={20} color="white" />,
      key: "phone",
    },
   
  ];

  return (
    <ScrollView 
      className="flex-1 bg-[#FAFAFA] px-5 pt-10"
      contentContainerStyle={{ paddingBottom: 60 }} 
      style={theme === 'dark' ? { backgroundColor: darkTheme.background } : {}}
    >
      {/* Top Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Feather name="arrow-left" size={24} color={theme === 'dark' ? darkTheme.text : 'black'} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center space-x-1" >
          <Entypo name="help-with-circle" size={20} color={theme === 'dark' ? darkTheme.text : 'black'} />
          <Text className="font-bold text-sm" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Help</Text>
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <View className="mb-4">
        <Text className="text-xl font-bold" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Account</Text>
        <Text className="text-xl font-bold" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Information</Text>
      </View>

      {/* Account Info */}
      {accountInfoItems.map((item) => (
        <View
          key={item.key}
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
        >
          <View className="flex-row items-center space-x-3 w-[80%]">
            <View className="w-10 h-10 bg-black rounded-lg justify-center items-center" style={theme === 'dark' ? { backgroundColor: darkTheme.card } : {}}>
              {item.icon}
            </View>
            <View>
              <Text className="font-semibold" style={theme === 'dark' ? { color: darkTheme.text } : {}}>{item.label}</Text>
              <Text className="text-sm text-gray-600" style={theme === 'dark' ? { color: darkTheme.text } : {}}>{item.value}</Text>
            </View>
          </View>

          <TouchableOpacity className="w-8 h-8 bg-black rounded-lg justify-center items-center" style={theme === 'dark' ? { backgroundColor: darkTheme.card } : {}}>
            <Feather name="chevron-right" size={20} color={theme === 'dark' ? darkTheme.text : 'white'} />
          </TouchableOpacity>
        </View>
      ))}

      {/* Privacy Section */}
      <View className="mt-6 mb-4">
        <Text className="text-xl font-bold" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Privacy</Text>
      </View>

      {/* Password (no toggle, just arrow) */}
      <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 bg-black rounded-lg justify-center items-center" style={theme === 'dark' ? { backgroundColor: darkTheme.card } : {}}>
            <FontAwesome name="lock" size={20} color={theme === 'dark' ? darkTheme.text : 'white'} />
          </View>
          <Text className="font-semibold" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Password</Text>
        </View>
        <TouchableOpacity className="w-8 h-8 bg-black rounded-lg justify-center items-center" style={theme === 'dark' ? { backgroundColor: darkTheme.card } : {}}>
          <Feather name="chevron-right" size={20} color={theme === 'dark' ? darkTheme.text : 'white'} />
        </TouchableOpacity>
      </View>

      {/* 2FA */}
      <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 bg-black rounded-lg justify-center items-center" style={theme === 'dark' ? { backgroundColor: darkTheme.card } : {}}>
            <MaterialIcons name="security" size={20} color={theme === 'dark' ? darkTheme.text : 'white'} />
          </View>
          <Text className="font-semibold" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Two-factor authentication</Text>
        </View>
        <TouchableOpacity className="w-8 h-8 bg-black rounded-lg justify-center items-center" style={theme === 'dark' ? { backgroundColor: darkTheme.card } : {}}>
          <Feather name="chevron-right" size={20} color={theme === 'dark' ? darkTheme.text : 'white'} />
        </TouchableOpacity>
      </View>

      {/* App Section */}
      <View className="mt-6 mb-4">
        <Text className="text-xl font-bold" style={theme === 'dark' ? { color: darkTheme.text } : {}}>App</Text>
      </View>

      {/* Notifications */}
      <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 bg-black rounded-lg justify-center items-center" style={theme === 'dark' ? { backgroundColor: darkTheme.card } : {}}>
            <Feather name="bell" size={20} color={theme === 'dark' ? darkTheme.text : 'white'} />
          </View>
          <Text className="font-semibold" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Notifications & Message</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={() => setNotifications(!notifications)}
        />
      </View>

      {/* Theme Toggle */}
      <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="w-10 h-10 bg-black rounded-lg justify-center items-center" style={theme === 'dark' ? { backgroundColor: darkTheme.card } : {}}>
            <Feather name="moon" size={20} color={theme === 'dark' ? darkTheme.text : 'white'} />
          </View>
          <View>
            <Text className="font-semibold" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Theme</Text>
            <Text className="text-sm text-gray-600" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Dark Mode</Text>
          </View>
        </View>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
        />
      </View>

      {/* Sign Out + Privacy Row */}
      <View className="flex-row justify-between items-center mt-10">
        <TouchableOpacity className="bg-yellow-400 rounded-full py-3 px-6 w-[48%]"
          onPress={() => {handleLogout(router)}}
        >
          <Text className="text-center font-bold text-black" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Sign Out</Text>
        </TouchableOpacity>
        <Text className="text-xs text-gray-500" style={theme === 'dark' ? { color: darkTheme.text } : {}}>Privacy & Policy</Text>
      </View>
    </ScrollView>
  );
}
