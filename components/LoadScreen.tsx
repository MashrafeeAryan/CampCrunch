import { ActivityIndicator, Image, Text, View } from "react-native";
import React from "react";
import goalPageLogos from "../assets/images/goalPageLogos";

const LoadScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={goalPageLogos.thumbsUpManLogo}
        className="w-[150px] h-[150px] mb-[24px]" // 150px width and height, margin-bottom of 24px
      />
      <ActivityIndicator size="large" color="#4D96FF" />
      <Text className="mt-[16px] text-base text-gray-800 tracking-wide">Checking access...</Text>
    </View>
  );
};

export default LoadScreen;
