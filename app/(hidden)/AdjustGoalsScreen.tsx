// Import the router hook from Expo Router, used for navigating between screens
import { useRouter } from "expo-router";

// Import React and the useState hook for managing local component state
import React, { useState } from "react";

// Import fundamental React Native components for UI building
import {
  Text,                        // Displays text labels
  View,                        // Basic container for layout
  TouchableWithoutFeedback,    // Detects taps without showing a visual effect
  Keyboard,                    // Controls the software keyboard
  TouchableOpacity,            // Touchable element with opacity feedback
  TextInput,                   // User text input field
  KeyboardAvoidingView,        // Automatically moves UI when keyboard appears
  Platform,                    // Detects platform (iOS/Android)
  VirtualizedList,             // Efficient list renderer for large/dynamic lists
} from "react-native";

// Import a third-party dropdown component for selection fields
import DropDownPicker from "react-native-dropdown-picker";

// Import SafeAreaView for rendering UI inside safe screen boundaries (notch, status bar, etc.)
import { SafeAreaView } from "react-native-safe-area-context";

// Import Zustand store hooks and utility functions (business logic layer)
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import { List } from "react-native-paper"; // UI component library (unused here)
import { useUserAuthStore } from "@/components/zustandStore/AuthStore";
import { calculateCalories } from "@/utils/CalculateCalories";
import { updateHealthInfo } from "@/components/databaseComponents/updateHealthInfo";
import { UpdateDatabaseInfo } from "@/components/databaseComponents/updateDatabaseInfo";

// ======== DATA CONSTANTS ========
// Predefined static options for dropdowns in the form

// Weight management goal options
const weightGoals = [
  { label: "Lose 2 lbs/week", value: -2 },
  { label: "Lose 1.5 lbs/week", value: -1.5 },
  { label: "Lose 1 lb/week", value: -1 },
  { label: "Lose 0.5 lb/week", value: -0.5 },
  { label: "Maintain weight", value: 0 },
  { label: "Gain 1 lb weight", value: 1 },
];

// Dietary preference options
const preferences = [
  { label: "Halal", value: "Halal" },
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Vegan", value: "Vegan" },
  { label: "No Gluten", value: "No Gluten" },
  { label: "No Beef", value: "No Beef" },
];

// Allergy options
const allergies = [
  { label: "Peanuts", value: "Peanuts" },
  { label: "Milk", value: "Milk" },
  { label: "Fish", value: "Fish" },
  { label: "Soy", value: "Soy" },
  { label: "Wheat", value: "Wheat" },
  { label: "Eggs", value: "Eggs" },
  { label: "Sesame", value: "Sesame" },
  { label: "Tree Nuts", value: "Tree Nuts" },
  { label: "Shellfish", value: "Shellfish" },
];

// Gender options
const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

// Physical activity level options
const activityLevels = [
  { label: "Little to no exercise", value: "sedentary" },
  { label: "1-2 times per week", value: "light" },
  { label: "3-5 times per week", value: "moderate" },
  { label: "More than 5 days", value: "active" },
  { label: "Athlete (7 days)", value: "very_active" },
];

