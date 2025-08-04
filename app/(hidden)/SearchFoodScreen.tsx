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
import { DatabaseID, databases, foodDatasetCollectionID } from "@/appwriteConfig";

const PAGE_LIMIT = 20;

export default function SearchFoodScreen() {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const renderFoodItem = ({ item }) => (
    <View className="w-[48%] bg-white rounded-xl shadow p-3 mb-4 mr-2">
      <Text className="font-bold text-base mb-1">
        {item.foodName || "Unnamed Food"}
      </Text>
      <Text className="text-sm">
        Calories: {typeof item.calories === "number" ? item.calories.toFixed(0) : "N/A"}
      </Text>
      <Text className="text-sm">
        Carbs: {typeof item.carbohydrates === "number" ? item.carbohydrates.toFixed(0) : "N/A"}
      </Text>
      <Text className="text-sm">
        Protein: {typeof item.protein === "number" ? `${item.protein.toFixed(0)}g` : "N/A"}
      </Text>
      <Text className="text-sm">
        Fat: {typeof item.fat === "number" ? `${item.fat.toFixed(0)}g` : "N/A"}
      </Text>
      <View className="absolute bottom-2 right-2">
        <Ionicons name="fast-food" size={28} color="#f59e0b" />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-4">
        <Ionicons name="arrow-back" size={24} color="black" />
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

      {/* Food Grid */}
      <FlatList
        className="mt-4 px-4"
        data={foods}
        keyExtractor={(item) => item.$id}
        numColumns={2}
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
    </SafeAreaView>
  );
}
 