import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import moment from "moment";
import { useMemo, useRef, useState, useEffect } from "react";

const screenWidth = Dimensions.get("window").width;

const CalendarStrip = ({ selectedDate, onSelectDate }) => {
  const today = moment().format("YYYY-MM-DD");
  const [focusedDay, setFocusedDay] = useState(selectedDate || today);
  const [chunkCount, setChunkCount] = useState(12);
  const flatListRef = useRef(null);

  const pagedDays = useMemo(() => {
    const start = moment().subtract((chunkCount / 2) * 5, "days");
    const allDays = Array.from({ length: chunkCount * 5 }, (_, i) =>
      start.clone().add(i, "days")
    );
    const chunks = [];
    for (let i = 0; i < allDays.length; i += 5) {
      chunks.push(allDays.slice(i, i + 5));
    }
    return chunks;
  }, [chunkCount]);

  const initialChunkIndex = useMemo(() => {
    return pagedDays.findIndex((chunk) =>
      chunk.some((d) => d.format("YYYY-MM-DD") === today)
    );
  }, [pagedDays, today]);

  const [currentChunkIndex, setCurrentChunkIndex] = useState(initialChunkIndex);

  const scrollToIndex = (index) => {
    if (index < 0) return;
    if (index >= pagedDays.length - 1) {
      setChunkCount((prev) => prev + 6);
      return;
    }
    setCurrentChunkIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const arrowWidth = 50;
  const calendarWidth = screenWidth - arrowWidth * 2;
  const dateBoxWidth = calendarWidth / 5 - 4;

  useEffect(() => {
    setFocusedDay(selectedDate);
  }, [selectedDate]);

  return (
    <View style={{ paddingVertical: 10 }} className="mx-10">
      <Text
        className="mt-3"
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginLeft: arrowWidth + 3,
          marginBottom: 10,
        }}
      >
        {moment(focusedDay).format("MMMM YYYY")}
      </Text>

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
        <View style={{ width: arrowWidth, alignItems: "center" }}>
          <TouchableOpacity onPress={() => scrollToIndex(currentChunkIndex - 1)}>
            <Entypo name="arrow-left" size={28} color="black" />
          </TouchableOpacity>
        </View>

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
            const newChunk = pagedDays[newIndex];
            const isFocusedDayVisible = newChunk.some(
              (d) => d.format("YYYY-MM-DD") === focusedDay
            );
            if (!isFocusedDayVisible && newChunk.length > 0) {
              const newDay = newChunk[0].format("YYYY-MM-DD");
              setFocusedDay(newDay);
              onSelectDate?.(newDay);
            }
          }}
          renderItem={({ item }) => (
            <View
              className="flex-row justify-between"
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
                    onPress={() => {
                      setFocusedDay(dateStr);
                      onSelectDate?.(dateStr);
                    }}
                    style={{
                      backgroundColor: isSelected ? "#F5BE2F" : "transparent",
                      borderRadius: 999,
                      paddingVertical: 6,
                      paddingHorizontal: isSelected ? 20 : 0,
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: isSelected ? 48 : dateBoxWidth,
                      width: isSelected ? undefined : dateBoxWidth,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected ? "#fff" : "#888",
                        fontWeight: isSelected ? "bold" : "normal",
                      }}
                    >
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

        <View style={{ width: arrowWidth, alignItems: "center" }}>
          <TouchableOpacity onPress={() => scrollToIndex(currentChunkIndex + 1)}>
            <Foundation name="arrow-right" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CalendarStrip;
