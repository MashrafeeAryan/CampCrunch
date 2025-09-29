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
  name: "Southern Wings 2.0",
  address: "118 College Drive",
  status: "Open now",
  pickup: "Ready in 4 min",
  line: "No line",
  image: FoodLogos.swc,
};

const data = [
  {
    "$id": "sw1",
    "category": "Wings",
    "name": "Buffalo Wings (10 pcs)",
    "description": "Classic crispy fried wings tossed in spicy buffalo sauce",
    "calories": 900,
    "protein": 60,
    "fat": 55,
    "carbs": 10
  },
  {
    "$id": "sw2",
    "category": "Wings",
    "name": "Honey BBQ Wings (10 pcs)",
    "description": "Sweet and smoky honey BBQ glazed wings",
    "calories": 950,
    "protein": 58,
    "fat": 52,
    "carbs": 25
  },
  {
    "$id": "sw3",
    "category": "Boneless Wings",
    "name": "Garlic Parmesan Boneless Wings",
    "description": "Boneless wings coated in garlic parmesan sauce",
    "calories": 780,
    "protein": 45,
    "fat": 40,
    "carbs": 50
  },
  {
    "$id": "sw4",
    "category": "Sandwiches",
    "name": "Crispy Chicken Sandwich",
    "description": "Fried chicken breast with pickles on a toasted bun",
    "calories": 520,
    "protein": 28,
    "fat": 24,
    "carbs": 46
  },
  {
    "$id": "sw5",
    "category": "Sides",
    "name": "Seasoned Fries",
    "description": "Crispy golden fries with Southern seasoning",
    "calories": 420,
    "protein": 5,
    "fat": 22,
    "carbs": 50
  },
  {
    "$id": "sw6",
    "category": "Sauces",
    "name": "Ranch Dip",
    "description": "Cool and creamy ranch sauce",
    "calories": 140,
    "protein": 1,
    "fat": 14,
    "carbs": 2
  },
  {
    "$id": "sw7",
    "category": "Beverages",
    "name": "Sweet Iced Tea",
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
                placeholder="Search Southern Wings 2.0"
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
