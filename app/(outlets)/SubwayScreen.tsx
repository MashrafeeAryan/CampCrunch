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
    "$id": "food1",
    "category": "Entrees",
    "name": "Orange Chicken",
    "description": "Crispy chicken tossed in a sweet and tangy orange sauce",
    "calories": 490,
    "protein": 25,
    "fat": 23,
    "carbs": 51
  },
  {
    "$id": "food2",
    "category": "Entrees",
    "name": "Kung Pao Chicken",
    "description": "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers",
    "calories": 290,
    "protein": 16,
    "fat": 19,
    "carbs": 14
  },
  {
    "$id": "food3",
    "category": "Build Your Own",
    "name": "Bowl",
    "description": "1 Entree and 1 Side",
    "calories": null,
    "protein": null,
    "fat": null,
    "carbs": null
  },
  {
    "$id": "food4",
    "category": "Build Your Own",
    "name": "2-Entree Plate",
    "description": "2 Entrees and 1 Side",
    "calories": null,
    "protein": null,
    "fat": null,
    "carbs": null
  },
  {
    "$id": "food6",
    "category": "Sides",
    "name": "Fried Rice",
    "description": "Classic fried rice with peas, carrots, and soy sauce",
    "calories": 520,
    "protein": 11,
    "fat": 16,
    "carbs": 85
  },
  {
    "$id": "food7",
    "category": "Dessert Appetizers",
    "name": "Chicken Egg Roll",
    "description": "Crispy egg roll filled with chicken and veggies",
    "calories": 200,
    "protein": 9,
    "fat": 10,
    "carbs": 22
  },
  {
    "$id": "food9",
    "category": "Drinks",
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <ScrollView ref={scrollRef}>
        {/* --- Top Section --- */}
        <View>
          <Image
            source={restaurant.image}
            style={{ width: "100%", height: 180 }}
            resizeMode="cover"
          />
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "800" }}>{restaurant.name}</Text>
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
                placeholder="Search Panda Express"
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>

            {/* Categories Button */}
            <TouchableOpacity onPress={() => setShowModal(true)} style={{ marginTop: 12 }}>
              <Text style={{ color: "#6b21a8", fontWeight: "600" }}>Categories ▼</Text>
            </TouchableOpacity>
          </View>
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
    </SafeAreaView>
  );
}
