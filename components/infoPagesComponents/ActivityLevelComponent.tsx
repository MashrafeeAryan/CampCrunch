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

const ActivityLevelComponent = ({
  showActivityLevelComponent,
  setShowActivityLevelComponent,
  setActivityLevel
}) => {
  const handleActivityLevelInput = (workoutType: string) => {
    setActivityLevel(workoutType)
  }
  return (
    <Modal
      visible={showActivityLevelComponent}
      transparent={true}
      animationType="slide"
    >
      <BlurView
        intensity={60}
        tint="dark"
        className="flex-1 items-center justify-center"
      >
        <View className="w-75 bg-[#DDDDDD] rounded-xl items-center p-4">
          <Image
            source={infoPageLogos.actvityLogo}
            style={{ width: 80, height: 80 }}
          />
          <Text className="font-bold text-2xl">Activity Level</Text>
          <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
            onPress={() => { handleActivityLevelInput("sedentary") }}
          >
            <Image
              source={infoPageLogos.activityLevelImage2}
              style={{ width: 40, height: 50 }}
            />
            <Text className="text-xl font-bold">Little to no exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
            onPress={() => { handleActivityLevelInput("light") }}
          >
            <Image
              source={infoPageLogos.activityLevelImage2}
              style={{ width: 40, height: 50 }}
            />
            <Text className="text-xl font-bold">Once or Twice a Week</Text>
          </TouchableOpacity>


          <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
            onPress={() => { handleActivityLevelInput("moderate") }}

          >
            <Image
              source={infoPageLogos.activityLevelImage1}
              style={{ width: 70, height: 50 }}
            />
            <Text className="text-xl font-bold">Three to Five days</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
            onPress={() => { handleActivityLevelInput("active") }}
          >
            <Image
              source={infoPageLogos.activityLevelImage3}
              style={{ width: 50, height: 50 }}
            />
            <Text className="text-xl font-bold">More than Five Days</Text>
          </TouchableOpacity>
              <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
            onPress={() => { handleActivityLevelInput("active") }}
          >
            <Image
              source={infoPageLogos.activityLevelImage3}
              style={{ width: 50, height: 50 }}
            />
            <Text className="text-xl font-bold">5-6 Days</Text>
          </TouchableOpacity>

    <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
            onPress={() => { handleActivityLevelInput("very_active") }}
          >
            <Image
              source={infoPageLogos.activityLevelImage3}
              style={{ width: 50, height: 50 }}
            />
            <Text className="text-xl font-bold">(Athletes) 7 Days</Text>
          </TouchableOpacity>



          <View className="items-center mt-5 w-72">
            <TouchableOpacity
              className="bg-black w-full h-[50] items-center justify-center rounded-xl"
              onPress={() => {
                setShowActivityLevelComponent(false);
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

export default ActivityLevelComponent;
