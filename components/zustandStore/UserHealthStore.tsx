// stores/userHealthStore.ts

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type UserHealthStore = {
  // Data fields
  weight_KG: number
  weight_lbs: number
  heightInches: number
  heightCM: number
  ageYears: number
  gender: string
  activityLevel: string
  allergies: string
  preferences: string
  goals: number
  bmr: number
  maintenance: number

  // Updater functions
  setWeight_KG: (weight: number) => void
  setWeight_lbs: (weight: number) => void
  setHeightInches: (height: number) => void
  setHeightCM: (height: number) => void
  setAgeYears: (age: number) => void
  setGender: (sex: string) => void
  setActivityLevel: (level: string) => void
  setAllergies: (allergy: string) => void
  setPreferences: (preference: string) => void
  setGoals: (goal: number) => void
  setBMR: (bmr: number) => void
  setMaintenance: (maintain: number) => void
  reset: () => void
}

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
      allergies: '',
      preferences: '',
      goals: 0,
      bmr: 0,
      maintenance: 0,

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

      reset: () =>
        set({
          weight_KG: 0,
          weight_lbs: 0,
          heightInches: 0,
          heightCM: 0,
          ageYears: 0,
          gender: '',
          activityLevel: '',
          allergies: '',
          preferences: '',
          goals: 0,
          bmr: 0,
          maintenance: 0,
        }),
    }),
    {
      name: 'userHealthInfo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
