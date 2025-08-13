// Expo Router hook for navigation
import { useRouter } from "expo-router";

// React core
import React, { useState } from "react";

// React Native components
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  VirtualizedList,
} from "react-native";

// DropDownPicker for dropdown input fields
import DropDownPicker from "react-native-dropdown-picker";

// SafeAreaView helps avoid notches or system UI overlapping content
import { SafeAreaView } from "react-native-safe-area-context";

import { useUserHealthStore } from '@/components/zustandStore/UserHealthStore';
import { List } from "react-native-paper";



// ======== DATA CONSTANTS ========
// These are static options for each dropdown input

const weightGoals = [
  { label: "Lose 2 lbs/week", value: -2 },
  { label: "Lose 1.5 lbs/week", value: -1.5 },
  { label: "Lose 1 lb/week", value: -1 },
  { label: "Lose 0.5 lb/week", value: -0.5 },
  { label: "Maintain weight", value: 0 },
  { label: "Gain 1 lb weight", value: 1 },
];

const preferences = [
  { label: "Halal", value: "Halal" },
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Vegan", value: "Vegan" },
  { label: "No Gluten", value: "No Gluten" },
  { label: "No Beef", value: "No Beef" },
];

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

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const activityLevels = [
  { label: "Little to no exercise", value: "sedentary" },
  { label: "1-2 times per week", value: "light" },
  { label: "3-5 times per week", value: "moderate" },
  { label: "More than 5 days", value: "active" },
  { label: "Athlete (7 days)", value: "very_active" },
];


// ======== MAIN SCREEN COMPONENT ========

