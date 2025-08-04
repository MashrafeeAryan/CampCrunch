import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Updated FoodItem to match your real structure
type FoodItem = {
  foodName: string;
  calories: number;
};

type FoodMap = {
  [date: string]: {
    Breakfast: FoodItem[];
    Lunch: FoodItem[];
    Dinner: FoodItem[];
  };
};

type UserHealthStore = {
  // Data fields
  weight_KG: number;
  weight_lbs: number;
  heightInches: number;
  heightCM: number;
  ageYears: number;
  gender: string;
  activityLevel: string;
  allergies: string[];
  preferences: string[];
  goals: number;
  bmr: number;
  maintenance: number;
  dailyCalorieAdjustment: number;
  protein: number;
  carbs: number;
  fat: number;
  dietRecommendation: any | null;

  caloriesConsumed: number;
  proteinConsumed: number;
  fatConsumed: number;
  carbsConsumed: number;
  lastResetDate: string;

  foodMap: FoodMap;

  // Updater functions
  setWeight_KG: (weight: number) => void;
  setWeight_lbs: (weight: number) => void;
  setHeightInches: (height: number) => void;
  setHeightCM: (height: number) => void;
  setAgeYears: (age: number) => void;
  setGender: (sex: string) => void;
  setActivityLevel: (level: string) => void;
  setAllergies: (allergy: string[]) => void;
  setPreferences: (preference: string[]) => void;
  setGoals: (goal: number) => void;
  setBMR: (bmr: number) => void;
  setMaintenance: (maintain: number) => void;
  setDailyCalorieAdjustment: (calories: number) => void;
  setProtein: (protein: number) => void;
  setCarbs: (carbs: number) => void;
  setFat: (fat: number) => void;
  setDietRecommendation: (data: any) => void;

  setCaloriesConsumed: (val: number) => void;
  setProteinConsumed: (val: number) => void;
  setFatConsumed: (val: number) => void;
  setCarbsConsumed: (val: number) => void;

  setFoodMap: (map: FoodMap) => void;
  updateFoodMap: (
    date: string,
    mealType: keyof FoodMap[string],
    foodItem: FoodItem
  ) => void;

  checkAndResetDailyIntake: () => void;
  reset: () => void;
};

export const useUserHealthStore = create<UserHealthStore>()(
  persist(
    (set) => ({
      weight_KG: 0,
      weight_lbs: 0,
      heightInches: 0,
      heightCM: 0,
      ageYears: 0,
      gender: '',
      activityLevel: '',
      allergies: [],
      preferences: [],
      goals: 0,
      bmr: 0,
      maintenance: 0,
      dailyCalorieAdjustment: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      dietRecommendation: null,

      caloriesConsumed: 0,
      proteinConsumed: 0,
      fatConsumed: 0,
      carbsConsumed: 0,
      lastResetDate: '',

      foodMap: {},

      setWeight_KG: (weight) => set({ weight_KG: weight }),
      setWeight_lbs: (weight) => set({ weight_lbs: weight }),
      setHeightInches: (height) => set({ heightInches: height }),
      setHeightCM: (height) => set({ heightCM: height }),
      setAgeYears: (age) => set({ ageYears: age }),
      setGender: (sex) => set({ gender: sex }),
      setActivityLevel: (level) => set({ activityLevel: level }),
      setAllergies: (allergy) => set({ allergies: allergy }),
      setPreferences: (preference) => set({ preferences: preference }),
      setGoals: (goal) => set({ goals: goal }),
      setBMR: (bmr) => set({ bmr }),
      setMaintenance: (maintain) => set({ maintenance: maintain }),
      setDailyCalorieAdjustment: (calories) => set({ dailyCalorieAdjustment: calories }),
      setProtein: (protein) => set({ protein }),
      setCarbs: (carbs) => set({ carbs }),
      setFat: (fat) => set({ fat }),
      setDietRecommendation: (data) => set({ dietRecommendation: data }),

      setCaloriesConsumed: (val) => set({ caloriesConsumed: val }),
      setProteinConsumed: (val) => set({ proteinConsumed: val }),
      setFatConsumed: (val) => set({ fatConsumed: val }),
      setCarbsConsumed: (val) => set({ carbsConsumed: val }),

      setFoodMap: (map) => set({ foodMap: map }),
      updateFoodMap: (date, mealType, foodItem) =>
        set((state) => {
          const day = state.foodMap[date] || {
            Breakfast: [],
            Lunch: [],
            Dinner: [],
          };
          return {
            foodMap: {
              ...state.foodMap,
              [date]: {
                ...day,
                [mealType]: [...day[mealType], foodItem],
              },
            },
          };
        }),

      checkAndResetDailyIntake: () => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          if (state.lastResetDate !== today) {
            return {
              caloriesConsumed: 0,
              proteinConsumed: 0,
              fatConsumed: 0,
              carbsConsumed: 0,
              lastResetDate: today,
            };
          }
          return {};
        });
      },

      reset: () =>
        set({
          weight_KG: 0,
          weight_lbs: 0,
          heightInches: 0,
          heightCM: 0,
          ageYears: 0,
          gender: '',
          activityLevel: '',
          allergies: [],
          preferences: [],
          goals: 0,
          bmr: 0,
          maintenance: 0,
          dailyCalorieAdjustment: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          dietRecommendation: null,

          caloriesConsumed: 0,
          proteinConsumed: 0,
          fatConsumed: 0,
          carbsConsumed: 0,
          lastResetDate: '',
          foodMap: {},
        }),
    }),
    {
      name: 'userHealthInfo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
