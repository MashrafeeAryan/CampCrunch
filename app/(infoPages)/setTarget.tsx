import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import { router } from "expo-router"; // Make sure router is imported properly
import infoPageLogos from "../../assets/images/infoPageLogos";

const goals = [
  {
    label: "Loose 0.5 lbs per week",
    color: "#76D96E",
    subtitle: "Recommended for beginners",
    icon: require("@/assets/images/infoPageLogos/loose_0.5.png"),
  },
  {
    label: "Loose 1 lbs per week",
    color: "#C4F869",
    subtitle: "Recommended for beginners",
    icon: require("@/assets/images/infoPageLogos/loose_1.png"),
  },
  {
    label: "Loose 1.5 lbs per week",
    color: "#FFC94B",
    icon: require("@/assets/images/infoPageLogos/loose_1.5.png"),
  },
  {
    label: "Loose 2 lbs per week",
    color: "#FFA74A",
    icon: require("@/assets/images/infoPageLogos/loose_2.png"),
  },
  {
    label: "Gain 0.5 lbs per week",
    color: "#FFC94B",
    icon: require("@/assets/images/infoPageLogos/Gain05.png"),
  },
  {
    label: "Gain 1 lbs per week",
    color: "#FFA74A",
    icon: require("@/assets/images/infoPageLogos/gain_1.png"),
  },
  {
    label: "Maintain Weight",
    color: "#ECECEC",
    icon: require("@/assets/images/infoPageLogos/gain_1.png"),
   
  },
];

const GoalSelectionScreen = () => {
  const [selectedGoal, setSelectedGoal] = useState("Maintain Weight");
  const scrollY = useRef(new Animated.Value(0)).current;

  const rotateArrow = scrollY.interpolate({
    inputRange: [0, 50], // tweak this as needed
    outputRange: ["0deg", "180deg"],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1 bg-white px-4 pt-10">
    
      

      {/* Top Illustration */}
      <View className="items-center mb-4">
        <Image
          source={infoPageLogos.thumbsUpManLogo} // Replace with your own
          style={{ width: 160, height: 160, resizeMode: "contain" }}
        />
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-center mb-4">What’s your goal?</Text>

      {/* Scrollable Goals Section Only */}
      <Animated.ScrollView
        style={{ flex: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View className="space-y-3 mb-6">
          {goals.map((goal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedGoal(goal.label)}
              className="rounded-2xl px-4 py-7 mb-2 mx-4"
              style={{
                backgroundColor:
                  selectedGoal === goal.label ? "#333" : goal.color || "#f0f0f0",
              }}
            >
              <View className="flex-row items-center">
                <Image
                  source={goal.icon}
                  style={{ width: 65, height: 60, marginRight: 10 }}
                />
                <View>
                  <Text
                    className="font-bold text-xl"
                    style={{
                      color:
                        goal.textColor ||
                        (selectedGoal === goal.label ? "#fff" : "#000"),
                    }}
                  >
                    {goal.label}
                  </Text>
                  {goal.subtitle && (
                    <Text className="text-xs text-gray-700">{goal.subtitle}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Text */}
        <Text className="text-center text-sm text-gray-500 mb-6">
          You will be able to update this at any time
        </Text>

        {/* Buttons */}
        <View className="flex-row justify-between mb-10">
          <TouchableOpacity className="bg-black px-5 py-3 rounded-lg">
            <Text className="text-white font-bold">Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-black px-5 py-3 rounded-lg"
            onPress={() => {
              router.push("/allergies"); // Replace with your actual route
            }}
          >
            <Text className="text-white font-bold">Next</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default GoalSelectionScreen;