export default function AdjustGoalsScreen() {


  const {
    ageYears,
    heightCM,
    weight_KG,
    gender,
    activityLevel,
    allergies: selectedAllergies,
    preferences: selectedPreferences,
    goals,

    setAgeYears,
    setHeightCM,
    setWeight_KG,
    setGender,
    setActivityLevel,
    setAllergies,
    setPreferences,
    setGoals,
  } = useUserHealthStore();


  const router = useRouter(); // for navigation

  // --- Dropdown open states ---
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // --- Dropdown values ---
  const [genderValue, setGenderValue] = useState(gender);
  const [activityValue, setActivityValue] = useState(activityLevel);
  const [prefValues, setPrefValues] = useState<string[]>(selectedPreferences);
  const [allergyValues, setAllergyValues] = useState<string[]>(selectedAllergies);
  const [weightValue, setWeightValue] = useState(goals);


  // --- Dropdown items (choices) ---
  const [weightItems, setWeightItems] = useState(weightGoals);
  const [prefItems, setPrefItems] = useState(preferences);
  const [allergyItems, setAllergyItems] = useState(allergies);
  const [genderItems, setGenderItems] = useState(genders);
  const [activityItems, setActivityItems] = useState(activityLevels);

  // --- Text input states ---
  const [age, setAge] = useState(ageYears > 0 ? ageYears.toString() : '');
  const [height, setHeight] = useState(heightCM > 0 ? heightCM.toString() : '');
  const [weight, setWeight] = useState(weight_KG > 0 ? weight_KG.toString() : '');



  const [errors, setErrors] = useState({
    age: '',
    height: '',
    weight: '',
  });

  const handleSave = () => {
    const ageNum = parseInt(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    const newErrors = {
      age: '',
      height: '',
      weight: '',
    };

    if (isNaN(ageNum) || ageNum < 5 || ageNum > 123) {
      newErrors.age = 'Please enter a valid age. (5+)';
    }
    if (isNaN(heightNum) || heightNum < 50 || heightNum > 300) {
      newErrors.height = 'Please enter a valid height';
    }
    if (isNaN(weightNum) || weightNum < 20 || weightNum > 300) {
      newErrors.weight = 'Please wenter a valid weight';
    }

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
    if (hasErrors) return;

    // ✅ Save to Zustand store
    setAgeYears(ageNum);
    setHeightCM(heightNum);
    setWeight_KG(weightNum);
    setGender(genderValue);
    setActivityLevel(activityValue);
    setAllergies(allergyValues);
    setPreferences(prefValues);
    setGoals(weightValue);

    router.back();
  };


  // --- Form layout using a VirtualizedList ---
  const formSections = [
    {
      id: "header",
      render: () => (
        <Text className="text-2xl font-bold mb-6">Adjust Goals</Text>
      ),
    },




    {
      id: "weightGoal",
      render: () => (
        <View style={{ zIndex: openDropdown === 'weightGoal' ? 1000 : 1 }}>
          <Text className="mb-2">Weight Goal</Text>
          <DropDownPicker
            open={openDropdown === 'weightGoal'}
            setOpen={(open) => setOpenDropdown(open ? 'weightGoal' : null)}
            value={weightValue}
            items={weightItems}
            setValue={setWeightValue}
            setItems={setWeightItems}
            placeholder="Select weight goal"
            maxHeight={450}
          />
        </View>
      ),
    },
    {
      id: "preferences",
      render: () => (
        <View style={{ zIndex: openDropdown === 'preferences' ? 1000 : 1, marginTop: 20 }}>
          <Text className="mb-2">Food Preferences</Text>
          <DropDownPicker
            open={openDropdown === 'preferences'}
            setOpen={(open) => setOpenDropdown(open ? 'preferences' : null)}
            multiple={true}
            value={prefValues}
            items={prefItems}
            setValue={setPrefValues}
            setItems={setPrefItems}
            placeholder="Select Preferences"
            mode="BADGE"
          // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
          // theme="DARK"
          />
        </View>
      ),
    },
    {
      id: "allergies",
      render: () => (
        <View style={{ zIndex: openDropdown === 'allergies' ? 1000 : 1, marginTop: 20 }}>
          <Text className="mb-2">Allergies</Text>
          <DropDownPicker
            open={openDropdown === 'allergies'}
            setOpen={(open) => setOpenDropdown(open ? 'allergies' : null)}
            multiple={true}
            value={allergyValues}
            items={allergyItems}
            setValue={setAllergyValues}
            setItems={setAllergyItems}
            placeholder="Select Allergies"
            mode="BADGE"
            maxHeight={450}
            // listMode="SCROLLVIEW"
            // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            // theme="DARK"
          />
        </View>
 

      ),
    },
    {
      id: "yourInfoHeader",
      render: () => (
        <Text className="text-xl font-bold mt-6 mb-4">Your Info</Text>
      ),
    },
    {
      id: "ageHeight",
      render: () => (
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="mb-2">Age</Text>
            <TextInput
              keyboardType="numeric"
              value={age}
              onChangeText={(val) => {
                setAge(val);
                setErrors((prev) => ({ ...prev, age: '' }));
              }}
              placeholder="Enter age"
              className="border border-gray-300 rounded-lg px-4 py-[15px] bg-white text-black"
            />
            {errors.age ? (
              <Text className="text-red-500 text-xs mt-1">{errors.age}</Text>
            ) : null}
          </View>
          <View className="flex-1">
            <Text className="mb-2">Height (cm)</Text>
            <TextInput
              keyboardType="numeric"
              value={height}
              onChangeText={(val) => {
                setHeight(val);
                setErrors((prev) => ({ ...prev, height: '' }));
              }}
              placeholder="Enter height"
              className="border border-gray-300 rounded-lg px-4 py-[15px] bg-white text-black"
            />
            {errors.height ? (
              <Text className="text-red-500 text-xs mt-1">{errors.height}</Text>
            ) : null}
          </View>
        </View>
      ),
    },

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
              setErrors((prev) => ({ ...prev, weight: '' }));
            }}
            placeholder="Enter weight"
            className="border border-gray-300 rounded-lg px-4 py-[15px] bg-white text-black"
          />
          {errors.weight ? (
            <Text className="text-red-500 text-xs mt-1">{errors.weight}</Text>
          ) : null}
        </View>
      ),
    },

    {
      id: "gender",
      render: () => (
        <View style={{ zIndex: openDropdown === 'gender' ? 1000 : 1, marginTop: 20 }}>
          <Text className="mb-2">Gender</Text>
          <DropDownPicker
            open={openDropdown === 'gender'}
            setOpen={(open) => setOpenDropdown(open ? 'gender' : null)}
            value={genderValue}
            items={genderItems}
            setValue={setGenderValue}
            setItems={setGenderItems}
            placeholder="Select gender"
          />
        </View>
      ),
    },
    {
      id: "activityLevel",
      render: () => (
        <View style={{ zIndex: openDropdown === 'activityLevel' ? 1000 : 1, marginTop: 20 }}>
          <Text className="mb-2">Activity Level</Text>
          <DropDownPicker
            open={openDropdown === 'activityLevel'}
            setOpen={(open) => setOpenDropdown(open ? 'activityLevel' : null)}
            value={activityValue}
            items={activityItems}
            setValue={setActivityValue}
            setItems={setActivityItems}
            placeholder="Select activity level"
          />
        </View>
      ),
    },
    {
      id: "saveButton",
      render: () => (
        <TouchableOpacity onPress={handleSave}>
          <View className="mt-6">
            <Text className="bg-blue-600 text-white text-center py-3 rounded-lg text-base font-semibold">
              Save Changes
            </Text>
          </View>
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#C7BEBD]">
      {/* Tapping outside the inputs dismisses the keyboard */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          {/* VirtualizedList is used instead of FlatList for performance */}
          <VirtualizedList
            data={formSections}
            initialNumToRender={4}
            keyExtractor={(item) => item.id}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            renderItem={({ item }) => (
              <View className="px-5 py-[5px] overflow-visible">
                {item.render()}
              </View>
            )}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 10 }}
          />

        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

