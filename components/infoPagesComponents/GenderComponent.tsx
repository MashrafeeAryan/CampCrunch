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

const GenderComponent = ({
  showGenderComponent,
  setShowGenderComponent,
  setGender,
}) => {
  const handleGenderInput = (genderType: string) => {
    setGender(genderType);
  };
  return (
    <Modal
      visible={showGenderComponent}
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
            source={infoPageLogos.genderLogo}
            style={{ width: 80, height: 80 }}
          />
          <Text className="font-bold text-2xl">Gender</Text>
          <View className="bg-white w-full h-15 mt-2 rounded-xl flex-row p-3 items-center space-x-3">
            {/* Left side: lbs */}
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl items-center"
                onPress={() => {
                  handleGenderInput("Male");
                }}
              >
                <Text className="font-bold text-lg">Male</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity
                className="bg-[#DDDDDD] p-2 w-[80] rounded-xl items-center"
                onPress={() => {
                  handleGenderInput("Female");
                }}
              >
                <Text className="font-bold text-lg">Female</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl items-center"
                onPress={() => {
                  handleGenderInput("Other");
                }}
              >
                <Text className="font-bold text-lg">Other</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="items-center mt-5 w-72">
            <TouchableOpacity
              className="bg-black w-full h-[50] items-center justify-center rounded-xl"
              onPress={() => {
                setShowGenderComponent(false);
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

export default GenderComponent;
