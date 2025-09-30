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
  name: "Moe's Southwest Grill",
  address: "118 College Drive",
  status: "Open now",
  pickup: "Ready in 4 min",
  line: "No line",
  image: FoodLogos.moes,
};

const data = [
  // --- Burritos ---
  {
    "$id": "moes1",
    "category": "Burritos",
    "name": "Homewrecker Burrito",
    "description": "Flour tortilla stuffed with protein of choice, rice, beans, cheese, pico de gallo, guacamole, and sour cream",
    "calories": 930,
    "protein": 38,
    "fat": 42,
    "carbs": 95
  },
  {
    "$id": "moes2",
    "category": "Burritos",
    "name": "Joey Bag of Donuts",
    "description": "Classic burrito with choice of protein, rice, beans, shredded cheese, and pico de gallo",
    "calories": 820,
    "protein": 34,
    "fat": 36,
    "carbs": 90
  },

  // --- Bowls ---
  {
    "$id": "moes3",
    "category": "Bowls",
    "name": "Burrito Bowl",
    "description": "Choice of protein served with rice, beans, cheese, pico de gallo, and toppings without a tortilla",
    "calories": 720,
    "protein": 35,
    "fat": 28,
    "carbs": 85
  },
  {
    "$id": "moes4",
    "category": "Bowls",
    "name": "Earmuffs Bowl",
    "description": "Protein of choice with rice, beans, queso, pico de gallo, and guacamole",
    "calories": 760,
    "protein": 37,
    "fat": 31,
    "carbs": 88
  },

  // --- Tacos ---
  {
    "$id": "moes5",
    "category": "Tacos",
    "name": "Overachiever Taco",
    "description": "Soft taco with protein of choice, pico de gallo, cheese, sour cream, and guacamole",
    "calories": 320,
    "protein": 18,
    "fat": 14,
    "carbs": 28
  },
  {
    "$id": "moes6",
    "category": "Tacos",
    "name": "Funky Taco",
    "description": "Soft taco with protein, beans, shredded cheese, and lettuce",
    "calories": 290,
    "protein": 16,
    "fat": 12,
    "carbs": 26
  },

  // --- Quesadillas ---
  {
    "$id": "moes7",
    "category": "Quesadillas",
    "name": "Chicken Quesadilla",
    "description": "Grilled flour tortilla filled with chicken, cheese, and pico de gallo",
    "calories": 680,
    "protein": 32,
    "fat": 28,
    "carbs": 70
  },
  {
    "$id": "moes8",
    "category": "Quesadillas",
    "name": "Steak Quesadilla",
    "description": "Grilled tortilla stuffed with steak, shredded cheese, and vegetables",
    "calories": 710,
    "protein": 35,
    "fat": 30,
    "carbs": 72
  },

  // --- Nachos ---
  {
    "$id": "moes9",
    "category": "Nachos",
    "name": "Billy Barou Nachos",
    "description": "Crispy tortilla chips topped with queso, beans, protein, jalapeños, pico de gallo, and sour cream",
    "calories": 890,
    "protein": 34,
    "fat": 44,
    "carbs": 95
  },

  // --- Sides ---
  {
    "$id": "moes10",
    "category": "Sides",
    "name": "Chips & Queso",
    "description": "Freshly made tortilla chips served with Moe’s famous queso dip",
    "calories": 430,
    "protein": 10,
    "fat": 22,
    "carbs": 48
  },
  {
    "$id": "moes11",
    "category": "Sides",
    "name": "Guacamole",
    "description": "Handcrafted guacamole with fresh avocados, lime, and seasoning",
    "calories": 120,
    "protein": 2,
    "fat": 10,
    "carbs": 8
  },

  // --- Drinks ---
  {
    "$id": "moes12",
    "category": "Drinks",
    "name": "Fountain Drink",
    "description": "Choice of soft drinks",
    "calories": null,
    "protein": null,
    "fat": null,
    "carbs": null
  },
  {
    "$id": "moes13",
    "category": "Drinks",
    "name": "Sweet Tea",
    "description": "Southern-style sweetened iced tea",
    "calories": 120,
    "protein": 0,
    "fat": 0,
    "carbs": 31
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
                placeholder="Search Moe's Southwest Grill"
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
