// import {
//   View,
//   Text,
//   Modal,
//   Image,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";
// import { BlurView } from "expo-blur";
// import infoPageLogos from "@/assets/images/infoPageLogos";

// const ActivityLevelComponent = ({
//   showActivityLevelComponent,
//   setShowActivityLevelComponent,
//   setActivityLevel
// }) => {
//   const handleActivityLevelInput = (workoutType: string) => {
//     setActivityLevel(workoutType)
//   }
//   return (
//     <Modal
//       visible={showActivityLevelComponent}
//       transparent={true}
//       animationType="slide"
//     >
//       <BlurView
//         intensity={60}
//         tint="dark"
//         className="flex-1 items-center justify-center"
//       >
//         <View className="w-75 bg-[#DDDDDD] rounded-xl items-center p-4">
//           <Image
//             source={infoPageLogos.actvityLogo}
//             style={{ width: 80, height: 80 }}
//           />
//           <Text className="font-bold text-2xl">Activity Level</Text>
//           <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
//             onPress={() => { handleActivityLevelInput("sedentary") }}
//           >
//             <Image
//               source={infoPageLogos.activityLevelImage2}
//               style={{ width: 40, height: 50 }}
//             />
//             <Text className="text-xl font-bold">Little to no exercise</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
//             onPress={() => { handleActivityLevelInput("light") }}
//           >
//             <Image
//               source={infoPageLogos.activityLevelImage2}
//               style={{ width: 40, height: 50 }}
//             />
//             <Text className="text-xl font-bold">Once or Twice a Week</Text>
//           </TouchableOpacity>

//           <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
//             onPress={() => { handleActivityLevelInput("moderate") }}

//           >
//             <Image
//               source={infoPageLogos.activityLevelImage1}
//               style={{ width: 70, height: 50 }}
//             />
//             <Text className="text-xl font-bold">Three to Five days</Text>
//           </TouchableOpacity>

//           <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
//             onPress={() => { handleActivityLevelInput("active") }}
//           >
//             <Image
//               source={infoPageLogos.activityLevelImage3}
//               style={{ width: 50, height: 50 }}
//             />
//             <Text className="text-xl font-bold">More than Five Days</Text>
//           </TouchableOpacity>

//           <TouchableOpacity className="bg-white w-full h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2"
//             onPress={() => { handleActivityLevelInput("very_active") }}
//           >
//             <Image
//               source={infoPageLogos.activityLevelImage3}
//               style={{ width: 50, height: 50 }}
//             />
//             <Text className="text-xl font-bold">(Athletes) 7 Days</Text>
//           </TouchableOpacity>

//           <View className="items-center mt-5 w-72">
//             <TouchableOpacity
//               className="bg-black w-full h-[50] items-center justify-center rounded-xl"
//               onPress={() => {
//                 setShowActivityLevelComponent(false);
//               }}
//             >
//               <Text className="text-white font-bold text-xl">Continue</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </BlurView>
//     </Modal>
//   );
// };

// export default ActivityLevelComponent;

import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore"; // Assuming you have this store

const ActivityLevelComponent = ({
  showActivityLevelComponent,
  setShowActivityLevelComponent,
}) => {
  // Access activityLevel from Zustand store and setter
  const activityLevel = useUserHealthStore((s) => s.activityLevel);
  const setActivityLevel = useUserHealthStore((s) => s.setActivityLevel);

  const handleActivityLevelInput = (level: string) => {
    setActivityLevel(level);
  };

  // Common styles for buttons to ensure consistent width & padding
  const baseButtonClass =
    "h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2";
  const selectedStyle = "bg-[#333333]"; // darker background when selected
  const defaultStyle = "bg-white";

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
          <Text className="font-bold text-2xl mb-3">Activity Level</Text>

          <View className="w-full">
            <TouchableOpacity
              className={`${baseButtonClass} ${
                activityLevel === "sedentary" ? selectedStyle : defaultStyle
              }`}
              onPress={() => {
                handleActivityLevelInput("sedentary");
              }}
            >
              <Image
                source={infoPageLogos.activityLevelImage2}
                style={{ width: 40, height: 50 }}
              />
              <Text
                className={`text-xl font-bold ${
                  activityLevel === "sedentary" ? "text-white" : "text-black"
                }`}
              >
                Little to no exercise
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`${baseButtonClass} ${
                activityLevel === "light" ? selectedStyle : defaultStyle
              }`}
              onPress={() => {
                handleActivityLevelInput("light");
              }}
            >
              <Image
                source={infoPageLogos.activityLevelImage2}
                style={{ width: 40, height: 50 }}
              />
              <Text
                className={`text-xl font-bold ${
                  activityLevel === "light" ? "text-white" : "text-black"
                }`}
              >
                Once or Twice a Week
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`${baseButtonClass} ${
                activityLevel === "moderate" ? selectedStyle : defaultStyle
              }`}
              onPress={() => {
                handleActivityLevelInput("moderate");
              }}
            >
              <Image
                source={infoPageLogos.activityLevelImage1}
                style={{ width: 40, height: 50 }}
              />
              <Text
                className={`text-xl font-bold ${
                  activityLevel === "moderate" ? "text-white" : "text-black"
                }`}
              >
                Three to Five days
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`${baseButtonClass} ${
                activityLevel === "active" ? selectedStyle : defaultStyle
              }`}
              onPress={() => {
                handleActivityLevelInput("active");
              }}
            >
              <Image
                source={infoPageLogos.activityLevelImage3}
                style={{ width: 40, height: 50 }}
              />
              <Text
                className={`text-xl font-bold ${
                  activityLevel === "active" ? "text-white" : "text-black"
                }`}
              >
                More than Five Days
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`${baseButtonClass} ${
                activityLevel === "very_active" ? selectedStyle : defaultStyle
              }`}
              onPress={() => {
                handleActivityLevelInput("very_active");
              }}
            >
              <Image
                source={infoPageLogos.activityLevelImage3}
                style={{ width: 40, height: 50 }}
              />
              <Text
                className={`text-xl font-bold ${
                  activityLevel === "very_active" ? "text-white" : "text-black"
                }`}
              >
                (Athletes) 7 Days
              </Text>
            </TouchableOpacity>
          </View>

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
