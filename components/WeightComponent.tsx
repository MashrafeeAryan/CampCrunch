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
const WeightComponent = ({
  showWeightComponent,
  setShowWeightComponent,
  setWeight_KG,
  setWeight_lbs,
  weight_KG, 
  weight_lbs
}) => {


  const handleWeightInput = (value, unit: string) => {
    if (unit == "KG"){
      setWeight_KG(value)
      const lbs = value * 2.20462
      setWeight_lbs(lbs.toFixed(2))
    } 
    else{
      setWeight_lbs(value)
      const kg = value/2.20462
      setWeight_KG(kg.toFixed(2))
    }

  }
  return (
    <Modal
      visible={showWeightComponent}
      transparent={true}
      animationType="slide"
    >
      <BlurView
        intensity={60}
        tint="dark"
        className="flex-1 items-center justify-center"
      >
        <View className="w-72 h-[300] bg-[#DDDDDD] rounded-xl items-center p-4">
          <Image
            source={infoPageLogos.weightScaleLogo}
            style={{ width: 80, height: 80 }}
          />
          <Text className="font-bold text-2xl">Weight</Text>
          <View className="bg-white w-full h-15 mt-2 rounded-xl flex-row p-3 items-center space-x-1">
            {/* Left side: lbs */}
            <View className="flex-row items-center space-x-2">
              <TextInput
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                keyboardType="numeric"
                onChangeText={(value)=>{handleWeightInput(value, "KG")}}
                value={weight_KG.toString()}
/>
              <Text className="font-bold text-lg">lbs</Text>
              <View className="bg-black w-1 h-8 rounded-full mx-3" />
            </View>

            <View className="flex-row items-center space-x-2">
              <TextInput
                className="bg-[#DDDDDD] p-2 w-[70] rounded-xl"
                keyboardType="numeric"
                onChangeText={(value)=>{handleWeightInput(value, "lbs")}}
                value={weight_lbs.toString()}
              />
              <Text className="font-bold text-lg">kg</Text>
            </View>
          </View>
          <View className="items-cente mt-5 w-full">
            <TouchableOpacity
              className="bg-black w-full h-[50] items-center justify-center rounded-xl"
              onPress={() => {
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
