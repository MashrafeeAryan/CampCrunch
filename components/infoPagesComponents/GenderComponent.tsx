import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore"; // Import your Zustand store

const GenderComponent = ({
  showGenderComponent,
  setShowGenderComponent,
}) => {
  // Access gender and setter from Zustand store
  const gender = useUserHealthStore((state) => state.gender);
  const setGender = useUserHealthStore((state) => state.setGender);

  const handleGenderInput = (genderType) => {
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
          <Text className="font-bold text-2xl mb-4">Gender</Text>
          <View className="bg-white w-full h-15 rounded-xl flex-row p-3 items-center justify-center space-x-3">
            {/* Male button */}
            <TouchableOpacity
              className={`p-2 w-[70] rounded-xl items-center ${
                gender === "Male" ? "bg-[#333333]" : "bg-[#DDDDDD]"
              }`}
              onPress={() => handleGenderInput("Male")}
            >
              <Text
                className={`font-bold text-lg ${
                  gender === "Male" ? "text-white" : "text-black"
                }`}
              >
                Male
              </Text>
            </TouchableOpacity>

            {/* Female button */}
            <TouchableOpacity
              className={`p-2 w-[80] rounded-xl items-center ${
                gender === "Female" ? "bg-[#333333]" : "bg-[#DDDDDD]"
              }`}
              onPress={() => handleGenderInput("Female")}
            >
              <Text
                className={`font-bold text-lg ${
                  gender === "Female" ? "text-white" : "text-black"
                }`}
              >
                Female
              </Text>
            </TouchableOpacity>

            {/* Other button */}
            <TouchableOpacity
              className={`p-2 w-[70] rounded-xl items-center ${
                gender === "Other" ? "bg-[#333333]" : "bg-[#DDDDDD]"
              }`}
              onPress={() => handleGenderInput("Other")}
            >
              <Text
                className={`font-bold text-lg ${
                  gender === "Other" ? "text-white" : "text-black"
                }`}
              >
                Other
              </Text>
            </TouchableOpacity>
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
