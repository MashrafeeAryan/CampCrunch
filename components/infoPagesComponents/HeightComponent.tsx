import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import infoPageLogos from "@/assets/images/infoPageLogos";

const HeightComponent = ({
  showHeightComponent,
  setShowHeightComponent,
  setHeightInches,
  setHeightCM,
  heightInches,
  heightCM,
}) => {
  const [reactStateHeight_CM, setReactStateHeight_CM] = useState("0");
  const [reactStateHeight_Inches, setReactStateHeight_Inches] = useState("0");
  const handleHeightInput = (value, unit: string) => {
    if (unit == "cm") {
      setReactStateHeight_CM(value);
      const inch = value / 2.54;
      setReactStateHeight_Inches(inch.toFixed(2));
    } else {
      setReactStateHeight_Inches(value);
      const cm = value * 2.54;
      setReactStateHeight_CM(cm.toFixed(2));
    }
  };
  const handleContinueButtonHeight = () => {
    if (reactStateHeight_CM !== "" && reactStateHeight_Inches !== "") {
      const floatHeight_CM = parseFloat(reactStateHeight_CM);
      const floatHeight_Inches = parseFloat(reactStateHeight_Inches);

      setHeightCM(floatHeight_CM);
      setHeightInches(floatHeight_Inches);
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
            {/* Left side: lbs */}
            <View className="flex-row items-center space-x-2">
              <TextInput
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                keyboardType="numeric"
                onChangeText={(value) => {
                  handleHeightInput(value, "inch");
                }}
                value={reactStateHeight_Inches.toString()}
              />
              <Text className="font-bold text-lg">inch</Text>
              <View className="bg-black w-1 h-8 rounded-full mx-3" />
            </View>

            <View className="flex-row items-center space-x-2">
              <TextInput
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                keyboardType="numeric"
                onChangeText={(value) => {
                  handleHeightInput(value, "cm");
                }}
                value={reactStateHeight_CM.toString()}
              />
              <Text className="font-bold text-lg">cm</Text>
            </View>
          </View>
          <View className="items-center mt-5 w-72">
            <TouchableOpacity
              className="bg-black w-full h-[50] items-center justify-center rounded-xl"
              onPress={() => {
                setShowHeightComponent(false);
                handleContinueButtonHeight();
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
