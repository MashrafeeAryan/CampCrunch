import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import goalPageLogos from "../../assets/images/goalPageLogos";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { updateHealthInfo } from "@/components/databaseComponents/updateHealthInfo";
import { useUserAuthStore } from "@/components/zustandStore/AuthStore";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";

const GoalPage = () => {
  const router = useRouter();

  const [showScrollArrow, setShowScrollArrow] = useState(true);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  // handles the scroll icon....
  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset + scrollHeight >= contentHeight - 50) {
      setShowScrollArrow(false);
    } else {
      setShowScrollArrow(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View style={{ flex: 1 }}>

        {/* 🔙 Back Arrow (top-left) - Outside scroll view */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* 👤 Image + Text - Center aligned */}
        <View className="mt-3 items-center justify-center">
          <Image
            source={goalPageLogos.thumbsUpManLogo}
            style={{ width: 190, height: 190 }}
          />
          <Text className="font-bold text-2xl mt-3">
            Enter your information
          </Text>
        </View>

        {/* 🧾 Scrollable Content */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 150 }}
          // uncomment this if you want to have a scroll icon dynamic
          // onScroll={handleScroll}
          // scrollEventThrottle={16}
          // onLayout={(e) => setScrollHeight(e.nativeEvent.layout.height)}
          // onContentSizeChange={(_, height) => setContentHeight(height)}
        >
          <View className="items-center flex-1">
            {/* ... All goal selection cards (unchanged) */}
            {/* Paste your current goal cards here as-is */}
            {/* Selection Boxes */}
            <View className="w-full p-7">

               <View className="bg-[#7ed957] p-3 w-full rounded-xl mt-4">
                 <TouchableOpacity className="flex-row space-x-5 items-center">
                   <Image
                    source={goalPageLogos.loose0_5}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[21px]">
                      Loose 0.5 lbs per week
                    </Text>
                    <Text className="font-bold text-[12px]">
                      Recommended for beginners
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-[#c1ff72] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                     onPress={
                    ()=>{setGoals("-1")}
                  }
                >
                  <Image
                    source={goalPageLogos.gain1}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Loose 1 lbs per week
                    </Text>
                    <Text className="font-bold text-[12px]">
                      Recommended for beginners
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-[#ffbd59] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                   onPress={
                    ()=>{setGoals("-1.5")}
                  }
                >
                  <Image
                    source={goalPageLogos.loose1_5}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Loose 1.5 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-[#ff914d] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                   onPress={
                    ()=>{setGoals("-2")}
                  }
                >

                  <Image
                    source={goalPageLogos.loose2}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Loose 2 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="w-full rounded-xl mt-4 overflow-hidden">
                <LinearGradient
                  colors={["#a7a7a7", "#fdfdfd"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="p-3 w-full"
                >
                  <TouchableOpacity className="flex-row space-x-5 items-center"
                     onPress={
                    ()=>{setGoals("+0")}
                  }
                  >
                    <Image
                      source={goalPageLogos.maintain}
                      className="w-[60px] h-[60px] rounded-[30px]"
                    />
                    <View className="flex-1">
                      <Text className="font-bold text-[20px]">
                        Maintain Weight
                      </Text>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View className="bg-[#ffbd59] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center" 
                   onPress={
                    ()=>{setGoals("+0.5")}
                  }>
                  <Image
                    source={goalPageLogos.gain0_5}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Gain 0.5 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="bg-[#ffbd59] p-3 w-full rounded-xl mt-4">
                <TouchableOpacity className="flex-row space-x-5 items-center"
                   onPress={
                    ()=>{setGoals("+1")}
                  }
                >
                  <Image
                    source={goalPageLogos.gain1}
                    className="w-[60px] h-[60px] rounded-[30px]"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-[20px]">
                      Gain 1 lbs per week
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          
          </View>
        </ScrollView>

        {/* ⬇️ Down Arrow Indicator */}
        {/* uncomment this for the scroll icon */}
        {/* {showScrollArrow && (
          <Ionicons
            name="chevron-down-outline"
            size={40}
            color="rgba(0, 0, 0, 0.15)"
            style={{
              position: "absolute",
              bottom: 80,
              left: "50%",
              transform: [{ translateX: -20 }],
              zIndex: 5,
              pointerEvents: "none",
            }}
          />
        )} */}

        {/* 🧭 Bottom Section */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "white",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text className="text-center mb-2 text-gray-600 text-base">
              You will be able to update this at any time
            </Text>
          </View>

          <View className="flex-row justify-center space-x-7 mt-2">
            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={() => console.log("skip")}
            >
              <Text className="text-white font-bold text-xl">Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={() => console.log("next")}
            >
              <Text className="text-white font-bold text-xl">Next</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default GoalPage;