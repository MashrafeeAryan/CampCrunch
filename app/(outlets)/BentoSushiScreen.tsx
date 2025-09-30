import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Search } from "lucide-react-native";
import { OutletThumbnails } from "@/assets/images/outletThumnails";
import { FoodLogos } from "@/assets/images/addFoodLogos";

const restaurant = {
  name: "Bento Sushi",
  address: "118 College Drive",
  status: "Open now",
  pickup: "Ready in 4 min",
  line: "No line",
  image: OutletThumbnails.bentoSushi,
};
const data = [
  {
    "$id": "bs1",
    "category": "Sushi Rolls",
    "name": "California Roll",
    "description": "Crab stick, avocado, and cucumber wrapped in sushi rice and seaweed",
    "calories": 250,
    "protein": 9,
    "fat": 7,
    "carbs": 38
  },
  {
    "$id": "bs2",
    "category": "Sushi Rolls",
    "name": "Spicy Salmon Roll",
    "description": "Fresh salmon mixed with spicy mayo, rolled with cucumber and rice",
    "calories": 300,
    "protein": 12,
    "fat": 10,
    "carbs": 40
  },
  {
    "$id": "bs3",
    "category": "Sashimi",
    "name": "Tuna Sashimi (5 pcs)",
    "description": "Fresh raw tuna slices served with soy sauce and wasabi",
    "calories": 130,
    "protein": 27,
    "fat": 2,
    "carbs": 0
  },
  {
    "$id": "bs4",
    "category": "Nigiri",
    "name": "Salmon Nigiri (2 pcs)",
    "description": "Hand-pressed sushi rice topped with fresh salmon",
    "calories": 120,
    "protein": 8,
    "fat": 4,
    "carbs": 14
  },
  {
    "$id": "bs5",
    "category": "Bento Boxes",
    "name": "Chicken Teriyaki Bento",
    "description": "Grilled chicken in teriyaki sauce served with rice, sushi roll, and salad",
    "calories": 780,
    "protein": 40,
    "fat": 25,
    "carbs": 90
  },
  {
    "$id": "bs6",
    "category": "Bento Boxes",
    "name": "Salmon Bento",
    "description": "Grilled salmon fillet with rice, California roll, salad, and miso soup",
    "calories": 720,
    "protein": 42,
    "fat": 22,
    "carbs": 85
  },
  {
    "$id": "bs7",
    "category": "Appetizers",
    "name": "Gyoza (5 pcs)",
    "description": "Pan-fried dumplings filled with chicken and vegetables",
    "calories": 220,
    "protein": 9,
    "fat": 11,
    "carbs": 22
  },
  {
    "$id": "bs8",
    "category": "Soups & Salads",
    "name": "Miso Soup",
    "description": "Traditional miso broth with tofu, seaweed, and scallions",
    "calories": 40,
    "protein": 3,
    "fat": 1,
    "carbs": 5
  },
  {
    "$id": "bs9",
    "category": "Soups & Salads",
    "name": "Seaweed Salad",
    "description": "Seasoned seaweed salad with sesame seeds",
    "calories": 90,
    "protein": 2,
    "fat": 4,
    "carbs": 12
  },
  {
    "$id": "bs10",
    "category": "Beverages",
    "name": "Green Tea",
    "description": "Refreshing hot or iced Japanese green tea",
    "calories": 0,
    "protein": 0,
    "fat": 0,
    "carbs": 0
  }
];





const groupByCategory = (items) =>
  items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

const Card = ({ children }) => (
  <View
    style={{
      backgroundColor: "white",
      borderRadius: 16,
      padding: 12,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}
  >
    {children}
  </View>
);

export default function MenuScreen() {
  const groupedData = groupByCategory(data);
  const categories = Object.keys(groupedData);

  const scrollRef = useRef(null);
  const [sectionPositions, setSectionPositions] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleCategoryPress = (category) => {
    setShowModal(false);
    if (scrollRef.current && sectionPositions[category] !== undefined) {
      scrollRef.current.scrollTo({ y: sectionPositions[category], animated: true });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      {/* --- Top Image Section --- */}
      <Image
        source={restaurant.image}
        style={{ width: "100%", height: 230, marginBottom: 0 }}
        resizeMode="cover"
      />
      
      <SafeAreaView style={{ flex: 1, marginTop: -20 }}>
        <ScrollView ref={scrollRef}>
          {/* --- Content Section --- */}
          <View style={{ padding: 10, paddingTop: 0 }}>
            <Text style={{ fontSize: 24, fontWeight: "800", marginTop: -2 }}>{restaurant.name}</Text>
            <Text style={{ color: "#555", marginTop: 2 }}>{restaurant.address}</Text>
            <Text style={{ color: "green", marginTop: 4 }}>{restaurant.status}</Text>

            

            {/* Search Bar */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: 12,
                marginTop: 12,
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}
            >
              <Search size={18} color="#666" />
              <TextInput
                placeholder="Search Bento Sushi"
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>

            {/* Categories Button */}
            <TouchableOpacity onPress={() => setShowModal(true)} style={{ marginTop: 12 }}>
              <Text style={{ color: "#6b21a8", fontWeight: "600" }}>Categories ▼</Text>
            </TouchableOpacity>
          </View>

          {/* --- Menu List --- */}
          <View style={{ padding: 16 }}>
            {categories.map((category) => (
              <View
                key={category}
                onLayout={(event) => {
                  const { y } = event.nativeEvent.layout;
                  setSectionPositions((prev) => ({ ...prev, [category]: y }));
                }}
                style={{ marginBottom: 24 }}
              >
                <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
                  {category}
                </Text>
                {groupedData[category].map((item) => (
                  <Card key={item.$id}>
                    <View style={{ flex: 1, paddingRight: 12 }}>
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
                      <Text style={{ color: "#555", marginTop: 2 }}>{item.description}</Text>
                      {item.calories && (
                        <Text style={{ color: "#888", fontSize: 12, marginTop: 4 }}>
                          {item.calories} cal
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#F4C542",
                        padding: 10,
                        borderRadius: 50,
                      }}
                      onPress={() => console.log("Added", item.name)}
                    >
                      <Plus color="white" size={20} />
                    </TouchableOpacity>
                  </Card>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* --- Categories Modal --- */}
      <Modal visible={showModal} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setShowModal(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Categories
            </Text>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => handleCategoryPress(cat)}
                style={{ paddingVertical: 10 }}
              >
                <Text style={{ fontSize: 16 }}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
