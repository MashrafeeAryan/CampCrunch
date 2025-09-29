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
  name: "Starbucks",
  address: "118 College Drive",
  status: "Open now",
  pickup: "Ready in 4 min",
  line: "No line",
  image: OutletThumbnails.starbucks,
};

const data = [
  {
    "$id": "sb1",
    "category": "Hot Coffees",
    "name": "Caffè Americano",
    "description": "Rich espresso shots topped with hot water for a bold flavor",
    "calories": 15,
    "protein": 1,
    "fat": 0,
    "carbs": 3
  },
  {
    "$id": "sb2",
    "category": "Hot Coffees",
    "name": "Caffè Latte",
    "description": "Espresso balanced with steamed milk and a light layer of foam",
    "calories": 190,
    "protein": 12,
    "fat": 7,
    "carbs": 18
  },
  {
    "$id": "sb3",
    "category": "Cold Coffees",
    "name": "Iced Caramel Macchiato",
    "description": "Espresso, vanilla-flavored syrup, milk, and caramel drizzle over ice",
    "calories": 250,
    "protein": 10,
    "fat": 7,
    "carbs": 38
  },
  {
    "$id": "sb4",
    "category": "Cold Coffees",
    "name": "Cold Brew Coffee",
    "description": "Slow-steeped cold brew coffee served over ice",
    "calories": 5,
    "protein": 0,
    "fat": 0,
    "carbs": 0
  },
  {
    "$id": "sb5",
    "category": "Refreshers",
    "name": "Strawberry Açaí Refresher",
    "description": "A fruity blend of strawberry, açaí, and green coffee extract",
    "calories": 90,
    "protein": 0,
    "fat": 0,
    "carbs": 23
  },
  {
    "$id": "sb6",
    "category": "Refreshers",
    "name": "Mango Dragonfruit Refresher",
    "description": "Tropical flavors of mango and dragonfruit shaken with ice",
    "calories": 70,
    "protein": 1,
    "fat": 0,
    "carbs": 15
  },
  {
    "$id": "sb7",
    "category": "Teas",
    "name": "Chai Tea Latte",
    "description": "Black tea infused with cinnamon, clove, and spices, blended with milk",
    "calories": 240,
    "protein": 8,
    "fat": 4,
    "carbs": 45
  },
  {
    "$id": "sb8",
    "category": "Bakery",
    "name": "Blueberry Muffin",
    "description": "Moist muffin filled with blueberries and topped with sugar crystals",
    "calories": 360,
    "protein": 6,
    "fat": 15,
    "carbs": 52
  },
  {
    "$id": "sb9",
    "category": "Breakfast",
    "name": "Bacon, Gouda & Egg Sandwich",
    "description": "Smoked bacon, melted gouda cheese, and egg on a soft artisan roll",
    "calories": 360,
    "protein": 19,
    "fat": 18,
    "carbs": 34
  },
  {
    "$id": "sb10",
    "category": "Snacks & Sweets",
    "name": "Dark Chocolate Cake Pop",
    "description": "Rich chocolate cake coated in dark chocolate icing",
    "calories": 160,
    "protein": 2,
    "fat": 9,
    "carbs": 20
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
                placeholder="Search Starbucks"
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
