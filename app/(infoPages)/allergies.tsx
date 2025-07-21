// We are building a screen that lets users choose their food allergies.

import React, { useState } from "react"; // React helps us build UI. useState lets us remember things on the screen.
import AntDesign from "@expo/vector-icons/AntDesign"; // We are using an arrow icon from the AntDesign icon set.
import { router } from "expo-router"; // Lets us move between different screens in the app.
import {
  FlatList, // A way to show a list of things that scrolls nicely.
  Image, // Shows images.
  Text, // Shows text.
  TouchableOpacity, // A button you can press or touch.
  View, // A container that holds other pieces of UI.
} from "react-native";

import infoPageLogos from "@/assets/images/infoPageLogos"; // This is where we keep all the images for allergies.
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";

// 🥜 List of all common allergies we are showing to the user.
// Each item has a name (label), a unique key, and an image.
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

// This is the main screen component that React Native will display.
export default function AllergiesScreen() {
  // 🧠 We use a state to keep track of which allergies the user has selected.
  const [selected, setSelected] = useState<string[]>([]); // Starts empty

  //Gets the set allergies variable and function
  const setAllergies = useUserHealthStore((s) => s.setAllergies);
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
  };

  const toggle = (key: string) => {
    setSelected(
      (prev) =>
        prev.includes(key)
          ? prev.filter((k) => k !== key) // Remove it if already selected
          : [...prev, key] // Add it to the list if not selected
    );
  };

  return (
    // 🌟 Main container for the whole screen.
    <View className="flex-1 bg-[#FAFAFA] px-5 py-6 pt-10">
      {/* 🔙 A back arrow button to go to the previous screen */}
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>

      {/* 🖼️ An image shown at the top of the screen */}
      <Image
        source={require("../../assets/images/infoPageLogos/allergies_top.png")}
        className="w-40 h-40 self-center mb-2"
        resizeMode="contain"
      />

      {/* 📝 A title asking the user if they have any allergies */}
      <Text className="text-center text-xl font-bold mb-4">Any Allergies?</Text>

      {/* 📋 This will show the list of allergies using 2 columns */}
      <FlatList
        data={allergies} // The list of allergies we defined above
        keyExtractor={(item) => item.key} // Unique key for each item
        numColumns={2} // Display 2 allergies side-by-side
        columnWrapperStyle={{ justifyContent: "space-between" }} // Put space between columns
        contentContainerStyle={{ paddingBottom: 20 }} // Add space at bottom of list
        // 🧩 This function decides how to show each allergy item
        renderItem={({ item }) => {
          const isActive = selected.includes(item.key); // Check if this allergy is selected
          return (
            // 🧲 Pressing this box selects/unselects the allergy
            <TouchableOpacity
              onPress={() => toggle(item.key)} // Toggle this allergy
              className={`flex-row items-center px-4 py-3 mb-3 rounded-xl w-[48%] ${
                isActive ? "bg-gray-500" : "bg-white" // Gray if selected, white if not
              }`}
            >
              {/* 🟡 A small round yellow background behind the allergy icon */}
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25, // Makes it a circle
                  backgroundColor: "#FFD500", // Bright yellow color
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.image} // Show the allergy image
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
              </View>

              {/* 🏷️ Allergy name text next to the image */}
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

      {/* 🚀 Navigation buttons at the bottom */}
      <View className="flex-row justify-between">
        {/* ❌ Skip button */}
        <TouchableOpacity
          className="flex-1 bg-gray-800 py-3 rounded-xl mr-2"
          onPress={() => {
            router.push("/(infoPages)/preferences");
          }}
        >
          <Text className="text-white text-center font-bold">Skip</Text>
        </TouchableOpacity>

        {/* ✅ Next button that takes user to the next page */}
        <TouchableOpacity
          className="flex-1 bg-gray-800 py-3 rounded-xl ml-2"
          onPress={() => {
            handleAllergieToString(selected.toString());
            router.push("/(infoPages)/preferences"); // Go to the goal page
          }}
        >
          <Text className="text-white text-center font-bold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
