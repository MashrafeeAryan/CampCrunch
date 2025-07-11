import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import streakIcons from "../../assets/images/ProfilePageIcons";
import { useUser } from "@/hooks/useUser";
import ProfilePageIcons from "../../assets/images/ProfilePageIcons";
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
  const { user } = useUser();
  const router = useRouter()

  return (
    <View className="flex-1 bg-[#aba8a8]">
      {/* Top Header */}
      <View className="bg-[#c2c2c2] px-[30px] pt-[20px] pb-[20px] h-[150px]">
        <View className="flex-row justify-between h-full">
          {/* Left side: Profile info */}
          <View className="flex-row items-center pt-[25px]">
            <View className="relative">
              <Image
                source={streakIcons.profileIcon}
                className="w-[70px] h-[70px] rounded-full bg-white"
              />
              <TouchableOpacity className="absolute bottom-1 right-1 bg-white rounded-full">
                <Ionicons name="add-circle" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <View className="ml-4">
              <Text className="text-lg font-bold">{user.name}</Text>
              <Text className="text-gray-600">@sonamshrpac</Text>
            </View>
          </View>

          {/* Right side: settings (top) and share (bottom) */}
          <View className="justify-between items-end h-full ">
            {/* Top: Settings */}
            <TouchableOpacity className="pt-[13px]" onPress={() => router.push('/(infoPages)/infoHome')}>
              <Ionicons name="settings" size={27} color="black" />
            </TouchableOpacity>

            {/* Bottom: Share */}
            <TouchableOpacity
              onPress={() => console.log("share")}
              className="mt-auto"
            >
              <Image
                source={streakIcons.shareIcon}
                className="w-[27px] h-[27px]"
                resizeMode="contain"
              />
            </TouchableOpacity>
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
              source={ProfilePageIcons.coachIcon}
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
              “Hi {user.name}. You’re on track 4 days this week. Keep it up!”
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
