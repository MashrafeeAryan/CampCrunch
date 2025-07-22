// Importing necessary components and hooks for the HeightComponent
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import MascotWithDialogue from "@/components/MascotWithDialogue";

// --------------------------------------------
// 📦 Helper Function: getFunnyHeightComment
// --------------------------------------------
// Based on the height value input in CM, this function returns a playful/funny
// message if the value is unrealistically high.
// If the value is reasonable, it returns null, and no mascot is triggered.
const getFunnyHeightComment = (height) => {
  const h = parseFloat(height);
  if (isNaN(h)) return null;

  if (h > 300 && h <= 400) {
    return "Even basketball rims would look up to you. Literally.";
  } else if (h > 400 && h <= 1000) {
    return "Are you auditioning for the Attack on Titan Live Action?";
  } else if (h > 1000) {
    return "You're not a person — you're a monument!";
  }

  return null;
};

// --------------------------------------------
// 📦 Main Component: HeightComponent
// --------------------------------------------
// This modal allows users to input their height in either CM or Inches.
// Values are kept in sync and stored in a Zustand global state.
// If input height is very unusual, a mascot appears with a joke.
// --------------------------------------------
const HeightComponent = ({ showHeightComponent, setShowHeightComponent }) => {
  // Zustand store functions and values
  const setHeightInches = useUserHealthStore((s) => s.setHeightInches);
  const setHeightCM = useUserHealthStore((s) => s.setHeightCM);
  const heightInches = useUserHealthStore((s) => s.heightInches);
  const heightCM = useUserHealthStore((s) => s.heightCM);

  // Local state for user input (stored as string for TextInput compatibility)
  const [reactStateHeight_CM, setReactStateHeight_CM] = useState("");
  const [reactStateHeight_Inches, setReactStateHeight_Inches] = useState("");

  // --------------------------------------------
  // 🧠 useEffect: Sync modal state on open
  // --------------------------------------------
  // When the modal is shown (or store updates), reflect the stored global height values
  useEffect(() => {
    setReactStateHeight_CM(
      heightCM !== null && heightCM !== undefined ? heightCM.toString() : ""
    );
    setReactStateHeight_Inches(
      heightInches !== null && heightInches !== undefined
        ? heightInches.toString()
        : ""
    );
  }, [heightCM, heightInches, showHeightComponent]);

  // --------------------------------------------
  // 🔄 handleHeightInput
  // --------------------------------------------
  // Updates the local state for the selected unit.
  // Automatically converts to the other unit (inch <-> cm).
  const handleHeightInput = (value, unit) => {
    if (unit === "cm") {
      setReactStateHeight_CM(value);
      if (value === "" || isNaN(Number(value))) {
        setReactStateHeight_Inches("");
      } else {
        const inch = parseFloat(value) / 2.54;
        setReactStateHeight_Inches(inch.toFixed(2));
      }
    } else {
      setReactStateHeight_Inches(value);
      if (value === "" || isNaN(Number(value))) {
        setReactStateHeight_CM("");
      } else {
        const cm = parseFloat(value) * 2.54;
        setReactStateHeight_CM(cm.toFixed(2));
      }
    }
  };

  // --------------------------------------------
  // 📝 handleFloatValues
  // --------------------------------------------
  // Converts and stores valid numeric input into Zustand store.
  // If inputs are empty, resets stored values to null.
  const handleFloatValues = () => {
    if (reactStateHeight_CM === "" || reactStateHeight_Inches === "") {
      setReactStateHeight_CM(null);
      setReactStateHeight_Inches(null);
    } else {
      setHeightCM(parseFloat(reactStateHeight_CM));
      setHeightInches(parseFloat(reactStateHeight_Inches));
    }
  };

  // Local state to handle mascot interaction
  const [funnyMessage, setFunnyMessage] = React.useState(null);
  const [showMascot, setShowMascot] = React.useState(false);

  return (
    <Modal
      visible={showHeightComponent}
      transparent={true}
      animationType="slide"
    >
      {/* Outer touch handler — tap outside modal to close */}
      <TouchableWithoutFeedback
        onPress={() => {
          // handleFloatValues();
          setShowHeightComponent(false);
        }}
      >
        {/* Blurred dark background */}
        <BlurView
          intensity={140}
          tint="dark"
          className="flex-1 items-center justify-center"
        >
          {/* Inner content click area — prevents modal from closing */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View>
              {/* Conditional render: Funny mascot with animated dialogue */}
              {showMascot && (
                <MascotWithDialogue
                  message={funnyMessage}
                  onClose={() => setShowMascot(false)}
                />
              )}

              {/* Modal Box UI */}
              <View className="w-75 h-[300] bg-[#DDDDDD] rounded-xl items-center p-4">
                {/* Logo and title */}
                <Image
                  source={infoPageLogos.HeightScaleLogo}
                  style={{ width: 80, height: 80 }}
                />
                <Text className="font-bold text-2xl">Height</Text>

                {/* Input Row for height (inches and cm) */}
                <View className="bg-white w-full h-15 mt-2 rounded-xl flex-row p-3 items-center space-x-1">
                  {/* Inches input */}
                  <View className="flex-row items-center space-x-2">
                    <TextInput
                      className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                      keyboardType="numeric"
                      onChangeText={(value) => handleHeightInput(value, "inch")}
                      value={reactStateHeight_Inches}
                    />
                    <Text className="font-bold text-lg">inch</Text>
                    {/* Divider */}
                    <View className="bg-black w-1 h-8 rounded-full mx-3" />
                  </View>

                  {/* Centimeters input */}
                  <View className="flex-row items-center space-x-2">
                    <TextInput
                      className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                      keyboardType="numeric"
                      onChangeText={(value) => handleHeightInput(value, "cm")}
                      value={reactStateHeight_CM}
                    />
                    <Text className="font-bold text-lg">cm</Text>
                  </View>
                </View>

                {/* Continue button logic */}
                <View className="items-center mt-5 w-72">
                  <TouchableOpacity
                    className="bg-black w-full h-[50] items-center justify-center rounded-xl"
                    onPress={() => {
                      const funnyComment = getFunnyHeightComment(reactStateHeight_CM);

                      if (funnyComment) {
                        // If height is very unusual, show the mascot instead of submitting
                        setFunnyMessage(funnyComment);
                        setShowMascot(true);
                      } else {
                        // Normal case: save values and close modal
                        handleFloatValues();
                        setShowHeightComponent(false);
                      }
                    }}
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

export default HeightComponent;
