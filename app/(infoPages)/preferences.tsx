// Importing React and useState for managing local state
import React, { useState } from 'react';

// Importing basic UI components from react-native
import { Image, Text, TouchableOpacity, View } from 'react-native';

// Importing AntDesign icon library for navigation icon (back arrow)
import AntDesign from '@expo/vector-icons/AntDesign';

// Importing router object from expo-router to handle navigation
import { router } from 'expo-router';

// Importing all image/icon assets (make sure they exist in infoPageLogos)
import infoPageLogos from '@/assets/images/infoPageLogos';

// List of food preference options with label, key, and associated icon
const preferences = [
  { label: 'Halal', key: 'halal', icon: infoPageLogos.halal },
  { label: 'Vegetarian', key: 'vegetarian', icon: infoPageLogos.vegetarian },
  { label: 'Vegan', key: 'vegan', icon: infoPageLogos.vegan },
  { label: 'Gluten', key: 'gluten', icon: infoPageLogos.gluten },
  { label: 'No Beef', key: 'no_beef', icon: infoPageLogos.no_beef },
  { label: 'Keto', key: 'keto', icon: infoPageLogos.keto },
];

// Main screen component
export default function PreferencesScreen() {
  // State to hold selected preference keys
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  // Function to toggle preference selection
  const togglePref = (key: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key) // Remove if already selected
        : [...prev, key] // Add if not selected
    );
  };

  return (
    <View className="flex-1 bg-[#FAFAFA] px-5 py-6 pt-10">
      {/* Back navigation arrow (top-left corner) */}
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>

      {/* Header image (represents preferences visually) */}
      <Image
        source={infoPageLogos.preferences_allergies_top} // Replace with correct asset path
        className="w-40 h-40 self-center my-2"
        resizeMode="contain" // Ensures the image scales properly
      />

      {/* Title for the screen */}
      <Text className="text-center text-xl font-bold mb-4">Any Preferences?</Text>

      {/* Container holding all preference buttons in a wrapped 2-column grid */}
      <View className="flex-row flex-wrap justify-between">
        {preferences.map((pref) => {
          // Check if this preference is selected
          const isActive = selectedPrefs.includes(pref.key);

          return (
            // Touchable button for each preference
            <TouchableOpacity
              key={pref.key}
              onPress={() => togglePref(pref.key)}
              className={`flex-row items-center px-4 py-3 mb-3 rounded-xl w-[48%] ${
                isActive ? 'bg-gray-500' : 'bg-white'
              }`} // Highlight with gray background if selected
            >
              {/* Icon inside a (light) circular background */}
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 35, // Slightly more than half for full circle
                  backgroundColor: '#FFFFF', // Looks like a typo: should probably be '#FFFFFF'
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={pref.icon}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain" // Maintain image proportions
                />
              </View>

              {/* Preference label (e.g., "Vegan", "Halal") */}
              <Text
                className={`ml-3 pr-10 font-semibold text-base ${
                  isActive ? 'text-white font-bold' : 'text-gray-800'
                }`} // Text color/style changes if selected
              >
                {pref.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Disclaimer below the selection options */}
      <Text className="text-xs text-center text-gray-500 underline mb-4">
        Disclaimer: Always double check with the food service before consumption
      </Text>

      {/* Navigation buttons at the bottom: Skip and Next */}
      <View className="flex-row justify-between">
        {/* Skip Button - no navigation action yet */}
        <TouchableOpacity className="flex-1 bg-gray-800 py-3 rounded-xl mr-2">
          <Text className="text-white text-center font-bold">Skip</Text>
        </TouchableOpacity>

        {/* Next Button - would typically take user to next screen */}
        <TouchableOpacity className="flex-1 bg-gray-800 py-3 rounded-xl ml-2" onPress={()=>{
            router.push("../(hidden)/settings")
        }}>
          <Text className="text-white text-center font-bold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
