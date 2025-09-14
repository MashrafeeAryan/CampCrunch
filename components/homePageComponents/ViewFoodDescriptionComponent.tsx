import React from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

import infoPageLogos from "@/assets/images/infoPageLogos"; // Import allergy images

// ✅ Object mapping instead of array
const allergyIcons = {
  peanuts: { label: "Peanuts", image: infoPageLogos.peanut_allergy },
  milk: { label: "Milk", image: infoPageLogos.milk_allergy },
  fish: { label: "Fish", image: infoPageLogos.fish_allergy },
  soy: { label: "Soy", image: infoPageLogos.soy_allergy },
  wheat: { label: "Wheat", image: infoPageLogos.wheat_allergy },
  eggs: { label: "Eggs", image: infoPageLogos.egg_allergy },
  sesame: { label: "Sesame", image: infoPageLogos.sesame_allergy },
  "tree nuts": { label: "Tree Nuts", image: infoPageLogos.tree_nuts_allergy },
  shellfish: { label: "Shellfish", image: infoPageLogos.shellfish_allergy },
};

const ViewFoodComponent = ({
  showViewFoodComponent,
  setShowViewFoodComponent,
  foodName,
  calories,
  carbs,
  protein,
  fat,
  description,
  allergies = [], // expects array like ["milk", "wheat"]
}) => {
  return (
    <Modal
      visible={showViewFoodComponent}
      transparent={true}
      animationType="slide"
    >
      {/* Dismiss modal when tapping outside */}
      <TouchableWithoutFeedback onPress={() => setShowViewFoodComponent(false)}>
        <BlurView
          intensity={140}
          tint="dark"
          className="flex-1 items-center justify-center"
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="w-80 bg-[#EEEEEE] rounded-2xl p-5">
              {/* Food Title */}
              <Text className="font-bold text-2xl mb-2">{foodName}</Text>

              {/* Nutrition Info */}
              <View className="mb-3">
                <Text>Calories: {Number(calories).toFixed(2)} cal</Text>
                <Text>Carbs: {Number(carbs).toFixed(2)} g</Text>
                <Text>Protein: {Number(protein).toFixed(2)} g</Text>
                <Text>Fat: {Number(fat).toFixed(2)} g</Text>
              </View>

              {/* Description */}
              <View className="mb-3">
                <Text className="font-semibold">Description:</Text>
                <View className="bg-white mt-1 p-3 rounded-xl">
                  <Text>{description}</Text>
                </View>
              </View>

              {/* Allergies */}
              {allergies.length > 0 && (
                <View className="mb-3">
                  <Text className="font-semibold mb-2">Allergies:</Text>
                  <View className="flex-row flex-wrap gap-4">
                    {allergies.map((allergy, idx) => {
                      const key = allergy.toLowerCase();
                      const item = allergyIcons[key];
                      if (!item) return null; // skip unknown allergies

                      return (
                        <View key={idx} className="items-center">
                          <View className="bg-yellow-400 p-3 rounded-full">
                            <Image
                              source={item.image}
                              style={{ width: 30, height: 30 }}
                              resizeMode="contain"
                            />
                          </View>
                          <Text>{item.label}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* Close Button */}
              <TouchableOpacity
                className="bg-black w-full h-12 items-center justify-center rounded-xl mt-4"
                onPress={() => setShowViewFoodComponent(false)}
              >
                <Text className="text-white font-bold text-lg">Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ViewFoodComponent;
