import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import streakIcons from "../../assets/images/ProfilePageIcons";
import { useRouter } from "expo-router";

const streakData = [
  { day: "Mon", icon: streakIcons.freezeIcon, status: "missed" },
  { day: "Tue", icon: streakIcons.fireIcon, status: "met" },
  { day: "Wed", icon: streakIcons.fireIcon, status: "met" },
  { day: "Thu", icon: streakIcons.fireIcon, status: "met" },
  { day: "Fri", icon: streakIcons.fireIcon, status: "met" },
  { day: "Sat", icon: streakIcons.emptyIcon, status: "upcoming" },
  { day: "Sun", icon: streakIcons.emptyIcon, status: "upcoming" },
];

const achievements = [
  { title: "First Bite Logged", icon: streakIcons.medalIcon },
  { title: "7-day Streak Hero", icon: streakIcons.medalIcon },
  { title: "Meal Planner Pro", icon: streakIcons.medalIcon },
  { title: "Hydration Champ", icon: streakIcons.medalIcon },
];

const ProfileScreen = () => {

  const router = useRouter()

  return (
    <View className="flex-1 bg-[#aba8a8]">
      {/* Top Header */}
      <View className="bg-[#d9d9d9] px-[30px] pt-[40px] pb-[60px] relative h-[150px]">
        {/* Settings icon at top right */}
        <View className="flex-row justify-end mt-[12px]">
          <TouchableOpacity onPress={() => router.push('/(hidden)/settings')}>
            <Ionicons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Profile section positioned at bottom-left */}
        <View className="absolute left-[30px] bottom-[20px] flex-row items-center">
          <View className="relative">
            <Image
              source={streakIcons.profileIcon}
              className="w-[70px] h-[70px] rounded-full bg-[#ffff]"
            />
            <TouchableOpacity className="absolute bottom-1 right-1 bg-white rounded-full">
              <Ionicons name="add-circle" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View className="ml-4">
            <Text className="text-lg font-bold">aaaa</Text>
            <Text className="text-gray-600">@sonamshrpac</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="bg-[#f5f5f5] min-h-full">
          {/* Stats */}
          <View className="flex-row justify-around py-5">
            {[
              { label: "Nutri-Level", value: 5 },
              { label: "NutriBuds", value: 10 },
              { label: "Fuel-Streak", value: 200 },
              { label: "Bonus Bucks", value: "$150" },
            ].map((item, index) => (
              <View
                key={index}
                className="items-center bg-white rounded-[10px] p-[9px]"
              >
                <Text className="font-bold text-lg">{item.value}</Text>
                <Text className="text-xs">{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Did You Know */}
          <View className="bg-white rounded-2xl mx-4 p-4 flex-row items-center">
            <Image
              source={streakIcons.coachIcon}
              className="w-[110px] h-[110px] mr-3"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="font-[900] text-[18px]">Did you know?</Text>
              <Text className="text-[12px] font-[500] text-gray-600">
                The rate of calorie consumption through drinks has been the
                highest.
              </Text>
            </View>
          </View>

        {/* Fuel Streak */}
        <View className="bg-white rounded-2xl mx-4 mt-6 p-4">
          <Text className="font-bold text-base text-center mb-3">
            Fuel Streak
          </Text>
          <View className="flex-row justify-between px-2">
            {streakData.map((item, index) => {
              let textColor =
                item.status === "met"
                  ? "text-red-500"
                  : item.status === "missed"
                  ? "text-blue-500"
                  : "text-gray-400";
              return (
                <View key={index} className="items-center">
                  <Text className={`text-xs ${textColor}`}>{item.day}</Text>
                  <Image
                    source={item.icon}
                    className="w-[38px] h-[38px] mt-1"
                    resizeMode="contain"
                  />
                </View>
              );
            })}
          </View>
          <Text className="mt-3 text-xs text-center">
            “Hi . You’re on track 4 days this week. Keep it up!”
          </Text>
        </View>

          {/* Achievements */}
          {/* <View className="bg-white rounded-2xl mx-4 mt-6 p-4">
          <Text className="text-base font-bold text-center mb-3">
            Achievements
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
          >
            {achievements.map((item, index) => (
              <View key={index} className="items-center w-24 mx-2">
                <Image source={item.icon} className="w-12 h-12" resizeMode="contain"/>
                <Text className="text-xs mt-1 text-center">{item.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
