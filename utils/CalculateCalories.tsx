import { dietRecommendationFunctionID, functions } from "@/appwriteConfig";
import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";

export const calculateCalories = async (
  gender: string,
  weight_lbs: number,
  ageYears: number,
  heightInches: number,
  goals: number,
  bmr: number,
  maintenance: number,
  activityLevel: string,
  preferences,
  allergies,
  protein,
  carbs,
  fat,
  setBMR: (val: number) => void,
  setMaintenance: (val: number) => void,
  setDailyCalorieAdjustment: (val: number) => void,
  setProtein: (val: number) => void,
  setCarbs: (val: number) => void,
  setFat: (val: number) => void,
  setDietRecommendation: (val: any) => void
) => {
  let proteinVal = 0;
  let carbsVal = 0;
  let fatVal = 0;
  //📐 Imperial Mifflin-St Jeor Formula:
  if (gender === "male") {
    setBMR(66 + 6.23 * weight_lbs + 12.7 * heightInches - 6.8 * ageYears);
  } else {
    setBMR(655 + 4.35 * weight_lbs + 4.7 * heightInches - 4.7 * ageYears);
  }

  const activityMultiplier =
    {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    }[activityLevel] || 0;

  const maintenanceCalories = bmr * activityMultiplier;
  setMaintenance(maintenanceCalories);

  const adjustedCalories = maintenanceCalories + (goals * 3500) / 7;
  setDailyCalorieAdjustment(adjustedCalories);

  if (goals < 0) {
    // Weight Loss: 40% Protein, 40% Carbs, 20% Fat
    proteinVal = (0.4 * adjustedCalories) / 4;
    carbsVal = (0.4 * adjustedCalories) / 4;
    fatVal = (0.2 * adjustedCalories) / 9;
    setProtein(proteinVal);
    setCarbs(carbsVal);
    setFat(fatVal);
  } else if (goals > 0) {
    // Muscle Gain: 30% Protein, 50% Carbs, 20% Fat
    proteinVal = (0.3 * adjustedCalories) / 4;
    carbsVal = (0.5 * adjustedCalories) / 4;
    fatVal = (0.2 * adjustedCalories) / 9;
    setProtein(proteinVal);
    setCarbs(carbsVal);
    setFat(fatVal);
  } else if (goals === 0) {
    // Maintenance: 30% Protein, 40% Carbs, 30% Fat
    proteinVal = (0.3 * adjustedCalories) / 4;
    carbsVal = (0.4 * adjustedCalories) / 4;
    fatVal = (0.3 * adjustedCalories) / 9;
    setProtein(proteinVal);
    setCarbs(carbsVal);
    setFat(fatVal);
  }

  try {
    const response = await functions.createExecution(
      dietRecommendationFunctionID,
      JSON.stringify({
        preferences: preferences,
        allergies: allergies,
        target: {
          calories: adjustedCalories,
          protein: proteinVal,
          carbs: carbsVal,
          fat: fatVal,
        },
      })
    );
    const parsedResponse = JSON.parse(response.responseBody);
    setDietRecommendation(parsedResponse);

    console.log("✅ Diet Recommendation Stored:", parsedResponse);
  } catch (error) {
    console.log("Function Execution Error", error);
  }
};
