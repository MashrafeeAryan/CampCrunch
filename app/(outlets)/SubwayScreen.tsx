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

const restaurant = {
  name: "Subway",
  address: "118 College Drive",
  status: "Open now",
  pickup: "Ready in 4 min",
  line: "No line",
  image: OutletThumbnails.subway,
};

const data = [
  {
    "$id": "sw1",
    "category": "Signature Subs",
    "name": "The Monster",
    "description": "Steak, bacon, Monterey cheddar, and veggies on Italian bread",
    "calories": 990,
    "protein": 60,
    "fat": 48,
    "carbs": 80
  },
  {
    "$id": "sw2",
    "category": "Signature Subs",
    "name": "The Philly",
    "description": "Steak, provolone cheese, green peppers, and onions",
    "calories": 480,
    "protein": 25,
    "fat": 17,
    "carbs": 53
  },
  {
    "$id": "sw3",
    "category": "Classic Subs",
    "name": "Turkey Breast",
    "description": "Turkey breast with fresh vegetables on your choice of bread",
    "calories": 280,
    "protein": 18,
    "fat": 3,
    "carbs": 46
  },
  {
    "$id": "sw4",
    "category": "Classic Subs",
    "name": "Italian B.M.T.",
    "description": "Genoa salami, pepperoni, ham, and veggies",
    "calories": 390,
    "protein": 19,
    "fat": 17,
    "carbs": 44
  },
  {
    "$id": "sw5",
    "category": "Classic Subs",
    "name": "Meatball Marinara",
    "description": "Italian-style meatballs in marinara sauce with melted cheese",
    "calories": 460,
    "protein": 20,
    "fat": 18,
    "carbs": 55
  },
  {
    "$id": "sw6",
    "category": "Salads",
    "name": "Veggie Delight Salad",
    "description": "Crisp lettuce, spinach, cucumbers, tomatoes, and other fresh veggies",
    "calories": 60,
    "protein": 3,
    "fat": 1,
    "carbs": 11
  },
  {
    "$id": "sw7",
    "category": "Salads",
    "name": "Chicken & Bacon Ranch Salad",
    "description": "Grilled chicken, bacon, Monterey cheddar cheese, and veggies",
    "calories": 460,
    "protein": 32,
    "fat": 28,
    "carbs": 15
  },
  {
    "$id": "sw8",
    "category": "Wraps",
    "name": "Turkey, Bacon & Avocado Wrap",
    "description": "Turkey breast, bacon, avocado, and veggies in a soft tortilla",
    "calories": 580,
    "protein": 28,
    "fat": 26,
    "carbs": 55
  },
  {
    "$id": "sw9",
    "category": "Sides",
    "name": "Chips",
    "description": "Assorted flavors of Lay’s potato chips",
    "calories": 150,
    "protein": 2,
    "fat": 10,
    "carbs": 15
  },
  {
    "$id": "sw10",
    "category": "Cookies & Desserts",
    "name": "Chocolate Chip Cookie",
    "description": "Soft-baked cookie loaded with chocolate chips",
    "calories": 210,
    "protein": 2,
    "fat": 10,
    "carbs": 30
  },
  {
    "$id": "sw11",
    "category": "Cookies & Desserts",
    "name": "Oatmeal Raisin Cookie",
    "description": "Chewy cookie made with oats and raisins",
    "calories": 200,
    "protein": 3,
    "fat": 8,
    "carbs": 29
  },
  {
    "$id": "sw12",
    "category": "Beverages",
    "name": "Fountain Drink",
    "description": "Choice of soft drinks",
    "calories": null,
    "protein": null,
    "fat": null,
    "carbs": null
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
                placeholder="Search Subway"
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
