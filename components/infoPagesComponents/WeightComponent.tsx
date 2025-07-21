import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import MascotWithDialogue from "../MascotWithDialogue";

/**
 * Helper function to generate a playful/funny message based on an unrealistic or extreme weight value.
 * - This is used to engage users with humor when they input strange or implausible numbers.
 * - It returns null for normal values, meaning no mascot is triggered.
 */
const getFunnyWeightComment = (weight) => {
  const w = parseFloat(weight);
  if (isNaN(w)) return null;

  if (w > 300 && w < 700) {
    return "Are you made of vibranium or just messing with me?";
  } else if (w >= 700 && w < 1000) {
    return "Hulk smash! But even Hulk doesn’t weigh that much.";
  } else if (w >= 1000 && w < 10000) {
    return "Are you trying to log your pet dinosaur’s weight? Let’s keep it human.";
  } else if (w >= 10000 && w < 1000000) {
    return "This app isn’t licensed for celestial object tracking.";
  } else if (w >= 1000000) {
    return "Warning: That much weight may open a wormhole.";
  }

  return null;
};

/**
 * Main WeightComponent used to collect and validate the user's weight input.
 * - Supports both kilograms and pounds, and keeps the values in sync.
 * - Integrates mascot animation for fun feedback when extreme values are entered.
 */
const WeightComponent = ({ showWeightComponent, setShowWeightComponent }) => {
  // Global weight values from Zustand store
  const weight_KG = useUserHealthStore((s) => s.weight_KG);
  const weight_lbs = useUserHealthStore((s) => s.weight_lbs);
  const setWeight_KG = useUserHealthStore((s) => s.setWeight_KG);
  const setWeight_lbs = useUserHealthStore((s) => s.setWeight_lbs);

  // Local state used for the input fields (as strings for TextInput compatibility)
  const [reactStateWeight_KG, setReactStateWeight_KG] = useState("");
  const [reactStateWeight_lbs, setReactStateWeight_lbs] = useState("");

  // On component mount or modal open, sync local input with the stored weight values
  useEffect(() => {
    setReactStateWeight_KG(
      weight_KG !== null && weight_KG !== undefined ? weight_KG.toString() : ""
    );
    setReactStateWeight_lbs(
      weight_lbs !== null && weight_lbs !== undefined
        ? weight_lbs.toString()
        : ""
    );
  }, [weight_KG, weight_lbs, showWeightComponent]);

  /**
   * Handles user input in either kg or lbs field.
   * - Automatically updates the other unit using conversion.
   * - Clears both if the input is invalid.
   */
  const handleWeightInput = (value, unit) => {
    if (unit === "KG") {
      setReactStateWeight_KG(value);
      if (value === "" || isNaN(Number(value))) {
        setReactStateWeight_lbs("");
      } else {
        const parsedValue = parseFloat(value);
        setReactStateWeight_lbs((parsedValue * 2.20462).toFixed(2));
      }
    } else {
      setReactStateWeight_lbs(value);
      if (value === "" || isNaN(Number(value))) {
        setReactStateWeight_KG("");
      } else {
        const parsedValue = parseFloat(value);
        setReactStateWeight_KG((parsedValue / 2.20462).toFixed(2));
      }
    }
  };

  /**
   * Finalizes the values and stores them in the global state.
   * - If either field is empty, null is stored instead.
   */
  const handleFloatValues = () => {
    if (reactStateWeight_KG === "" || reactStateWeight_lbs === "") {
      setWeight_KG(null);
      setWeight_lbs(null);
    } else {
      setWeight_KG(parseFloat(reactStateWeight_KG));
      setWeight_lbs(parseFloat(reactStateWeight_lbs));
    }
  };

  // Local state for managing mascot appearance and message
  const [funnyMessage, setFunnyMessage] = React.useState(null);
  const [showMascot, setShowMascot] = React.useState(false);

  return (
    <Modal
      visible={showWeightComponent}
      transparent={true}
      animationType="slide"
    >
      {/* Entire screen dismisses modal when touched (outside content) */}
      <TouchableWithoutFeedback
        onPress={() => {
          // handleFloatValues();              // Save the inputs before closing
          setShowWeightComponent(false);    // Close modal
        }}
      >
        {/* Background blur for focus effect */}
        <BlurView
          intensity={140}
          tint="dark"
          className="flex-1 items-center justify-center"
        >
          {/* Prevent touches inside modal box from dismissing */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View>
              {/* Mascot only shows if a funny message is triggered */}
              {showMascot && (
                <MascotWithDialogue
                  message={funnyMessage}
                  onClose={() => setShowMascot(false)}
                />
              )}

              {/* Main Input Box UI */}
              <View className="w-72 h-[300] bg-[#DDDDDD] rounded-xl items-center p-4">
                <Image
                  source={infoPageLogos.weightScaleLogo}
                  style={{ width: 80, height: 80 }}
                />
                <Text className="font-bold text-2xl">Weight</Text>

                {/* Input Section with synced KG/LBS fields */}
                <View className="bg-white w-full h-15 mt-2 rounded-xl flex-row p-3 items-center space-x-1">
                  {/* KG Input Field */}
                  <View className="flex-row items-center space-x-2">
                    <TextInput
                      className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                      keyboardType="numeric"
                      onChangeText={(value) => handleWeightInput(value, "KG")}
                      value={reactStateWeight_KG}
                    />
                    <Text className="font-bold text-lg">kg</Text>
                    {/* Divider between inputs */}
                    <View className="bg-black w-1 h-8 rounded-full mx-3" />
                  </View>

                  {/* LBS Input Field */}
                  <View className="flex-row items-center space-x-2">
                    <TextInput
                      className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                      keyboardType="numeric"
                      onChangeText={(value) => handleWeightInput(value, "lbs")}
                      value={reactStateWeight_lbs}
                    />
                    <Text className="font-bold text-lg">lbs</Text>
                  </View>
                </View>

                {/* Continue Button: validates input, shows mascot or saves data */}
                <View className="items-center mt-5 w-full">
                  <TouchableOpacity
                    className="bg-black w-full h-[50] items-center justify-center rounded-xl"
                    onPress={() => {
                      const funnyComment = getFunnyWeightComment(reactStateWeight_KG);

                      if (funnyComment) {
                        // Trigger mascot if unrealistic weight is detected
                        setFunnyMessage(funnyComment);
                        setShowMascot(true);
                      } else {
                        // Otherwise, store values and close modal
                        handleFloatValues();
                        setShowWeightComponent(false);
                      }
                    }}
                  >
                    <Text className="text-white font-bold text-xl">Continue</Text>
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

export default WeightComponent;
