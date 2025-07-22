import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur"; // For background blur effect
import infoPageLogos from "@/assets/images/infoPageLogos"; // Icon assets
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore"; // Zustand global state
import MascotWithDialogue from "@/components/MascotWithDialogue"; // Fun mascot component with dialogue

// 🎭 Funny age message generator — based on unrealistic inputs
const getFunnyAgeComment = (age) => {
  const a = parseFloat(age); // Ensure it's a number
  if (isNaN(a) || a < 0) return null; // Ignore invalid ages

  if (a > 123 && a <= 300) {
    return "You're past human record — are you a vampire or just aging backwards?";
  } else if (a > 300 && a <= 700) {
    return "Ah, the medieval era — plagues, castles, and probably a pet dragon.";
  } else if (a > 700 && a <= 2000) {
    return "Did you debate philosophy with the Romans or just survive the Dark Ages?";
  } else if (a > 2000 && a <= 300000) {
    return "You're prehistoric. Fire? Spears? Cave art? You tell me.";
  } else if (a > 300000) {
    return "A dinosaur, huh? Just waiting for the asteroid again?";
  }

  return null; // No joke — age is realistic
};

const AgeComponent = ({ showAgeComponent, setShowAgeComponent }) => {
  // ✅ Access global state from Zustand
  const ageYears = useUserHealthStore((s) => s.ageYears); // Current value
  const setAgeYears = useUserHealthStore((s) => s.setAgeYears); // Setter

  // ✅ Local state for controlled input field
  const [reactStateAge, setReactStateAge] = useState("");

  // ✅ State for mascot dialogue logic
  const [funnyMessage, setFunnyMessage] = useState(null);
  const [showMascot, setShowMascot] = useState(false);

  // ✅ Sync Zustand -> local state when modal opens
  useEffect(() => {
    if (ageYears === null || isNaN(ageYears)) {
      setReactStateAge(""); // Empty input if no valid age in store
    } else {
      setReactStateAge(ageYears.toString()); // Set input to string version of number
    }
  }, [ageYears, showAgeComponent]);

  // ✅ Called when user types a number
  const handleAgeInput = (value) => {
    setReactStateAge(value); // Live update of input field
  };

  // ✅ Logic to validate age and optionally show mascot
  const handleContinueButtonAge = () => {
    const ageNum = parseFloat(reactStateAge); // Convert to number
    const funnyComment = getFunnyAgeComment(ageNum); // Check for joke-worthy age

    if (reactStateAge === "") {
      // Empty input: clear global state
      setAgeYears(null);
      setShowAgeComponent(false);
    } else if (!isNaN(ageNum) && ageNum > 0 && ageNum <= 123) {
      // Valid age: save to Zustand and close
      setAgeYears(ageNum);
      setShowAgeComponent(false);
    } else if (funnyComment) {
      // Unrealistic but still a number: show joke via mascot
      setFunnyMessage(funnyComment); // ✅ Fix: pass the actual joke
      setShowMascot(true); // 🧸 Trigger mascot popup
    } else {
      // Invalid or out of range
      alert("Please enter a valid age.");
    }
  };

  return (
    <Modal visible={showAgeComponent} transparent animationType="slide">
      {/* OUTER WRAPPER: Tap outside to dismiss and save */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); // Hide keyboard
          handleContinueButtonAge(); // Save logic
          setShowAgeComponent(false); // Close modal
        }}
      >
        {/* BACKGROUND BLUR */}
        <BlurView
          intensity={140}
          tint="dark"
          className="flex-1 items-center justify-center"
        >
          {/* INNER WRAPPER: Prevent tap from closing modal */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View>
              {/* MASCOT POP-UP (if joke is triggered) */}
              {showMascot && (
                <MascotWithDialogue
                  message={funnyMessage}
                  onClose={() => setShowMascot(false)} // Close the mascot manually
                />
              )}
              {/* MODAL CONTENT BOX */}
              <View className="w-72 h-[300] bg-[#DDDDDD] rounded-xl items-center p-4">
                {/* Icon and title */}
                <Image
                  source={infoPageLogos.ageLogo}
                  style={{ width: 80, height: 80 }}
                />
                <Text className="font-bold text-2xl">Age</Text>

                {/* Input field */}
                <View className="bg-white w-full h-15 mt-2 rounded-xl flex-row p-3 items-center justify-center">
                  <TextInput
                    className="bg-[#DDDDDD] p-2 w-[70] rounded-xl text-center"
                    value={reactStateAge} // Controlled input
                    keyboardType="numeric"
                    onChangeText={handleAgeInput}
                    placeholder="0"
                    placeholderTextColor="#888"
                  />
                  <Text className="font-bold text-lg ml-2">years old</Text>
                </View>

                {/* Continue button */}
                <View className="items-center mt-5 w-full">
                  <TouchableOpacity
                    className="bg-black w-full h-[50] items-center justify-center rounded-xl"
                    onPress={handleContinueButtonAge} // Save age and handle mascot
                  >
                    <Text className="text-white font-bold text-xl">
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AgeComponent;
