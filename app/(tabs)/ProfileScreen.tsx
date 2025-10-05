import { useUserAuthStore } from "@/components/zustandStore/AuthStore";
import { useThemeStore } from "@/components/zustandStore/themeStore";
import { getBackgroundStyle, getTextStyle, getSectionBorderStyle } from "@/utils/themeHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import streakIcons from "../../assets/images/ProfilePageIcons";
import avatarIcons from "../../assets/images/avatar";

// Import profile picture status from zustand 
import { useProfileStore } from "@/components/zustandStore/profileStore"; 

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

const avatarOptions = [
  avatarIcons.bird,
  avatarIcons.cat,
  avatarIcons.eagle,
  avatarIcons.fox,
  avatarIcons.frog,
  avatarIcons.monkey,
  avatarIcons.redPanda,
  avatarIcons.teddy,
  avatarIcons.tortoise,
];

const ProfileScreen = () => {
  const theme = useThemeStore((state) => state.theme);
  const userEmail = useUserAuthStore((s) => s.userEmail);
  const campCrunchUserName = useUserAuthStore((s) => s.campCrunchUserName);
  const router = useRouter();

  const selectedAvatar = useProfileStore((s) => s.selectedAvatar);
  const setSelectedAvatar = useProfileStore((s) => s.setSelectedAvatar);

  // sets status of the avatar selection model to be visiable or not
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={getBackgroundStyle(theme)}>
      <View className="flex-1" style={getBackgroundStyle(theme)}>
        {/* Top Header */}
        <View
          className="px-8 pt-10 pb-14 relative h-[150px]"
          style={getBackgroundStyle(theme)}
        >
          {/* Settings icon at top right */}
          <View className="flex-row justify-end mt-3">
            <TouchableOpacity onPress={() => router.push("/settings")}>
              <Ionicons
                name="settings"
                size={24}
                color={theme === "dark" ? "#fff" : "black"}
              />
            </TouchableOpacity>
          </View>

          {/* Profile section positioned at bottom-left */}
          <View className="absolute left-8 bottom-5 flex-row items-center">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View className="relative">
              <Image
                source={selectedAvatar}
                className="w-[70px] h-[70px] rounded-full bg-white"
              />
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-white rounded-full"
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="add-circle" size={20} color="black" />
              </TouchableOpacity>
            </View>
            </TouchableOpacity>
            
            <View className="ml-4">
              <Text
                className="text-lg font-bold"
                style={getTextStyle(theme)}
              >
                {campCrunchUserName}
              </Text>
              <Text className="text-gray-600" style={getTextStyle(theme)}>
                {userEmail}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around py-5">
          {[
            { label: "Nutri-Level", value: 5 },
            { label: "Fuel-Streak", value: 200 },
            { label: "Bonus Bucks", value: "$150" },
          ].map((item, index) => (
            <View
              key={index}
              className="items-center rounded-lg p-3 bg-white"
              style={{
                ...getBackgroundStyle(theme),
                ...getSectionBorderStyle(theme),
              }}
            >
              <Text
                className="font-bold text-lg"
                style={getTextStyle(theme)}
              >
                {item.value}
              </Text>
              <Text className="text-xs" style={getTextStyle(theme)}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Did You Know */}
        <View
          className="rounded-2xl mx-4 p-4 flex-row items-center bg-white"
          style={{
            ...getBackgroundStyle(theme),
            ...getSectionBorderStyle(theme),
          }}
        >
          <Image
            source={streakIcons.coachIcon}
            className="w-[110px] h-[110px] mr-3"
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text className="font-extrabold text-[18px]" style={getTextStyle(theme)}>
              Did you know?
            </Text>
            <Text
              className="text-[12px] font-medium text-gray-600"
              style={getTextStyle(theme)}
            >
              The rate of calorie consumption through drinks has been the
              highest.
            </Text>
          </View>
        </View>

        {/* Fuel Streak */}
        <View
          className="rounded-2xl mx-4 mt-6 p-4 bg-white"
          style={{
            ...getBackgroundStyle(theme),
            ...getSectionBorderStyle(theme),
          }}
        >
          <Text
            className="font-bold text-base text-center mb-3"
            style={getTextStyle(theme)}
          >
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
                  <Text
                    className={`text-xs ${textColor}`}
                    style={getTextStyle(theme)}
                  >
                    {item.day}
                  </Text>
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
            “Hi. You’re on track 4 days this week. Keep it up!”
          </Text>
        </View>

        {/* Avatar Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-2xl p-6 w-11/12">
              <Text className="text-lg font-bold text-center mb-4">
                Choose Your Avatar
              </Text>
              <ScrollView
                contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}
              >
                {avatarOptions.map((icon, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className="m-2"
                    onPress={() => {
                      setSelectedAvatar(icon);
                      setModalVisible(false);
                    }}
                  >
                    <Image
                      source={icon}
                      className="w-16 h-16 rounded-full border-2 border-gray-300"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                className="mt-4 py-2 rounded-lg bg-red-500"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-center text-white font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
