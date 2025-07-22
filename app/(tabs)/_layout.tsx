import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import tabBarLogos from "@/assets/images/tabBarLogos";
import { useEffect } from "react";
import { router } from "expo-router";
import { useState } from "react";
import { Slot } from "expo-router";
import { ActivityIndicator } from "react-native";


const TabsLayout = () => {


  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#373737",
          
          // borderRadius: 10
        },
        tabBarActiveTintColor: "#F4C542",
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",

          //Change headerstyle. It is the yellow top part of the screen
          headerTitle: "CampCrunch",
          headerStyle: {
            backgroundColor: "#F4C542",
            height: 80,
          },
          
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          
          
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabBarLogos.homeLogo}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#f8d04a" : "#999",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="BonusBucksScreen"
        options={{
          tabBarLabel:"BonusBucks",

          //When user is on that page, the icon color will be golden
          //When user leaves the page, icon color will be gray
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabBarLogos.bonusBucksLogo}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#f8d04a" : "#999",
              }}
              resizeMode="contain"
            />
          ),

          headerTitle: "Eagle Eats +",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          // Here's the key part: a custom header background
          headerBackground: () => (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, backgroundColor: "#F4C542" }} />
              <View style={{ height: 5, backgroundColor: "#fff" }} />
              <View style={{ height: 5, backgroundColor: "#F4C542" }} />
            </View>
          ),
          headerStyle: {
            height: 80, // Add space for the stripe
          },
        }}
      />

     <Tabs.Screen
        name="CalendarScreen"
        options={{
          title: "Calender",
          tabBarLabel: "", // Hides the label below the tab icon (we only want the icon to show)
          headerShown: false,
          // Custom tab bar icon
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute", // Allows the icon to be positioned independently of the tab layout
                top: -25, // Moves the icon upward, so it visually "floats" above the tab bar

                backgroundColor: "#F4C542", // Sets a circular background color (gold/yellow tone for prominence)
                borderRadius: 35, // Makes the button circular (must be half of width/height or more)
                width: 50, // Width of the circular button
                height: 50, // Height of the circular button

                justifyContent: "center", // Centers the icon vertically within the button
                alignItems: "center", // Centers the icon horizontally

                // Adds a subtle drop shadow for depth (iOS + Android compatible)
                shadowColor: "#000", // Shadow color
                shadowOffset: { width: 0, height: 2 }, // Slight offset downward
                shadowOpacity: 0.25, // Transparency level of the shadow
                shadowRadius: 3.84, // Blur radius for the shadow
                elevation: 5, // Required for Android shadow (higher = more elevation)
              }}
            >
              <MaterialIcons
                name="add" // Name of the icon from MaterialIcons set (plus symbol)
                size={32} // Size of the icon in pixels
                color={focused ? "#fff" : "#fff"} // Icon color stays white whether focused or not (customize if needed)
              />
            </View>
          ),
        }}
      />

    <Tabs.Screen
    name="ChallengeScreen"
  options={{
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <Image
        source={tabBarLogos.challengesLogo}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? "#f8d04a" : "#999",
        }}
        resizeMode="contain"
      />
    ),
  }}
/>


      <Tabs.Screen
        name="ProfileScreen"

        

        options={{
          headerShown:false,
          tabBarLabel: "Profile",

          //When user is on that page, the icon color will be golden
          //When user leaves the page, icon color will be gray
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabBarLogos.profileLogo}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#f8d04a" : "#999",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
