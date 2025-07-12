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
  preferences
}: {
  userID: string;
  weight_KG: string;
  weight_lbs: string;
  heightInches: string;
  heightCM: string;
  ageYears: string;
  gender: string;
  activityLevel: string;
  allergies: string;
  preferences: string;
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
        preferences: preferences
      }
    );

    console.log("UserHealthInfo Creation Successful");
  } catch (error) {
    console.log("UserHealthInfo Creation Failed: ", error);
    throw new Error(error.message);
  }
}
