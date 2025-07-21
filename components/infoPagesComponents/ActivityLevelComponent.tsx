import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur"; // For the frosted glass blur effect background
import infoPageLogos from "@/assets/images/infoPageLogos"; // Image assets for the activity icons
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore"; // Zustand global state store

const ActivityLevelComponent = ({
  showActivityLevelComponent,  // Boolean prop to control modal visibility
  setShowActivityLevelComponent, // Function to toggle modal visibility
}) => {
  // Access the current activity level from Zustand global state
  const activityLevel = useUserHealthStore((s) => s.activityLevel);
  // Function from Zustand store to update the activity level
  const setActivityLevel = useUserHealthStore((s) => s.setActivityLevel);

  // Handler to update activity level when user taps an option
  const handleActivityLevelInput = (level: string) => {
    setActivityLevel(level); // Update the global activity level state
  };

  // Common base class for each activity option button
  const baseButtonClass =
    "h-15 mt-2 rounded-lg flex-row p-4 items-center space-x-2";
  // Style applied to selected option button (dark background)
  const selectedStyle = "bg-[#333333]";
  // Style applied to unselected option button (white background)
  const defaultStyle = "bg-white";

  return (
    <Modal visible={showActivityLevelComponent} transparent animationType="slide">
      {/* 
        Outer TouchableWithoutFeedback:
        Detects taps outside the modal content.
        On tap: dismiss keyboard and close modal. 
      */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); // Hide keyboard if open (UX best practice)
          setShowActivityLevelComponent(false); // Close modal on outside tap
        }}
      >
        {/* 
          BlurView provides a dark blur effect to background 
          behind the modal content for focus and style 
        */}
        <BlurView
          intensity={140}
          tint="dark"
          className="flex-1 items-center justify-center"
        >
          {/* 
            Inner TouchableWithoutFeedback:
            Prevents taps inside modal content from closing modal 
          */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="w-75 bg-[#DDDDDD] rounded-xl items-center p-4">
              {/* Modal header: Activity icon and title */}
              <Image
                source={infoPageLogos.actvityLogo} // Activity icon image
                style={{ width: 80, height: 80 }}
              />
              <Text className="font-bold text-2xl mb-3">Activity Level</Text>

              {/* Container for all activity level options */}
              <View className="w-full">
                {/* Each TouchableOpacity is an option button */}
                {/* Sedentary option */}
                <TouchableOpacity
                  className={`${baseButtonClass} ${
                    activityLevel === "sedentary" ? selectedStyle : defaultStyle
                  }`}
                  onPress={() => handleActivityLevelInput("sedentary")} // Update global state on press
                >
                  <Image
                    source={infoPageLogos.activityLevelImage2} // Icon for sedentary
                    style={{ width: 40, height: 50 }}
                  />
                  <Text
                    className={`text-xl font-bold ${
                      activityLevel === "sedentary" ? "text-white" : "text-black"
                    }`} // White text if selected, black otherwise
                  >
                    Little to no exercise
                  </Text>
                </TouchableOpacity>

                {/* Light activity option */}
                <TouchableOpacity
                  className={`${baseButtonClass} ${
                    activityLevel === "light" ? selectedStyle : defaultStyle
                  }`}
                  onPress={() => handleActivityLevelInput("light")}
                >
                  <Image
                    source={infoPageLogos.activityLevelImage2} // Same icon as sedentary
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

                {/* Moderate activity option */}
                <TouchableOpacity
                  className={`${baseButtonClass} ${
                    activityLevel === "moderate" ? selectedStyle : defaultStyle
                  }`}
                  onPress={() => handleActivityLevelInput("moderate")}
                >
                  <Image
                    source={infoPageLogos.activityLevelImage1} // Different icon for moderate
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

                {/* Active option */}
                <TouchableOpacity
                  className={`${baseButtonClass} ${
                    activityLevel === "active" ? selectedStyle : defaultStyle
                  }`}
                  onPress={() => handleActivityLevelInput("active")}
                >
                  <Image
                    source={infoPageLogos.activityLevelImage3} // Icon for active level
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

                {/* Very active option */}
                <TouchableOpacity
                  className={`${baseButtonClass} ${
                    activityLevel === "very_active" ? selectedStyle : defaultStyle
                  }`}
                  onPress={() => handleActivityLevelInput("very_active")}
                >
                  <Image
                    source={infoPageLogos.activityLevelImage3} // Same icon as active
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

              {/* Continue button to close modal */}
              <View className="items-center mt-5 w-72">
                <TouchableOpacity
                  className="bg-black w-full h-[50] items-center justify-center rounded-xl"
                  onPress={() => {
                    setShowActivityLevelComponent(false); // Close modal on continue
                  }}
                >
                  <Text className="text-white font-bold text-xl">Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ActivityLevelComponent;
