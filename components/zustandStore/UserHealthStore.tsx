import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserHealthStore = {
  // Data fields
  weight_KG: number;
  weight_lbs: number;
  heightInches: number;
  heightCM: number;
  ageYears: number;
  gender: string;
  activityLevel: string;
  allergies: string[];     // changed to array
  preferences: string[];   // changed to array
  goals: number;
  bmr: number;
  maintenance: number;
  dailyCalorieAdjustment: number;
  protein: number;
  carbs: number;
  fat: number;

  // Updater functions
  setWeight_KG: (weight: number) => void;
  setWeight_lbs: (weight: number) => void;
  setHeightInches: (height: number) => void;
  setHeightCM: (height: number) => void;
  setAgeYears: (age: number) => void;
  setGender: (sex: string) => void;
  setActivityLevel: (level: string) => void;
  setAllergies: (allergy: string[]) => void;         // updated type
  setPreferences: (preference: string[]) => void;    // updated type
  setGoals: (goal: number) => void;
  setBMR: (bmr: number) => void;
  setMaintenance: (maintain: number) => void;
  setDailyCalorieAdjustment: (calories: number) => void;
  setProtein: (protein: number) => void;
  setCarbs: (carbs: number) => void;
  setFat: (fat: number) => void;
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
      allergies: [],       // default to empty array
      preferences: [],     // default to empty array
      goals: 0,
      bmr: 0,
      maintenance: 0,
      dailyCalorieAdjustment: 0,
      protein: 0,
      carbs: 0,
      fat: 0,

      setWeight_KG: (weight) => set({ weight_KG: weight }),
      setWeight_lbs: (weight) => set({ weight_lbs: weight }),
      setHeightInches: (height) => set({ heightInches: height }),
      setHeightCM: (height) => set({ heightCM: height }),
      setAgeYears: (age) => set({ ageYears: age }),
      setGender: (sex) => set({ gender: sex }),
      setActivityLevel: (level) => set({ activityLevel: level }),
      setAllergies: (allergy) => set({ allergies: allergy }),           // updated
      setPreferences: (preference) => set({ preferences: preference }), // updated
      setGoals: (goal) => set({ goals: goal }),
      setBMR: (bmr) => set({ bmr }),
      setMaintenance: (maintain) => set({ maintenance: maintain }),
      setDailyCalorieAdjustment: (calories) => set({ dailyCalorieAdjustment: calories }),
      setProtein: (protein) => set({ protein }),
      setCarbs: (carbs) => set({ carbs }),
      setFat: (fat) => set({ fat }),

      reset: () =>
        set({
          weight_KG: 0,
          weight_lbs: 0,
          heightInches: 0,
          heightCM: 0,
          ageYears: 0,
          gender: '',
          activityLevel: '',
          allergies: [],       // reset to array
          preferences: [],     // reset to array
          goals: 0,
          bmr: 0,
          maintenance: 0,
          dailyCalorieAdjustment: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        }),
    }),
    {
      name: 'userHealthInfo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
