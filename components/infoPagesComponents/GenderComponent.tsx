import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur"; // Provides blurred background for modals
import infoPageLogos from "@/assets/images/infoPageLogos"; // Contains icon assets
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore"; // Zustand global store for user data

// Main modal component for selecting gender
const GenderComponent = ({ showGenderComponent, setShowGenderComponent }) => {
  // ✅ Access gender value and setter function from Zustand state
  const gender = useUserHealthStore((state) => state.gender); // current gender value
  const setGender = useUserHealthStore((state) => state.setGender); // function to update gender

  // ✅ Handler function when a gender button is selected
  const handleGenderInput = (genderType) => {
    setGender(genderType); // Save gender to Zustand global state
  };

  return (
    <Modal visible={showGenderComponent} transparent animationType="slide">
      {/* OUTER TouchableWithoutFeedback:
          Allows tapping anywhere outside the modal content to dismiss modal */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); // Close keyboard if it's open
          setShowGenderComponent(false); // Close the gender modal
        }}
      >
        {/* Blurred dark background overlay */}
        <BlurView
          intensity={140}
          tint="dark"
          className="flex-1 items-center justify-center"
        >
          {/* INNER TouchableWithoutFeedback:
              Prevents tap events from bubbling up and dismissing the modal when tapping inside */}
          <TouchableWithoutFeedback onPress={() => {}}>
            {/* Modal content container */}
            <View className="w-75 h-[300] bg-[#DDDDDD] rounded-xl items-center p-4">
              
              {/* Icon + title */}
              <Image
                source={infoPageLogos.genderLogo}
                style={{ width: 80, height: 80 }}
              />
              <Text className="font-bold text-2xl mb-4">Gender</Text>

              {/* ----------------------------- */}
              {/* Gender Option Buttons Section */}
              {/* ----------------------------- */}
              <View className="bg-white w-full h-15 rounded-xl flex-row p-3 items-center justify-center space-x-3">
                
                {/* MALE Option */}
                <TouchableOpacity
                  className={`p-2 w-[70] rounded-xl items-center ${
                    gender === "Male" ? "bg-[#333333]" : "bg-[#DDDDDD]"
                  }`}
                  onPress={() => handleGenderInput("Male")} // Update gender to "Male"
                >
                  <Text
                    className={`font-bold text-lg ${
                      gender === "Male" ? "text-white" : "text-black"
                    }`}
                  >
                    Male
                  </Text>
                </TouchableOpacity>

                {/* FEMALE Option */}
                <TouchableOpacity
                  className={`p-2 w-[80] rounded-xl items-center ${
                    gender === "Female" ? "bg-[#333333]" : "bg-[#DDDDDD]"
                  }`}
                  onPress={() => handleGenderInput("Female")} // Update gender to "Female"
                >
                  <Text
                    className={`font-bold text-lg ${
                      gender === "Female" ? "text-white" : "text-black"
                    }`}
                  >
                    Female
                  </Text>
                </TouchableOpacity>

                {/* OTHER Option */}
                <TouchableOpacity
                  className={`p-2 w-[70] rounded-xl items-center ${
                    gender === "Other" ? "bg-[#333333]" : "bg-[#DDDDDD]"
                  }`}
                  onPress={() => handleGenderInput("Other")} // Update gender to "Other"
                >
                  <Text
                    className={`font-bold text-lg ${
                      gender === "Other" ? "text-white" : "text-black"
                    }`}
                  >
                    Other
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ------------------------ */}
              {/* Continue Button Section */}
              {/* ------------------------ */}
              <View className="items-center mt-5 w-72">
                <TouchableOpacity
                  className="bg-black w-full h-[50] items-center justify-center rounded-xl"
                  onPress={() => {
                    setShowGenderComponent(false); // Close the modal when user taps Continue
                  }}
                >
                  <Text className="text-white font-bold text-xl">Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GenderComponent;
