import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Query } from "appwrite";
import {
  DatabaseID,
  databases,
  foodDatasetCollectionID,
} from "@/appwriteConfig";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";
import moment from "moment";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";
import ViewFoodDescriptionComponent from "@/components/homePageComponents/ViewFoodDescriptionComponent";

const PAGE_LIMIT = 20;

export default function SearchFoodScreen() {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dailyCalorieAdjustment = useUserHealthStore(
    (s) => s.dailyCalorieAdjustment
  );
  const diet = useUserHealthStore((s) => s.dietRecommendation);
  const protein = useUserHealthStore((s) => s.protein);
  const carbs = useUserHealthStore((s) => s.carbs);
  const fat = useUserHealthStore((s) => s.fat);
  const fatConsumed = useUserHealthStore((s) => s.fatConsumed);
  const proteinConsumed = useUserHealthStore((s) => s.proteinConsumed);
  const carbsConsumed = useUserHealthStore((s) => s.carbsConsumed);
  const caloriesConsumed = useUserHealthStore((s) => s.caloriesConsumed);
  const foodMap = useUserHealthStore((s) => s.foodMap);

  const setProteinConsumed = useUserHealthStore((s) => s.setProteinConsumed);
  const setCarbsConsumed = useUserHealthStore((s) => s.setCarbsConsumed);
  const setCaloriesConsumed = useUserHealthStore((s) => s.setCaloriesConsumed);
  const setFatConsumed = useUserHealthStore((s) => s.setFatConsumed);
  const setFoodMap = useUserHealthStore((s) => s.setFoodMap);
  const today = moment().format("YYYY-MM-DD");

  const [showViewFoodComponent, setShowViewFoodComponent] = useState(false);
  const [selectedFood, setSelectedFood] = useState<{
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
    foodName: string;
    allergies: string[];
    description: string;
  } | null>(null);

  const handleAddToPlan = (
    proteinVal: number,
    fatVal: number,
    carbsVal: number,
    caloriesVal: number,
    foodName: string,
    focusedTab: string,
    today: string
  ) => {
    // Update nutrition totals
    setProteinConsumed(proteinConsumed + Number(proteinVal));
    setFatConsumed(fatConsumed + Number(fatVal));
    setCarbsConsumed(carbsConsumed + Number(carbsVal));
    setCaloriesConsumed(caloriesConsumed + Number(caloriesVal));

    console.log(focusedTab);
    // Prepare new food item
    const newFoodItem = {
      foodName,
      calories: caloriesVal,
    };

    // Copy current map or initialize
    const updatedMap = { ...foodMap };

    // Ensure date entry exists
    if (!updatedMap[today]) {
      updatedMap[today] = {};
    }

    // Ensure meal type entry exists
    if (!updatedMap[today][focusedTab]) {
      updatedMap[today][focusedTab] = [];
    }

    // Add new food to the correct list
    updatedMap[today][focusedTab].push(newFoodItem);

    // Save updated map to Zustand
    setFoodMap(updatedMap);
    console.log("This function works");

    // Show toast
    Toast.show({
      type: "success",
      text1: `${foodName} added`,
      position: "bottom",
      visibilityTime: 2000,
      bottomOffset: 60,
      props: {},
    });
  };
  const fetchFoods = useCallback(
    async (isRefresh = false) => {
      if (loading || (!hasMore && !isRefresh)) return;
      setLoading(true);

      try {
        const queries = [Query.limit(PAGE_LIMIT), Query.orderAsc("foodName")];

        if (query.trim()) {
          queries.push(Query.search("foodName", query));
        }

        if (lastDoc && !isRefresh) {
          queries.push(Query.cursorAfter(lastDoc.$id));
        }

        const res = await databases.listDocuments(
          DatabaseID,
          foodDatasetCollectionID,
          queries
        );

        const newDocs = res.documents;

        if (isRefresh) {
          setFoods(newDocs);
        } else {
          setFoods((prev) => [...prev, ...newDocs]);
        }

        if (newDocs.length < PAGE_LIMIT) {
          setHasMore(false);
        } else {
          setLastDoc(newDocs[newDocs.length - 1]);
        }
      } catch (err) {
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [query, lastDoc, hasMore, loading]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFoods([]);
      setLastDoc(null);
      setHasMore(true);
      fetchFoods(true);
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const handleRefresh = () => {
    setRefreshing(true);
    setFoods([]);
    setLastDoc(null);
    setHasMore(true);
    fetchFoods(true);
  };
  const handleShowView = (
    proteinVal: number,
    fatVal: number,
    carbsVal: number,
    caloriesVal: number,
    foodName: string,
    allergiesList: string[],
    shortDescription: string
  ) => {
    setSelectedFood({
      protein: proteinVal,
      fat: fatVal,
      carbs: carbsVal,
      calories: caloriesVal,
      foodName,
      allergies: allergiesList,
      description: shortDescription,
    });
    setShowViewFoodComponent(true);
  };

  // ✅ Updated list-style card UI
  const renderFoodItem = ({ item }) => (
    <View className="bg-white p-4 mb-3 rounded-xl shadow border border-gray-200">
      <Text className="text-base font-bold mb-1">
        {item.foodName || "Unnamed Food"}
      </Text>

      <View className="flex-row flex-wrap space-x-1">
        <Text className="text-xs text-gray-700">
          {typeof item.calories === "number" ? item.calories.toFixed(0) : "N/A"}{" "}
          cal
        </Text>
        <Text className="text-xs text-gray-700">•</Text>
        <Text className="text-xs text-gray-700">
          {typeof item.protein === "number"
            ? `${item.protein.toFixed(0)}g protein`
            : "N/A"}
        </Text>
        <Text className="text-xs text-gray-700">•</Text>
        <Text className="text-xs text-gray-700">
          {typeof item.carbohydrates === "number"
            ? `${item.carbohydrates.toFixed(0)}g carbs`
            : "N/A"}
        </Text>
        <Text className="text-xs text-gray-700">•</Text>
        <Text className="text-xs text-gray-700">
          {typeof item.fat === "number" ? `${item.fat.toFixed(0)}g fat` : "N/A"}
        </Text>
      </View>

      {/* Action buttons */}
      <View className="flex-row space-x-5">
        <TouchableOpacity
          className="mt-4"
          onPress={() => {
            handleShowView(
              Number(item.protein),
              Number(item.fat),
              Number(item.carbohydrates),
              Number(item.calories),
              item.foodName,
              item.allergies,
              item.shortDescription
            );
          }}
        >
          <Text className="text-[#D4AF37] font-bold">View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4"
          onPress={() => {
            handleAddToPlan(
              Number(item.protein),
              Number(item.fat),
              Number(item.carbohydrates),
              Number(item.calories),
              item.foodName,
              item.foodType, // coming from params now
              today
            );
          }}
        >
          <Text className="text-[#D4AF37] font-bold">Add to Plan ➔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-4">
        <TouchableOpacity
          onPress={() => {
            router.push("../CalendarScreen");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="absolute left-0 right-0 items-center">
          <Text className="text-lg font-bold">Add Food</Text>
        </View>
      </View>

      {/* Search */}
      <View className="flex-row items-center bg-gray-200 rounded-xl px-4 py-2 mx-4 mt-4">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          className="ml-3 flex-1 text-base"
          placeholder="Search food..."
          placeholderTextColor="gray"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Food List */}
      <FlatList
        className="mt-4 px-4"
        data={foods}
        keyExtractor={(item) => item.$id}
        renderItem={renderFoodItem}
        onEndReached={() => fetchFoods()}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loading ? (
            <View className="py-4">
              <ActivityIndicator size="small" color="gray" />
            </View>
          ) : null
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      {selectedFood && (
        <ViewFoodDescriptionComponent
          showViewFoodComponent={showViewFoodComponent}
          setShowViewFoodComponent={setShowViewFoodComponent}
          foodName={selectedFood.foodName}
          calories={selectedFood.calories}
          carbs={selectedFood.carbs}
          protein={selectedFood.protein}
          fat={selectedFood.fat}
          description={selectedFood.description}
          allergies={selectedFood.allergies}
        />
      )}
    </SafeAreaView>
  );
}
