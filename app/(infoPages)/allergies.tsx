import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import infoPageLogos from "@/assets/images/infoPageLogos";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import { SafeAreaView } from "react-native-safe-area-context";

const allergies = [
  { label: "Peanuts", key: "peanuts", image: infoPageLogos.peanut_allergy },
  { label: "Milk", key: "milk", image: infoPageLogos.milk_allergy },
  { label: "Fish", key: "fish", image: infoPageLogos.fish_allergy },
  { label: "Soy", key: "soy", image: infoPageLogos.soy_allergy },
  { label: "Wheat", key: "wheat", image: infoPageLogos.wheat_allergy },
  { label: "Eggs", key: "eggs", image: infoPageLogos.egg_allergy },
  { label: "Sesame", key: "sesame", image: infoPageLogos.sesame_allergy },
  {
    label: "Tree nuts",
    key: "tree_nuts",
    image: infoPageLogos.tree_nuts_allergy,
  },
  {
    label: "Shellfish",
    key: "shellfish",
    image: infoPageLogos.shellfish_allergy,
  },
];

export default function AllergiesScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const setAllergies = useUserHealthStore((s) => s.setAllergies);


  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View style={{ flex: 1 }}>
        {/* 🔝 Top bar with back arrow */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
        >
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>

        <View className="mt-3 items-center justify-center">
          <Image
            source={require("../../assets/images/infoPageLogos/allergies_top.png")}
            style={{ width: 190, height: 190 }}
          />
          <Text className="font-bold text-2xl mt-3">Any Allergies?</Text>
        </View>

        {/* 🧾 Scrollable content: Image, Title, Allergy List */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          scrollEventThrottle={16}          
        >
          {/* 🧩 Allergy Options */}
          <View className="px-5 pt-2">
            <FlatList
              data={allergies}
              keyExtractor={(item) => item.key}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              contentContainerStyle={{ paddingBottom: 10 }}
              renderItem={({ item }) => {
                const isActive = selected.includes(item.key);
                return (
                  <TouchableOpacity
                    onPress={() => toggle(item.key)}
                    className={`flex-row items-center px-4 py-3 mb-3 rounded-xl w-[48%] ${
                      isActive ? "bg-gray-500" : "bg-white"
                    }`}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#FFD500",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={item.image}
                        style={{ width: 80, height: 80 }}
                        resizeMode="contain"
                      />
                    </View>

                    <Text
                      className={`ml-3 font-semibold text-base ${
                        isActive
                          ? "text-white font-bold text-l"
                          : "text-gray-800"
                      }`}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>

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
              onPress={() => router.push("/(infoPages)/goalPage")}
            >
              <Text className="text-white font-bold text-xl">Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-black w-32 h-[50px] items-center justify-center rounded-xl"
              onPress={() => {
                setAllergies(selected.toString());
                router.push("/(infoPages)/goalPage");
              }}
            >
              <Text className="text-white font-bold text-xl">Next</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}
