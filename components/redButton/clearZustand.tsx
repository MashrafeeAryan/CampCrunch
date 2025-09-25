import React from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserUIStore } from "../zustandStore/UiStore";
import { useUserAuthStore } from "../zustandStore/AuthStore";
import { useUserHealthStore } from "../zustandStore/UserHealthStore";

const ClearZustandButton = () => {
  const resetAuth = useUserAuthStore((s) => s.reset);
  const resetHealth = useUserHealthStore((s) => s.reset);
  const resetUI = useUserUIStore((s) => s.reset);

  const handleClearAll = async () => {
    Alert.alert(
      "Reset App Data",
      "This will clear ALL saved data and log you out. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, clear",
          style: "destructive",
          onPress: async () => {
            try {
              // clear Zustand memory
              resetAuth();
              resetHealth();
              resetUI();               
              // clear AsyncStorage completely (wipe persisted state)
              await AsyncStorage.clear();

              Alert.alert("✅ Cleared", "All Zustand + storage data has been reset.");
            } catch (err) {
              console.log("Error clearing data:", err);
              Alert.alert("❌ Error", "Something went wrong clearing data.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ marginTop: 20, padding: 10 }}>
      <TouchableOpacity
        onPress={handleClearAll}
        style={{
          backgroundColor: "red",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Clear All Data
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClearZustandButton;
