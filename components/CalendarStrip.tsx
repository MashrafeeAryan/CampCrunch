// React Native core components used for layout, interaction, and measurement
import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';
import {
  Dimensions // Used to get screen width for responsive sizing
  ,






  FlatList, // A performant horizontal/vertical scrolling list
  Text, // Used to render text on the screen
  TouchableOpacity, // Makes items clickable/tappable
  View,Image
} from "react-native";
import streakIcons from "../assets/images/ProfilePageIcons";

// React hooks for managing component state, references, and memoized values
import { useMemo, useRef, useState } from "react";

// Moment.js is used to easily work with and format dates
import moment from "moment";

// Ionicons library for displaying arrow icons in the calendar

// Get the full width of the device screen so we can layout the calendar accordingly
const screenWidth = Dimensions.get("window").width;

// CalendarStrip component - shows a horizontal, paginated calendar with arrows
const CalendarStrip = () => {
  // Get today's date in "YYYY-MM-DD" format
  const today = moment().format("YYYY-MM-DD");

  // Keeps track of the currently selected day (highlighted)
  const [focusedDay, setFocusedDay] = useState(today);

  // Number of 5-day chunks to initially generate (12 chunks = 60 days)
  const [chunkCount, setChunkCount] = useState(12);

  // Reference to the FlatList, so we can programmatically scroll it left/right
  const flatListRef = useRef(null);

  // Compute the list of 5-day chunks using memoization
  const pagedDays = useMemo(() => {
    // Start the range from 30 days before today (chunkCount / 2 * 5 days)
    const start = moment().subtract((chunkCount / 2) * 5, "days");

    // Create a flat array of all days needed
    const allDays = Array.from({ length: chunkCount * 5 }, (_, i) =>
      start.clone().add(i, "days")
    );

    // Break the full list into smaller chunks of 5 days each
    const chunks = [];
    for (let i = 0; i < allDays.length; i += 5) {
      chunks.push(allDays.slice(i, i + 5));
    }

    return chunks; // Final list of 5-day chunks
  }, [chunkCount]);

  // Find the index of the chunk that contains today's date
  const initialChunkIndex = useMemo(() => {
    return pagedDays.findIndex((chunk) =>
      chunk.some((d) => d.format("YYYY-MM-DD") === today)
    );
  }, [pagedDays, today]);

  // Keeps track of which chunk (page) the user is currently viewing
  const [currentChunkIndex, setCurrentChunkIndex] = useState(initialChunkIndex);

  // Function to scroll the calendar left or right by chunk index
  const scrollToIndex = (index) => {
    if (index < 0) return; // prevent scrolling before the beginning

    // If the user scrolls beyond current available chunks, load more into memory
    if (index >= pagedDays.length - 1) {
      setChunkCount((prev) => prev + 6); // Add 6 more chunks (30 more days)
      return;
    }

    // Scroll to the specified index (page)
    setCurrentChunkIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  // Width available for the calendar dates (after accounting for left and right arrows)
  const arrowWidth = 50;
  const calendarWidth = screenWidth - arrowWidth * 2;
  const dateBoxWidth = calendarWidth / 5 - 4; // 4px buffer between boxes

  return (
    <View style={{ paddingVertical: 10 }} className="mx-10">
      {/* Show the current month and year (e.g., "June 2025") */}
      <Text className="mt-3"
        style={{
          fontSize:20,
          fontWeight: "bold",
          marginLeft: arrowWidth+3,
          marginBottom: 10,
        }}
      >
        {moment(focusedDay).format("MMMM YYYY")}
      </Text>
   


      {/* Arrows and date strip are arranged horizontally */}
      <View
        className="flex-row items-center justify-between mx-1"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 0,
          width: screenWidth,
        }}
      >
         
        
        {/* Left arrow button */}
        <View style={{ width: arrowWidth, alignItems: "center" }}>
          <TouchableOpacity onPress={() => scrollToIndex(currentChunkIndex - 1)}>
          <Entypo name="arrow-left" size={28} color="black" />
          </TouchableOpacity>
        </View>

        {/* FlatList that shows a chunk of 5 days at a time */}
        <FlatList
          ref={flatListRef}
          data={pagedDays}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          initialScrollIndex={initialChunkIndex}
          getItemLayout={(_, index) => ({
            length: calendarWidth,
            offset: calendarWidth * index,
            index,
          })}
          style={{ width: calendarWidth }}
          contentContainerStyle={{ width: calendarWidth * pagedDays.length }}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(
              e.nativeEvent.contentOffset.x / calendarWidth
            );
            setCurrentChunkIndex(newIndex);

            // Get the new visible chunk
            const newChunk = pagedDays[newIndex];
            // Check if focusedDay is in the new chunk
            const isFocusedDayVisible = newChunk.some(
              (d) => d.format("YYYY-MM-DD") === focusedDay
            );
            // If not, select the first date in the new chunk
            if (!isFocusedDayVisible && newChunk.length > 0) {
              setFocusedDay(newChunk[0].format("YYYY-MM-DD"));
            }
          }}
          renderItem={({ item }) => (
            <View className="flex-row justify-between"
              style={{
                flexDirection: "row",
                width: calendarWidth,
                justifyContent: "space-between",
              }}
            >
              {item.map((day) => {
                const dateStr = day.format("YYYY-MM-DD");
                const isSelected = dateStr === focusedDay;
                return (
                  <TouchableOpacity
                    className="py-3 px-2"
                    key={dateStr}
                    onPress={() => setFocusedDay(dateStr)}
                    style={{
                      backgroundColor: isSelected ? "#F5BE2F" : "transparent",
                      borderRadius: 999,
                      paddingVertical: isSelected ? 6 : 6,
                      paddingHorizontal: isSelected ? 20 : 0,
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: isSelected ? 48 : dateBoxWidth,
                      width: isSelected ? undefined : dateBoxWidth,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{
                      color: isSelected ? "#fff" : "#888",
                      fontWeight: isSelected ? "bold" : "normal"
                    }}>
                       {day.format("D")}
                     
                    </Text>
                    <Text
                      style={{
                        color: isSelected ? "#fff" : "#000",
                        fontWeight: "bold",
                      }}
                    >
                      {day.format("ddd")}
                     
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        />

        {/* Right arrow button */}
        <View style={{ width: arrowWidth, alignItems: "center" }}>
          <TouchableOpacity onPress={() => scrollToIndex(currentChunkIndex + 1)}>
          <Foundation name="arrow-right" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Export the calendar component so you can use it in other screens
export default CalendarStrip;
