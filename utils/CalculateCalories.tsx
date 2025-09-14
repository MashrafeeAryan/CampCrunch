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
  preferences: string[],
  allergies: string[],
  protein: number,
  carbs: number,
  fat: number,

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
  let bmrValue = 0;
  if (gender.toLowerCase() === "male") {
    bmrValue = 66 + 6.23 * weight_lbs + 12.7 * heightInches - 6.8 * ageYears;
    setBMR(bmrValue);
  } else {
    bmrValue = 655 + 4.35 * weight_lbs + 4.7 * heightInches - 4.7 * ageYears;
    setBMR(bmrValue);
  }

  const activityMultiplier =
    {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    }[activityLevel] || 1.2;

  const maintenanceCalories = bmrValue * activityMultiplier;
  setMaintenance(maintenanceCalories);

  const adjustedCalories = maintenanceCalories + (goals * 3500) / 7;
  setDailyCalorieAdjustment(adjustedCalories);

  if (goals < 0) {
    // Weight Loss: 40% Protein, 40% Carbs, 20% Fat
    proteinVal = Math.round((0.4 * adjustedCalories) / 4);
    carbsVal = Math.round((0.4 * adjustedCalories) / 4);
    fatVal = Math.round((0.2 * adjustedCalories) / 9);
    setProtein(proteinVal);
    setCarbs(carbsVal);
    setFat(fatVal);
  } else if (goals > 0) {
    // Muscle Gain: 30% Protein, 50% Carbs, 20% Fat
    proteinVal = Math.round((0.3 * adjustedCalories) / 4);
    carbsVal = Math.round((0.5 * adjustedCalories) / 4);
    fatVal = Math.round((0.2 * adjustedCalories) / 9);
    setProtein(proteinVal);
    setCarbs(carbsVal);
    setFat(fatVal);
  } else if (goals === 0) {
    // Maintenance: 30% Protein, 40% Carbs, 30% Fat
    proteinVal = Math.round((0.3 * adjustedCalories) / 4);
    carbsVal = Math.round((0.4 * adjustedCalories) / 4);
    fatVal = Math.round((0.3 * adjustedCalories) / 9);
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
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response.responseBody);
    } catch (e) {
      console.error("Invalid JSON response:", response.responseBody);
      return;
    }
    setDietRecommendation(parsedResponse);

    console.log("✅ Diet Recommendation Stored:", parsedResponse);
  } catch (error) {
    console.log("Function Execution Error", error);
  }
};
