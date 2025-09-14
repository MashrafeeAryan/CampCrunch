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
import { router } from "expo-router";
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

  // 🔥 Auto-updating date
  const [today, setToday] = useState(moment().format("YYYY-MM-DD"));
  const [todayDifferentFormat, setTodayDifferentFormat] = useState(
    moment().format("MM/DD/YYYY")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(moment().format("YYYY-MM-DD"));
      setTodayDifferentFormat(moment().format("MM/DD/YYYY"));
    }, 60 * 1000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

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

  // 🔥 Utility to detect meal type
  const getMealType = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const day = now.getDay(); // Sunday=0, Monday=1, ... Saturday=6

    const isWeekend = day === 0 || day === 6;

    const isBetween = (startHour, startMinute, endHour, endMinute) => {
      const nowMinutes = currentHour * 60 + currentMinute;
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      return nowMinutes >= startMinutes && nowMinutes < endMinutes;
    };

    if (!isWeekend) {
      // Mon - Fri
      if (isBetween(7, 0, 10, 30)) return "Breakfast";
      if (isBetween(10, 30, 15, 30)) return "Lunch";
      if (isBetween(15, 30, 20, 0)) return "Dinner";
    } else {
      // Sat - Sun
      if (isBetween(9, 0, 14, 0)) return "Breakfast"; // brunch merged into breakfast
      if (isBetween(10, 30, 15, 30)) return "Lunch";
      if (isBetween(15, 30, 19, 0)) return "Dinner";
    }

    return "Breakfast"; // fallback
  };

  // 🔥 Meal type in state, auto-updating
  const [currentMealType, setCurrentMealType] = useState(getMealType());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMealType(getMealType());
    }, 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const handleAddToPlan = (
    proteinVal: number,
    fatVal: number,
    carbsVal: number,
    caloriesVal: number,
    foodName: string,
    focusedTab: string,
    today: string
  ) => {
    setProteinConsumed(proteinConsumed + Number(proteinVal));
    setFatConsumed(fatConsumed + Number(fatVal));
    setCarbsConsumed(carbsConsumed + Number(carbsVal));
    setCaloriesConsumed(caloriesConsumed + Number(caloriesVal));

    const newFoodItem = { foodName, calories: caloriesVal };

    const updatedMap = { ...foodMap };

    if (!updatedMap[today]) {
      updatedMap[today] = {};
    }

    if (!updatedMap[today][focusedTab]) {
      updatedMap[today][focusedTab] = [];
    }

    updatedMap[today][focusedTab].push(newFoodItem);

    setFoodMap(updatedMap);

    Toast.show({
      type: "success",
      text1: `${foodName} added to ${focusedTab}`,
      position: "bottom",
      visibilityTime: 2000,
      bottomOffset: 60,
    });
  };

  const fetchFoods = useCallback(
    async (isRefresh = false) => {
      if (loading || (!hasMore && !isRefresh)) return;
      setLoading(true);

      try {
        const queries = [
          Query.limit(PAGE_LIMIT),
          Query.equal("date", todayDifferentFormat),
          Query.equal("foodType", currentMealType), // 🔥 filter by meal type
          Query.orderAsc("foodName"),
        ];

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
    [query, lastDoc, hasMore, loading, todayDifferentFormat, currentMealType]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFoods([]);
      setLastDoc(null);
      setHasMore(true);
      fetchFoods(true);
    }, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query, todayDifferentFormat, currentMealType]); // 🔥 refresh when meal type changes

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
              currentMealType, // 🔥 use live-updating meal type
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
