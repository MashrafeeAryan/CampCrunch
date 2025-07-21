import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import { SafeAreaView } from "react-native-safe-area-context";

// List of preferences with label, unique key, and corresponding icon image
const preferences = [
  { label: "Halal", key: "halal", icon: infoPageLogos.halal },
  { label: "Vegetarian", key: "vegetarian", icon: infoPageLogos.vegetarian },
  { label: "Vegan", key: "vegan", icon: infoPageLogos.vegan },
  { label: "Gluten", key: "gluten", icon: infoPageLogos.gluten },
  { label: "No Beef", key: "no_beef", icon: infoPageLogos.no_beef },
  { label: "Keto", key: "keto", icon: infoPageLogos.keto },
];

export default function PreferencesScreen() {
  // Local state to keep track of currently selected preferences (array of keys)
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  // Zustand store method to save preferences globally
  const setPreferences = useUserHealthStore((s) => s.setPreferences);

  // Get previously saved preferences from store (string of keys separated by commas)
  const storedPreferences = useUserHealthStore((s) => s.preferences);

  // On component mount, load stored preferences into local state array
  useEffect(() => {
    if (storedPreferences) {
      setSelectedPrefs(storedPreferences.split(","));
    }
  }, []);

  // Toggle selection: if already selected, remove; if not selected, add
  const togglePref = (key: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key) // remove key
        : [...prev, key] // add key
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View style={{ flex: 1 }}>
        {/* Back button positioned at top-left corner */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
        >
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>

        {/* Header with top image and title */}
        <View className="mt-3 items-center justify-center">
          <Image
            source={infoPageLogos.preferences_allergies_top}
            style={{ width: 190, height: 190 }}
            resizeMode="contain"
          />
          <Text className="font-bold text-2xl mt-3">Any Preferences?</Text>
        </View>

        {/* Scrollable list of preference options */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 140 }}
          scrollEventThrottle={16}
        >
          <View className="px-5 pt-2 flex-row flex-wrap justify-between">
            {preferences.map((pref) => {
              // Check if current preference is selected
              const isActive = selectedPrefs.includes(pref.key);

              return (
                <TouchableOpacity
                  key={pref.key}
                  onPress={() => togglePref(pref.key)}
                  // Change background color if active
                  className={`flex-row items-center px-4 py-3 mb-3 rounded-xl w-[48%] ${
                    isActive ? "bg-[#333333]" : "bg-white"
                  }`}
                >
                  {/* Circular white background behind icon */}
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25, // makes circle
                      backgroundColor: "#FFFFFF",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* Preference icon centered inside circle */}
                    <Image
                      source={pref.icon}
                      style={{ width: 70, height: 70 }}
                      resizeMode="center"
                    />
                  </View>

                  {/* Preference label text */}
                  <Text
                    className={`ml-3 pr-10 font-semibold text-base ${
                      isActive ? "text-white font-bold" : "text-gray-800"
                    }`}
                  >
                    {pref.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom area with disclaimer and navigation buttons */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "white",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          {/* Disclaimer text about food service */}
          <Text className="text-xs text-center text-gray-600 underline mb-2">
            Disclaimer: Always double check with the food service before consumption
          </Text>

          {/* Buttons for Skip and Next */}
          <View className="flex-row justify-center space-x-7 mt-2">
            {/* Skip button navigates to next page without saving */}
            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={() => router.push("/(infoPages)/goalPage")}
            >
              <Text className="text-white font-bold text-xl">Skip</Text>
            </TouchableOpacity>

            {/* Next button saves selected preferences and navigates */}
            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={() => {
                setPreferences(selectedPrefs.toString());
                router.push("/(infoPages)/goalPage");
              }}
            >
              <Text className="text-white font-bold text-xl">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
