// /app/screens/MenuItemScreen.js
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function MenuItemScreen({ route }) {
  const { item } = route.params; // Retrieve item details passed from MenuScreen
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState([]);
  const [sides, setSides] = useState([]);
  const [sauces, setSauces] = useState([]);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.name}</Text>
      <Text style={{ marginBottom: 12 }}>{item.description}</Text>

      {/* Quantity Selector */}
      <QuantitySelector value={quantity} onChange={setQuantity} />

      {/* Size Choice */}
      <ChoiceGroup
        title="Size"
        subtitle="Choose one (Required)"
        options={[
          { label: "Small" },
          { label: "Medium", price: 3.3 },
          { label: "Large", price: 6.0 },
        ]}
        multiple={false}
        required={true}
        selected={size}
        onChange={setSize}
      />

      {/* Side Choice */}
      <ChoiceGroup
        title="Side"
        subtitle="Choose 1-2 (Required)"
        options={[
          { label: "Chow Mein", cal: 510 },
          { label: "Fried Rice", cal: 520 },
          { label: "White Steamed Rice", cal: 380 },
          { label: "Super Greens", cal: 80 },
        ]}
        multiple={true}
        required={true}
        min={1}
        max={2}
        selected={sides}
        onChange={setSides}
      />

      {/* Sauce Choice */}
      <ChoiceGroup
        title="Sauce"
        subtitle="Choose up to 4 (Optional)"
        options={[
          { label: "Sweet & Sour" },
          { label: "Teriyaki" },
          { label: "Soy Sauce" },
          { label: "Chili Sauce" },
        ]}
        multiple={true}
        max={4}
        selected={sauces}
        onChange={setSauces}
      />

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#6b21a8",
          padding: 16,
          borderRadius: 12,
          marginTop: 20,
          alignItems: "center",
        }}
        onPress={() =>
          console.log("Added to cart:", { item, quantity, size, sides, sauces })
        }
      >
        <Text style={{ color: "white", fontSize: 18 }}>Add to Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
