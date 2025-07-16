 import { View, Text } from "react-native";
import React, { useContext } from "react";
import {
  DatabaseID,
  databases,
  userHealthInfoCollectionID,
} from "@/appwriteConfig";


export async function updateHealthInfo({
  userID,
  weight_KG,
  weight_lbs,
  heightInches,
  heightCM,
  ageYears,
  gender,
  activityLevel,
  allergies, 
  preferences, 
  goals
}) {
  try {
    await databases.createDocument(
      DatabaseID,
      userHealthInfoCollectionID,
      userID,
      {
        userID,
        weightlbs: weight_lbs,
        weightKG: weight_KG,
        heightInch: heightInches,
        heightCM,
        age: ageYears,
        gender,
        activityLevel,
        allergies: allergies,
        preferences: preferences,
        goals: goals,
      }
    );

    console.log("UserHealthInfo Creation Successful");
  } catch (error) {
    console.log("UserHealthInfo Creation Failed: ", error);
    throw new Error(error.message);
  }
}
