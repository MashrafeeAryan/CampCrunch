import { View, Text, Modal, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import infoPageLogos from "@/assets/images/infoPageLogos";

const AgeComponent = ({showAgeComponent, setShowAgeComponent, ageYears, setAgeYears}) => {
  const handleAgeInput = (value:string) => {
    setAgeYears(value)
  }
  return (
    <Modal visible={showAgeComponent} 
    transparent={true}
    animationType = "slide"
>
      <BlurView
        intensity={60}
        tint="dark"
        className="flex-1 items-center justify-center"
      >
        <View className="w-72 h-[300] bg-[#DDDDDD] rounded-xl items-center p-4">
          <Image
            source={infoPageLogos.ageLogo}
            style={{ width: 80, height: 80 }}
          />
          <Text className="font-bold text-2xl">Age</Text>
          <View className="bg-white w-full h-15 mt-2 rounded-xl flex-row p-3 items-center space-x-1 justify-center">
            {/* Left side: lbs */}
            <View className="flex-row items-center space-x-2">
              <TextInput className="bg-[#DDDDDD] p-2 w-[70] rounded-xl" 
              value={ageYears.toString()}
              keyboardType="numeric"
              onChangeText={(value)=>{handleAgeInput(value)}}
              />
              <Text className="font-bold text-lg">years old</Text>
            </View>

         
          </View>
             <View className="items-center mt-5 w-full">
                        <TouchableOpacity className="bg-black w-full h-[50] items-center justify-center rounded-xl"
                        onPress={()=>{setShowAgeComponent(false)}}>
                          <Text className="text-white font-bold text-xl">Continue</Text>
                        </TouchableOpacity>
            </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default AgeComponent;
