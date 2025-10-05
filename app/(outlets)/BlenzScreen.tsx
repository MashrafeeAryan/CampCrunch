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
  name: "Blenz",
  address: "118 College Drive",
  status: "Open now",
  pickup: "Ready in 4 min",
  line: "No line",
  image: FoodLogos.blenz,
};

const data = [
  // --- Coffee ---
  {
    "$id": "blenz1",
    "category": "Coffee",
    "name": "Caffè Latte",
    "description": "Espresso with steamed milk and a light layer of foam",
    "calories": 190,
    "protein": 10,
    "fat": 7,
    "carbs": 18
  },
  {
    "$id": "blenz2",
    "category": "Coffee",
    "name": "Cappuccino",
    "description": "Rich espresso with equal parts steamed milk and foam",
    "calories": 160,
    "protein": 9,
    "fat": 6,
    "carbs": 15
  },

  // --- Tea ---
  {
    "$id": "blenz3",
    "category": "Tea",
    "name": "London Fog",
    "description": "Earl Grey tea with steamed milk and vanilla syrup",
    "calories": 150,
    "protein": 6,
    "fat": 4,
    "carbs": 23
  },
  {
    "$id": "blenz4",
    "category": "Tea",
    "name": "Chai Latte",
    "description": "Spiced black tea with steamed milk",
    "calories": 200,
    "protein": 7,
    "fat": 5,
    "carbs": 34
  },

  // --- Blended Beverages ---
  {
    "$id": "blenz5",
    "category": "Blended Beverages",
    "name": "Matcha Smoothie",
    "description": "Creamy blended drink with Japanese matcha green tea",
    "calories": 260,
    "protein": 8,
    "fat": 5,
    "carbs": 45
  },
  {
    "$id": "blenz6",
    "category": "Blended Beverages",
    "name": "Mocha Frappe",
    "description": "Iced blended coffee with chocolate and whipped cream",
    "calories": 380,
    "protein": 9,
    "fat": 15,
    "carbs": 55
  },

  // --- Bakery ---
  {
    "$id": "blenz7",
    "category": "Bakery",
    "name": "Blueberry Muffin",
    "description": "Freshly baked muffin with juicy blueberries",
    "calories": 420,
    "protein": 6,
    "fat": 18,
    "carbs": 58
  },
  {
    "$id": "blenz8",
    "category": "Bakery",
    "name": "Croissant",
    "description": "Flaky and buttery French-style pastry",
    "calories": 310,
    "protein": 5,
    "fat": 17,
    "carbs": 34
  },

  // --- Bowls ---
  {
    "$id": "blenz9",
    "category": "Bowls",
    "name": "Acai Berry Bowl",
    "description": "Acai blended base topped with granola, banana, strawberries, and coconut flakes",
    "calories": 350,
    "protein": 6,
    "fat": 9,
    "carbs": 65
  },
  {
    "$id": "blenz10",
    "category": "Bowls",
    "name": "Tropical Mango Bowl",
    "description": "Mango and pineapple smoothie base topped with granola, kiwi, and chia seeds",
    "calories": 370,
    "protein": 7,
    "fat": 8,
    "carbs": 70
  },
  {
    "$id": "blenz11",
    "category": "Bowls",
    "name": "Matcha Green Bowl",
    "description": "Japanese matcha smoothie base with blueberries, banana, and pumpkin seeds",
    "calories": 340,
    "protein": 8,
    "fat": 7,
    "carbs": 60
  },
  {
    "$id": "blenz12",
    "category": "Bowls",
    "name": "Peanut Butter Protein Bowl",
    "description": "Peanut butter and banana base topped with granola, cacao nibs, and hemp seeds",
    "calories": 410,
    "protein": 14,
    "fat": 15,
    "carbs": 55
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
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {/* --- Full Top Image Section --- */}
        <Image
          source={restaurant.image}
          style={{ 
            width: "100%", 
            height: 300,
            marginTop: -50 // Extends into status bar area
          }}
          resizeMode="cover"
        />
        
        <SafeAreaView style={{ flex: 1, marginTop: -40 }}>
          {/* --- Content Section --- */}
          <View style={{ padding: 16, backgroundColor: "#f9f9f9", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "800", marginTop: 0 }}>{restaurant.name}</Text>
            <Text style={{ color: "#555", marginTop: 2 }}>{restaurant.address}</Text>

            {/* Search Bar */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: 12,
                marginTop: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
              }}
            >
              <Search size={20} color="#666" />
              <TextInput
                placeholder="Search Blenz"
                style={{ flex: 1, marginLeft: 12, fontSize: 16 }}
              />
            </View>

            {/* Categories Button */}
            <TouchableOpacity onPress={() => setShowModal(true)} style={{ marginTop: 12 }}>
              <Text style={{ color: "#6b21a8", fontWeight: "600" }}>Categories ▼</Text>
            </TouchableOpacity>
          </View>

          {/* --- Menu List --- */}
          <View style={{ paddingHorizontal: 16, backgroundColor: "#f9f9f9" }}>
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
        </SafeAreaView>
      </ScrollView>

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
