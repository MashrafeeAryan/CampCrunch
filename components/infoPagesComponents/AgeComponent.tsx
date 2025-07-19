import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore"; // Import Zustand store

const AgeComponent = ({ showAgeComponent, setShowAgeComponent }) => {
  // Access the global state from Zustand
  const ageYears = useUserHealthStore((s) => s.ageYears);
  const setAgeYears = useUserHealthStore((s) => s.setAgeYears);

  // Local state for the input value
  const [reactStateAge, setReactStateAge] = useState(""); // Start with an empty string

  // Use useEffect to handle the case where the initial value might be NaN or undefined
  useEffect(() => {
    // If there's a value in ageYears, set the input to that value
    if (ageYears === null || ageYears === undefined || isNaN(ageYears)) {
      setReactStateAge(""); // Keep empty if no valid value
    } else {
      setReactStateAge(ageYears.toString()); // Convert number to string for the input
    }
  }, [ageYears]); // Run this when ageYears changes

  const handleAgeInput = (value) => {
    setReactStateAge(value);
    // Optionally, you can add extra checks here to ensure the value is a valid number, etc.
  };

  const handleContinueButtonAge = () => {
    // If input is empty, we don't update the store and just close the modal
    if (reactStateAge === "") {
      setAgeYears(null); // Set it to null (or leave it as null in Zustand to indicate no value)
      setShowAgeComponent(false);
    } else if (!isNaN(reactStateAge) && parseFloat(reactStateAge) > 0) {
      // If valid number is entered, update Zustand
      const floatAge = parseFloat(reactStateAge);
      setAgeYears(floatAge);
      setShowAgeComponent(false); // Close the modal after setting the value
    } else {
      // Optionally, show a message if input is invalid (e.g., if it's a non-number or negative)
      alert("Please enter a valid age.");
    }
  };

  return (
    <Modal visible={showAgeComponent} transparent={true} animationType="slide">
      <BlurView intensity={60} tint="dark" className="flex-1 items-center justify-center">
        <View className="w-72 h-[300] bg-[#DDDDDD] rounded-xl items-center p-4">
          <Image source={infoPageLogos.ageLogo} style={{ width: 80, height: 80 }} />
          <Text className="font-bold text-2xl">Age</Text>
          <View className="bg-white w-full h-15 mt-2 rounded-xl flex-row p-3 items-center space-x-1 justify-center">
            {/* Age input */}
            <View className="flex-row items-center space-x-2">
              <TextInput
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                value={reactStateAge} // If empty, it stays empty
                keyboardType="numeric"
                onChangeText={handleAgeInput}
              />
              <Text className="font-bold text-lg">years old</Text>
            </View>
          </View>
          <View className="items-center mt-5 w-full">
            <TouchableOpacity
              className="bg-black w-full h-[50] items-center justify-center rounded-xl"
              onPress={handleContinueButtonAge} // Call the function when continue is pressed
            >
              <Text className="text-white font-bold text-xl">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default AgeComponent;
