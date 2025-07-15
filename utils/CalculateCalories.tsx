import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";

export function calculateCalories(
  gender: string,
  weight_lbs: number,
  weight_KG: number,
  ageYears: number,
  heightInches: number,
  goals: number,
  bmr: number,
  maintenance: number,
  activityLevel: string,
  dailyCalorieAdjustment: number,
  setBMR: (val: number) => void,
  setMaintenance: (val: number) => void,
  setDailyCalorieAdjustment: (val: number) => void
) {


  //📐 Imperial Mifflin-St Jeor Formula:
  if (gender === "male") {
    setBMR(66 + 6.23 * weight_lbs + 12.7 * heightInches - 6.8 * ageYears);
  } else {
    setBMR(655 + 4.35 * weight_lbs + 4.7 * heightInches - 4.7 * ageYears);
  }

  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  }[activityLevel] || 0;

  const maintenanceCalories = bmr * activityMultiplier;
  setMaintenance(maintenanceCalories);

  const adjustedCalories = maintenance + (goals * 3500) / 7;
  setDailyCalorieAdjustment(adjustedCalories);

  return dailyCalorieAdjustment;
}
