import React, { useState, useEffect } from "react";
import { View, Text, Modal, Image, TextInput, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore"; // Import Zustand store

const WeightComponent = ({
  showWeightComponent,
  setShowWeightComponent,
}) => {
  // Zustand store state and setters
  const weight_KG = useUserHealthStore((s) => s.weight_KG);
  const weight_lbs = useUserHealthStore((s) => s.weight_lbs);
  const setWeight_KG = useUserHealthStore((s) => s.setWeight_KG);
  const setWeight_lbs = useUserHealthStore((s) => s.setWeight_lbs);

  // Local state for the weight inputs, initialize as empty strings if no value in store
  const [reactStateWeight_KG, setReactStateWeight_KG] = useState("");
  const [reactStateWeight_lbs, setReactStateWeight_lbs] = useState("");

  // Sync Zustand state with local state when component mounts or updates or modal opens
  useEffect(() => {
    setReactStateWeight_KG(
      weight_KG !== null && weight_KG !== undefined ? weight_KG.toString() : ""
    );
    setReactStateWeight_lbs(
      weight_lbs !== null && weight_lbs !== undefined ? weight_lbs.toString() : ""
    );
  }, [weight_KG, weight_lbs, showWeightComponent]);

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

  const handleFloatValues = () => {
    if (reactStateWeight_KG === "" || reactStateWeight_lbs === "") {
      setWeight_KG(null);
      setWeight_lbs(null);
    } else {
      setWeight_KG(parseFloat(reactStateWeight_KG));
      setWeight_lbs(parseFloat(reactStateWeight_lbs));
    }
  };

  return (
    <Modal visible={showWeightComponent} transparent={true} animationType="slide">
      <BlurView intensity={60} tint="dark" className="flex-1 items-center justify-center">
        <View className="w-72 h-[300] bg-[#DDDDDD] rounded-xl items-center p-4">
          <Image source={infoPageLogos.weightScaleLogo} style={{ width: 80, height: 80 }} />
          <Text className="font-bold text-2xl">Weight</Text>
          <View className="bg-white w-full h-15 mt-2 rounded-xl flex-row p-3 items-center space-x-1">
            {/* Left side: kg */}
            <View className="flex-row items-center space-x-2">
              <TextInput
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                keyboardType="numeric"
                onChangeText={(value) => handleWeightInput(value, "KG")}
                value={reactStateWeight_KG}
              />
              <Text className="font-bold text-lg">kg</Text>
              <View className="bg-black w-1 h-8 rounded-full mx-3" />
            </View>

            {/* Right side: lbs */}
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
          <View className="items-center mt-5 w-full">
            <TouchableOpacity
              className="bg-black w-full h-[50] items-center justify-center rounded-xl"
              onPress={() => {
                handleFloatValues();
                setShowWeightComponent(false);
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

export default WeightComponent;
