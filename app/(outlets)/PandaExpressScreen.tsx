import React, { use, useEffect, useRef, useState } from "react";
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
import { DatabaseID, databases, pandaExpressCollectionID } from "@/appwriteConfig";


const restaurant = {
  name: "Panda Express",
  address: "118 College Drive",
  status: "Open now",
  pickup: "Ready in 4 min",
  line: "No line",
  image: OutletThumbnails.pandaExpress,
};

;
//Add an UI element to show these options when an item with options is clicked. Keep it open by default
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
  const [pandaMenuData, setPandaMenuData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments(
          DatabaseID,
          pandaExpressCollectionID
        );
        const formattedResponse = response.documents.map((doc)=>({
          ...doc, 
          options:
          typeof doc.options == "string"
            ? JSON.parse(doc.options)
            : doc.options || null
        }));
        setPandaMenuData(formattedResponse)
        console.log("Fetched menu items:", formattedResponse);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const groupedData = groupByCategory(pandaMenuData);
  const categories = Object.keys(groupedData);

  const scrollRef = useRef(null);
  const [sectionPositions, setSectionPositions] = useState({});
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // For the options popup
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCategoryPress = (category) => {
    setShowCategoryModal(false);
    if (scrollRef.current && sectionPositions[category] !== undefined) {
      scrollRef.current.scrollTo({ y: sectionPositions[category], animated: true });
    }
  };

  const handleItemPress = (item) => {
    if (item.options) {
      setSelectedItem(item);
      setOptionModalVisible(true);
    } else {
      console.log("Added:", item.name);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <Image
        source={restaurant.image}
        style={{ width: "100%", height: 230, marginBottom: 0 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, marginTop: -20 }}>
        <ScrollView ref={scrollRef}>
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
              <TextInput placeholder="Search Panda Express" style={{ flex: 1, marginLeft: 8 }} />
            </View>

            {/* Categories Button */}
            <TouchableOpacity onPress={() => setShowCategoryModal(true)} style={{ marginTop: 12 }}>
              <Text style={{ color: "#6b21a8", fontWeight: "600" }}>Categories ▼</Text>
            </TouchableOpacity>
          </View>

          {/* Menu List */}
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
                    <TouchableOpacity
                      style={{ flex: 1, paddingRight: 12 }}
                      onPress={() => handleItemPress(item)}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
                      <Text style={{ color: "#555", marginTop: 2 }}>{item.description}</Text>
                      {item.calories && (
                        <Text style={{ color: "#888", fontSize: 12, marginTop: 4 }}>
                          {item.calories} cal
                        </Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        backgroundColor: "#F4C542",
                        padding: 10,
                        borderRadius: 50,
                      }}
                      onPress={() => handleItemPress(item)}
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

      {/* --- Category Modal --- */}
      <Modal visible={showCategoryModal} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setShowCategoryModal(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Categories</Text>
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

      {/* --- Options Modal (Scrollable + No white block) --- */}
      <Modal visible={optionModalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Pressable
            style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
            onPress={() => setOptionModalVisible(false)}
          />
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              paddingVertical: 20,
              paddingHorizontal: 20,
              width: "100%",
              maxHeight: "80%",
              overflow: "hidden",
            }}
          >
            {selectedItem && (
              <>
                <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
                  {selectedItem.name} Options
                </Text>

                <ScrollView
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  {Object.keys(selectedItem.options || {}).map((group) => (
                    <View key={group} style={{ marginBottom: 16 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          marginBottom: 8,
                          color: "#6b21a8",
                        }}
                      >
                        {group}
                      </Text>
                      {selectedItem.options[group].map((opt, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#f9f9f9",
                            padding: 10,
                            borderRadius: 8,
                            marginBottom: 6,
                          }}
                        >
                          <View style={{ flexShrink: 1, paddingRight: 8 }}>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>{opt.name}</Text>
                            <Text style={{ fontSize: 12, color: "#666" }}>
                              {opt.calories} cal | P: {opt.protein}g | F: {opt.fat}g | C: {opt.carbs}g
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => console.log("Added option:", opt.name)}
                            style={{
                              backgroundColor: "#F4C542",
                              padding: 8,
                              borderRadius: 50,
                            }}
                          >
                            <Plus color="white" size={18} />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  ))}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
