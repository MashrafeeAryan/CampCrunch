import { View, Text, Modal, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";  // Import Zustand Store

const HeightComponent = ({
  showHeightComponent,
  setShowHeightComponent,
}) => {
  // Access the global state from Zustand store
  const setHeightInches = useUserHealthStore((s) => s.setHeightInches);
  const setHeightCM = useUserHealthStore((s) => s.setHeightCM);
  const heightInches = useUserHealthStore((s) => s.heightInches);
  const heightCM = useUserHealthStore((s) => s.heightCM);

  // Local state for the input values, initialize empty if global state null/undefined
  const [reactStateHeight_CM, setReactStateHeight_CM] = useState("");
  const [reactStateHeight_Inches, setReactStateHeight_Inches] = useState("");

  // Sync local state when modal opens or global state changes
  useEffect(() => {
    setReactStateHeight_CM(
      heightCM !== null && heightCM !== undefined ? heightCM.toString() : ""
    );
    setReactStateHeight_Inches(
      heightInches !== null && heightInches !== undefined ? heightInches.toString() : ""
    );
  }, [heightCM, heightInches, showHeightComponent]);

  const handleHeightInput = (value, unit: string) => {
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

  const handleContinueButtonHeight = () => {
    // Save null if either field is empty, else save parsed float values
    if (reactStateHeight_CM === "" || reactStateHeight_Inches === "") {
      setHeightCM(null);
      setHeightInches(null);
    } else {
      setHeightCM(parseFloat(reactStateHeight_CM));
      setHeightInches(parseFloat(reactStateHeight_Inches));
    }
  };

  return (
    <Modal
      visible={showHeightComponent}
      transparent={true}
      animationType="slide"
    >
      <BlurView
        intensity={60}
        tint="dark"
        className="flex-1 items-center justify-center"
      >
        <View className="w-75 h-[300] bg-[#DDDDDD] rounded-xl items-center p-4">
          <Image
            source={infoPageLogos.HeightScaleLogo}
            style={{ width: 80, height: 80 }}
          />
          <Text className="font-bold text-2xl">Height</Text>
          <View className="bg-white w-full h-15 mt-2 rounded-xl flex-row p-3 items-center space-x-1">
            {/* Left side: inches */}
            <View className="flex-row items-center space-x-2">
              <TextInput
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                keyboardType="numeric"
                onChangeText={(value) => {
                  handleHeightInput(value, "inch");
                }}
                value={reactStateHeight_Inches}
              />
              <Text className="font-bold text-lg">inch</Text>
              <View className="bg-black w-1 h-8 rounded-full mx-3" />
            </View>

            {/* Right side: cm */}
            <View className="flex-row items-center space-x-2">
              <TextInput
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                keyboardType="numeric"
                onChangeText={(value) => {
                  handleHeightInput(value, "cm");
                }}
                value={reactStateHeight_CM}
              />
              <Text className="font-bold text-lg">cm</Text>
            </View>
          </View>
          <View className="items-center mt-5 w-72">
            <TouchableOpacity
              className="bg-black w-full h-[50] items-center justify-center rounded-xl"
              onPress={() => {
                handleContinueButtonHeight();  // Save height values to global state
                setShowHeightComponent(false);
              }}
            >
              <Text className="text-white font-bold text-xl">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default HeightComponent;
