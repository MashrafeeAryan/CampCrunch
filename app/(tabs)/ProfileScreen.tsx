import { useUserAuthStore } from "@/components/zustandStore/AuthStore";
import { useThemeStore } from '@/components/zustandStore/themeStore';
import { getBackgroundStyle, getTextStyle,getSectionBorderStyle } from '@/utils/themeHelpers';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import streakIcons from "../../assets/images/ProfilePageIcons";

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
  const theme = useThemeStore((state) => state.theme);
  const userEmail = useUserAuthStore((s)=> s.userEmail)
  const campCrunchUserName = useUserAuthStore((s)=> s.campCrunchUserName)
  const router = useRouter()
  return (
    <ScrollView style={getBackgroundStyle(theme)}>
    <View className="flex-1 bg-[#aba8a8]" style={getBackgroundStyle(theme)}>
      {/* Top Header */}
      <View className="bg-[#d9d9d9] px-[30px] pt-[40px] pb-[60px] relative h-[150px]" style={{
  ...getBackgroundStyle(theme),
  
}}>
        {/* Settings icon at top right */}
        <View className="flex-row justify-end mt-[12px]">
          <TouchableOpacity 
          onPress={
            () => {router.push("/settings")} 
          }>
            <Ionicons name="settings" size={24} color={theme === 'dark' ? '#fff' : 'black'} />
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
            <Text className="text-lg font-bold" style={getTextStyle(theme)}>{campCrunchUserName}</Text>
            <Text className="text-gray-600" style={getTextStyle(theme)}>{userEmail}</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="bg-[#f5f5f5] min-h-full" style={getBackgroundStyle(theme)}>
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
                style={{...getBackgroundStyle(theme), ...getSectionBorderStyle(theme)}}
              >
                <Text className="font-bold text-lg" style={getTextStyle(theme)}>{item.value}</Text>
                <Text className="text-xs" style={getTextStyle(theme)}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Did You Know */}
          <View className="bg-white rounded-2xl mx-4 p-4 flex-row items-center" style={{...getBackgroundStyle(theme), ...getSectionBorderStyle(theme)}}>
            <Image
              source={streakIcons.coachIcon}
              className="w-[110px] h-[110px] mr-3"
              resizeMode="contain"
            />
            <View className="flex-1" style={{...getBackgroundStyle(theme), }}>
              <Text className="font-[900] text-[18px]" style={getTextStyle(theme)}>Did you know?</Text>
              <Text className="text-[12px] font-[500] text-gray-600" style={getTextStyle(theme)}>
                The rate of calorie consumption through drinks has been the
                highest.
              </Text>
            </View>
          </View>

          {/* Fuel Streak */}
          <View className="bg-white rounded-2xl mx-4 mt-6 p-4" style={{...getBackgroundStyle(theme), ...getSectionBorderStyle(theme)}}>
            <Text className="font-bold text-base text-center mb-3" style={getTextStyle(theme)}>
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
                    <Text className={`text-xs ${textColor}`} style={getTextStyle(theme)}>{item.day}</Text>
                    <Image
                      source={item.icon}
                      className="w-[38px] h-[38px] mt-1"
                      resizeMode="contain"
                    />
                  </View>
                );
              })}
            </View>
            <Text className="mt-3 text-xs text-center" style={getTextStyle(theme)}>
              “Hi . You’re on track 4 days this week. Keep it up!”
            </Text>
          </View>

        {/* Achievements */}
        {/* </View>
          <View className="bg-white rounded-2xl mx-4 mt-6 p-4">
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
        </View>
        <View className="h-10">*/}

        <TouchableOpacity onPress={() => router.push('/(infoPages)/infoHome')}>
          <Text style={getTextStyle(theme)}>Hi there</Text>
        </TouchableOpacity>

        </View> 
      </ScrollView>
    </View>
    </ScrollView>
  );
};

export default ProfileScreen;
