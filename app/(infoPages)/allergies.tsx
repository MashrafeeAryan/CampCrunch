import infoPageLogos from "@/assets/images/infoPageLogos"; // Import allergy images
import { useUserUIStore } from "@/components/zustandStore/UiStore";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore"; // Zustand global store for health data
import AntDesign from "@expo/vector-icons/AntDesign"; // Back arrow icon
import { router } from "expo-router"; // Navigation handler
import React, { useEffect, useState } from "react";
import {
  FlatList,        // Efficient scrolling list
  Image,           // For displaying allergy icons
  ScrollView,      // Allows vertical scrolling
  Text,            // For rendering all text
  TouchableOpacity,// Tappable buttons
  View,            // Layout container
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Keeps UI within device-safe area

// 🥜 List of common allergies with icons and keys
const allergies = [

  { label: "Peanuts", key: "Peanuts", image: infoPageLogos.peanut_allergy },
  { label: "Milk", key: "Milk", image: infoPageLogos.milk_allergy },
  { label: "Fish", key: "Fish", image: infoPageLogos.fish_allergy },
  { label: "Soy", key: "Soy", image: infoPageLogos.soy_allergy },
  { label: "Wheat", key: "Wheat", image: infoPageLogos.wheat_allergy },
  { label: "Eggs", key: "Eggs", image: infoPageLogos.egg_allergy },
  { label: "Sesame", key: "Sesame", image: infoPageLogos.sesame_allergy },
  {
    label: "Tree Nuts",
    key: "Tree_nuts",
    image: infoPageLogos.tree_nuts_allergy,
  },
  {
    label: "Shellfish",
    key: "Shellfish",
    image: infoPageLogos.shellfish_allergy,
  },
];

// 🎯 Main screen component for selecting food allergies
export default function AllergiesScreen() {
  // Local state to track selected allergies (e.g. ["peanuts", "milk"])
  const [selected, setSelected] = useState<string[]>([]);

  // Get function to update allergies in global Zustand store
  const setAllergies = useUserHealthStore((s) => s.setAllergies);

  // Get stored allergies from Zustand to restore previous selections
  const storedAllergies = useUserHealthStore((s) => s.allergies);

  const allergiesUI = useUserUIStore((s)=>s.allergiesUI)
  const setAllergiesUI = useUserUIStore((s)=>s.setAllergiesUI)

  // 🔁 When screen mounts, load any previously saved allergies into local state
  useEffect(() => {
    if (allergiesUI) {
      setSelected(allergiesUI.split(","));
    }
  }, []);

  // Toggle the selected state for a specific allergy
  // This function runs when the user taps on an allergy.
  // If it's already selected, we remove it. If not, we add it.

  const handleAllergieToString = (selectedParam: string) => {
    const allowed = [
      "Peanuts",
      "Milk",
      "Fish",
      "Soy",
      "Wheat",
      "Eggs",
      "Sesame",
      "Tree_nuts",
      "Shellfish",
    ];

    const formattedAllergies = selectedParam
      .split(",") // Split string into array
      .map((s) => s.trim()) // Remove extra spaces
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()) // Capitalize
      .filter((s) => allowed.includes(s)); // Filter allowed values

    // Use the result as needed
    for (let i = 0; i < formattedAllergies.length; i++) {
      if (formattedAllergies[i] == "Tree_nuts") {
        formattedAllergies[i] = "Tree Nuts";
      }
    }
    // Or update Zustand:
    setAllergies(formattedAllergies);
    console.log(formattedAllergies)
  };

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View style={{ flex: 1 }}>
        {/* 🔙 Back button at the top-left corner */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
        >
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>

        {/* 🖼️ Header image and title */}
        <View className="mt-3 items-center justify-center">
          <Image
            source={require("../../assets/images/infoPageLogos/allergies_top.png")}
            style={{ width: 190, height: 190 }}
          />
          <Text className="font-bold text-2xl mt-3">Any Allergies?</Text>
        </View>

        {/* 🧾 Scrollable list of allergy options */}
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} scrollEventThrottle={16}>
          <View className="px-5 pt-2">
            <FlatList
              data={allergies} // Display each allergy from the list
              keyExtractor={(item) => item.key}
              numColumns={2} // Two columns of items
              scrollEnabled={false} // Use outer ScrollView instead
              columnWrapperStyle={{ justifyContent: "space-between" }}
              contentContainerStyle={{ paddingBottom: 10 }}
              renderItem={({ item }) => {
                const isActive = selected.includes(item.key); // Highlight if selected
                return (
                  // 📦 Allergy option box
                  <TouchableOpacity
                    onPress={() => toggle(item.key)} // Toggle selection
                    className={`flex-row items-center px-4 py-3 mb-3 rounded-xl w-[48%] ${
                      isActive ? "bg-[#333333]" : "bg-white"
                    }`}
                  >
                    {/* 🟡 Yellow circle with allergy icon */}
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#FFD500",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={item.image}
                        style={{ width: 80, height: 80 }}
                        resizeMode="contain"
                      />
                    </View>

                    {/* 🏷️ Allergy name text */}
                    <Text
                      className={`ml-3 font-semibold text-base ${
                        isActive ? "text-white font-bold text-l" : "text-gray-800"
                      }`}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>

        {/* 🚀 Bottom navigation section */}
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
          <View style={{ alignItems: "center" }}>
            <Text className="text-center mb-2 text-gray-600 text-base">
              You will be able to update this at any time
            </Text>
          </View>

          {/* 🚦 Skip and Next buttons */}
          <View className="flex-row justify-center space-x-7 mt-2">
            {/* ⏭️ Skip button */}
            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={() => router.push("/(infoPages)/preferences")}
            >
              <Text className="text-white font-bold text-xl">Skip</Text>
            </TouchableOpacity>

            {/* ✅ Next button that saves selection and navigates */}
            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={() => {
                handleAllergieToString(selected.toString());
                setAllergiesUI(selected.toString()); // Save selected allergies
                router.push("/(infoPages)/preferences"); // Navigate forward
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