// ======== MAIN SCREEN COMPONENT ========
// Main UI screen for adjusting personal health and diet goals
export default function AdjustGoalsScreen() {
  // ---- READ values from Zustand stores (global state) ----
  // Authentication
  const userID = useUserAuthStore((s) => s.userID);

  // Health-related info
  const ageYears = useUserHealthStore((s) => s.ageYears);
  const heightCM = useUserHealthStore((s) => s.heightCM);
  const heightInches = useUserHealthStore((s) => s.heightInches);
  const weight_KG = useUserHealthStore((s) => s.weight_KG);
  const weight_lbs = useUserHealthStore((s) => s.weight_lbs);
  const gender = useUserHealthStore((s) => s.gender);
  const activityLevel = useUserHealthStore((s) => s.activityLevel);
  const selectedAllergies = useUserHealthStore((s) => s.allergies);
  const selectedPreferences = useUserHealthStore((s) => s.preferences);
  const goals = useUserHealthStore((s) => s.goals);

  // Nutritional data
  const bmr = useUserHealthStore((s) => s.bmr);
  const maintenance = useUserHealthStore((s) => s.maintenance);
  const protein = useUserHealthStore((s) => s.protein);
  const carbs = useUserHealthStore((s) => s.carbs);
  const fat = useUserHealthStore((s) => s.fat);

  // ---- SETTER functions from Zustand stores ----
  const setAgeYears = useUserHealthStore((s) => s.setAgeYears);
  const setHeightCM = useUserHealthStore((s) => s.setHeightCM);
  const setHeightInches = useUserHealthStore((s) => s.setHeightInches);
  const setWeight_KG = useUserHealthStore((s) => s.setWeight_KG);
  const setWeight_lbs = useUserHealthStore((s) => s.setWeight_lbs);
  const setGender = useUserHealthStore((s) => s.setGender);
  const setActivityLevel = useUserHealthStore((s) => s.setActivityLevel);
  const setAllergies = useUserHealthStore((s) => s.setAllergies);
  const setPreferences = useUserHealthStore((s) => s.setPreferences);
  const setGoals = useUserHealthStore((s) => s.setGoals);

  const setBMR = useUserHealthStore((s) => s.setBMR);
  const setMaintenance = useUserHealthStore((s) => s.setMaintenance);
  const setProtein = useUserHealthStore((s) => s.setProtein);
  const setCarbs = useUserHealthStore((s) => s.setCarbs);
  const setFat = useUserHealthStore((s) => s.setFat);
  const setDailyCalorieAdjustment = useUserHealthStore(
    (s) => s.setDailyCalorieAdjustment
  );
  const setDietRecommendation = useUserHealthStore(
    (s) => s.setDietRecommendation
  );

  // Router hook for navigation between app screens
  const router = useRouter();

  // ---- LOCAL UI state ----
  // Track which dropdown is currently open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Current selected dropdown values (defaulting to store values)
  const [genderValue, setGenderValue] = useState(gender);
  const [activityValue, setActivityValue] = useState(activityLevel);
  const [prefValues, setPrefValues] = useState<string[]>(selectedPreferences);
  const [allergyValues, setAllergyValues] = useState<string[]>(selectedAllergies);
  const [weightValue, setWeightValue] = useState(goals);

  // Dropdown option items (copied from constants into local state so they can be updated)
  const [weightItems, setWeightItems] = useState(weightGoals);
  const [prefItems, setPrefItems] = useState(preferences);
  const [allergyItems, setAllergyItems] = useState(allergies);
  const [genderItems, setGenderItems] = useState(genders);
  const [activityItems, setActivityItems] = useState(activityLevels);

  // --- Text input states ---
  const [age, setAge] = useState(ageYears > 0 ? ageYears.toString() : '');
  const [height, setHeight] = useState(heightCM > 0 ? heightCM.toString() : '');
  const [weight, setWeight] = useState(weight_KG > 0 ? weight_KG.toString() : '');

  // Color of the input and Dropdown box
  const boxColor = '#D3D3D3'


  // Track validation error messages for input fields
  const [errors, setErrors] = useState({
    age: "",
    height: "",
    weight: "",
  });

  // Example function for saving user input (currently just logs values)
  const handleUpdateUserData = async () => {
    console.log("Goals: ", weightValue);
    console.log("Preferences: ", prefValues);
    console.log("Gender", genderValue);
    console.log("Activity Level", activityValue);
    console.log("Allergies", allergyValues );
    console.log("Age", age);
    console.log("Height", height);
    console.log("Weight", weight);
    console.log("This function runs!");
  };

  // ---- UI FORM CONFIG ----
  // Define sections of the form, each with an ID and a render function
  const formSections = [
    // Title header
    {
      id: "header",
      render: () => (
        <Text className="text-2xl font-bold mb-6">Adjust Goals</Text>
      ),
    },
    // Weight goal dropdown
    {
      id: "weightGoal",
      render: () => (
        <View style={{ zIndex: openDropdown === "weightGoal" ? 1000 : 1 }}>
          <Text className="mb-2">Weight Goal</Text>
          <DropDownPicker
            open={openDropdown === "weightGoal"}
            setOpen={(open) => setOpenDropdown(open ? "weightGoal" : null)}
            value={weightValue}
            items={weightItems}
            setValue={setWeightValue}
            setItems={setWeightItems}
            placeholder="Select weight goal"
            maxHeight={450}
            style={{backgroundColor:boxColor}}

          />
        </View>
      ),
    },
    // Preferences dropdown (multi-select)
    {
      id: "preferences",
      render: () => (
        <View
          style={{
            zIndex: openDropdown === "preferences" ? 1000 : 1,
            marginTop: 20,
          }}
        >
          <Text className="mb-2">Food Preferences</Text>
          <DropDownPicker
            open={openDropdown === "preferences"}
            setOpen={(open) => setOpenDropdown(open ? "preferences" : null)}
            multiple={true}
            value={prefValues}
            items={prefItems}
            setValue={setPrefValues}
            setItems={setPrefItems}
            placeholder="Select Preferences"
            mode="BADGE"
            style={{backgroundColor:boxColor}}
          // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
          // theme="DARK"

          />
        </View>
      ),
    },
    // Allergies dropdown (multi-select)
    {
      id: "allergies",
      render: () => (
        <View
          style={{
            zIndex: openDropdown === "allergies" ? 1000 : 1,
            marginTop: 20,
          }}
        >
          <Text className="mb-2">Allergies</Text>
          <DropDownPicker
            open={openDropdown === "allergies"}
            setOpen={(open) => setOpenDropdown(open ? "allergies" : null)}
            multiple={true}
            value={allergyValues}
            items={allergyItems}
            setValue={setAllergyValues}
            setItems={setAllergyItems}
            placeholder="Select Allergies"
            mode="BADGE"
            maxHeight={450}
            style={{backgroundColor:'#E0E0E0'}}
            // listMode="SCROLLVIEW"
            // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            // theme="DARK"

          />
        </View>
      ),
    },
    // Info section header
    {
      id: "yourInfoHeader",
      render: () => (
        <Text className="text-xl font-bold mt-6 mb-4">Your Info</Text>
      ),
    },
    // Age + Height text inputs
    {
      id: "ageHeight",
      render: () => (
        <View className="flex-row gap-4">
          {/* Age input field */}
          <View className="flex-1">
            <Text className="mb-2">Age</Text>
            <TextInput
              keyboardType="numeric"
              value={age}
              onChangeText={(val) => {
                setAge(val);
                setErrors((prev) => ({ ...prev, age: "" }));
              }}
              placeholder="Enter age"
              className="border border-1 border-black rounded-lg px-4 py-[15px] text-black"
              style={{backgroundColor:'#E0E0E0'}}
            />
            {/* Error message for invalid age */}
            {errors.age ? (
              <Text className="text-red-500 text-xs mt-1">{errors.age}</Text>
            ) : null}
          </View>
          {/* Height input field */}
          <View className="flex-1">
            <Text className="mb-2">Height (cm)</Text>
            <TextInput
              keyboardType="numeric"
              value={height}
              onChangeText={(val) => {
                setHeight(val);
                setErrors((prev) => ({ ...prev, height: "" }));
              }}
              placeholder="Enter height"
              className="border border-1 border-black rounded-lg px-4 py-[15px] text-black"
              style={{backgroundColor:'#E0E0E0'}}
            />
            {/* Error message for invalid height */}
            {errors.height ? (
              <Text className="text-red-500 text-xs mt-1">{errors.height}</Text>
            ) : null}
          </View>
        </View>
      ),
    },
    // Weight text input
    {
      id: "weight",
      render: () => (
        <View className="mt-4">
          <Text className="mb-2">Weight (kg)</Text>
          <TextInput
            keyboardType="numeric"
            value={weight}
            onChangeText={(val) => {
              setWeight(val);
              setErrors((prev) => ({ ...prev, weight: "" }));
            }}
            placeholder="Enter weight"
            className="border border-1 border-black rounded-lg px-4 py-[15px] text-black"
            style={{backgroundColor:'#E0E0E0'}}
          />
          {/* Error message for invalid weight */}
          {errors.weight ? (
            <Text className="text-red-500 text-xs mt-1">{errors.weight}</Text>
          ) : null}
        </View>
      ),
    },
    // Gender dropdown
    {
      id: "gender",
      render: () => (
        <View
          style={{
            zIndex: openDropdown === "gender" ? 1000 : 1,
            marginTop: 20,
          }}
        >
          <Text className="mb-2">Gender</Text>
          <DropDownPicker
            open={openDropdown === "gender"}
            setOpen={(open) => setOpenDropdown(open ? "gender" : null)}
            value={genderValue}
            items={genderItems}
            setValue={setGenderValue}
            setItems={setGenderItems}
            placeholder="Select gender"
            style={{backgroundColor:boxColor}}
          />
        </View>
      ),
    },
    // Activity level dropdown
    {
      id: "activityLevel",
      render: () => (
        <View
          style={{
            zIndex: openDropdown === "activityLevel" ? 1000 : 1,
            marginTop: 20,
          }}
        >
          <Text className="mb-2">Activity Level</Text>
          <DropDownPicker
            open={openDropdown === "activityLevel"}
            setOpen={(open) => setOpenDropdown(open ? "activityLevel" : null)}
            value={activityValue}
            items={activityItems}
            setValue={setActivityValue}
            setItems={setActivityItems}
            placeholder="Select activity level"
            style={{backgroundColor:boxColor}}
          />
        </View>
      ),
    },
    // Save button
    {
      id: "saveButton",
      render: () => (
        <TouchableOpacity onPress={handleUpdateUserData}>
          <View className="mt-6">
            <Text className="bg-blue-600 text-white text-center py-3 rounded-lg text-base font-semibold">
              Save Changes
            </Text>
          </View>
        </TouchableOpacity>
      ),
    },
  ];

  // ---- RENDER SCREEN ----
  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      {/* Tapping outside the inputs dismisses the keyboard */}
  
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          {/* Render the form as a VirtualizedList for performance on long lists */}
          <VirtualizedList
            data={formSections}                        // Section definitions
            initialNumToRender={4}                     // Render first 4 items initially
            keyExtractor={(item) => item.id}           // Unique key for each section
            getItemCount={(data) => data.length}       // Total number of items
            getItem={(data, index) => data[index]}     // Get item by index
            renderItem={({ item }) => (                // Render each form section
              <View className="px-5 py-[5px] overflow-visible">
                {item.render()}
              </View>
            )}
            keyboardShouldPersistTaps="handled"        // Allow taps while keyboard open
            contentContainerStyle={{ paddingBottom: 10 }} // Add padding at bottom
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
