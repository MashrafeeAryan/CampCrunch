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
  name: "Chick-Fil-A",
  address: "118 College Drive",
  status: "Open now",
  pickup: "Ready in 4 min",
  line: "No line",
  image: OutletThumbnails.chickfila,
};

const data = [
  {
    "$id": "cf1",
    "category": "Featured Flavors",
    "name": "Spicy Chicken Sandwich Deluxe",
    "description": "Spicy seasoned chicken breast with lettuce, tomato, and cheese on a toasted bun",
    "calories": 550,
    "protein": 29,
    "fat": 25,
    "carbs": 47
  },
  {
    "$id": "cf13",
    "category": "Entrees",
    "name": "Grilled Chicken Sandwich",
    "description": "Marinated grilled chicken breast served on a toasted multigrain bun with lettuce and tomato",
    "calories": 380,
    "protein": 28,
    "fat": 11,
    "carbs": 43
  },
  {
    "$id": "cf14",
    "category": "Entrees",
    "name": "Grilled Nuggets (8-Count)",
    "description": "Tender pieces of grilled chicken breast, seasoned to perfection",
    "calories": 130,
    "protein": 25,
    "fat": 3,
    "carbs": 1
  },
  {
    "$id": "cf15",
    "category": "Entrees",
    "name": "Spicy Deluxe Sandwich",
    "description": "Spicy breaded chicken breast with lettuce, tomato, and cheese on a toasted bun",
    "calories": 570,
    "protein": 33,
    "fat": 27,
    "carbs": 46
  },
  {
    "$id": "cf16",
    "category": "Entrees",
    "name": "Grilled Chicken Club Sandwich",
    "description": "Grilled chicken breast with Colby-Jack cheese, lettuce, tomato, and bacon on a multigrain bun",
    "calories": 520,
    "protein": 37,
    "fat": 22,
    "carbs": 45
  },
  {
    "$id": "cf17",
    "category": "Entrees",
    "name": "Chicken Strips (3-Count)",
    "description": "Crispy breaded chicken tenders, golden fried",
    "calories": 310,
    "protein": 29,
    "fat": 14,
    "carbs": 17
  },
  

  {
    "$id": "cf2",
    "category": "Entrees",
    "name": "Chick-fil-A Chicken Sandwich",
    "description": "Breaded chicken breast served on a toasted buttered bun with pickles",
    "calories": 440,
    "protein": 28,
    "fat": 19,
    "carbs": 41
  },
  {
    "$id": "cf3",
    "category": "Entrees",
    "name": "8-Count Nuggets",
    "description": "Bite-sized pieces of breaded chicken breast, pressure cooked to perfection",
    "calories": 270,
    "protein": 28,
    "fat": 12,
    "carbs": 9
  },
  {
    "$id": "cf4",
    "category": "Sides",
    "name": "Waffle Potato Fries",
    "description": "Crispy waffle-cut potatoes lightly salted",
    "calories": 420,
    "protein": 5,
    "fat": 24,
    "carbs": 45
  },
  {
    "$id": "cf5",
    "category": "Sides",
    "name": "Mac & Cheese",
    "description": "Creamy macaroni and cheese topped with a baked blend of cheeses",
    "calories": 450,
    "protein": 19,
    "fat": 29,
    "carbs": 30
  },
  {
    "$id": "cf6",
    "category": "Salads",
    "name": "Cobb Salad",
    "description": "Chopped nuggets served on fresh greens with cheese, roasted corn, and eggs",
    "calories": 850,
    "protein": 40,
    "fat": 61,
    "carbs": 32
  },
  {
    "$id": "cf7",
    "category": "Treats",
    "name": "Chocolate Chunk Cookie",
    "description": "Large, soft-baked cookie with chunks of chocolate and oats",
    "calories": 350,
    "protein": 4,
    "fat": 16,
    "carbs": 48
  },
  {
    "$id": "cf8",
    "category": "Treats",
    "name": "Hand-Spun Milkshake",
    "description": "Creamy milkshake topped with whipped cream and a cherry",
    "calories": 590,
    "protein": 12,
    "fat": 22,
    "carbs": 85
  },
  {
    "$id": "cf9",
    "category": "Beverages",
    "name": "Freshly Brewed Sweet Tea",
    "description": "Southern-style sweetened iced tea",
    "calories": 120,
    "protein": 0,
    "fat": 0,
    "carbs": 31
  },
  {
    "$id": "cf10",
    "category": "Beverages",
    "name": "Lemonade",
    "description": "Freshly squeezed lemonade made from real lemons",
    "calories": 220,
    "protein": 0,
    "fat": 0,
    "carbs": 58
  },
  {
    "$id": "cf11",
    "category": "8 oz Sauces",
    "name": "Chick-fil-A Sauce",
    "description": "Signature smoky, tangy, and sweet sauce",
    "calories": 1140,
    "protein": 0,
    "fat": 84,
    "carbs": 84
  },
  {
    "$id": "cf12",
    "category": "8 oz Sauces",
    "name": "Polynesian Sauce",
    "description": "Tangy-sweet sauce with bold flavor",
    "calories": 860,
    "protein": 0,
    "fat": 3,
    "carbs": 190
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
                placeholder="Search Chick-Fil-A"
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
