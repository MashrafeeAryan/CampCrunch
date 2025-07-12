// stores/userHealthStore.ts

// Import the main function to create Zustand stores
import { create } from 'zustand'

// Import middleware to add persistence capability to the store
import { persist, createJSONStorage } from 'zustand/middleware'

// Import AsyncStorage, which allows us to store data on the device in React Native
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * 1. Define the shape (structure) of the state in this store.
 * This is useful for TypeScript to know what data and functions the store contains.
 */
type UserHealthStore = {
  // --- Data fields (state) ---
  weight_KG: string
  weight_lbs: string
  heightInches: string
  heightCM: string
  ageYears: string
  gender: string
  activityLevel: string
  allergies: string
  preferences: string


  // --- Updater functions (similar to setState) ---
  setWeight_KG: (weight: string | number) => void
  setWeight_lbs: (weight: string | number) => void
  setHeightInches: (height: string | number) => void
  setHeightCM: (height: string | number) => void
  setAgeYears: (age: string | number) => void
  setGender: (sex: string) => void
  setActivityLevel: (performance: string) => void
  setAllergies: (allergy: string) => void
  setPreferences: (preference: string) => void

  reset: () => void
}

/**
 * 2. Create the Zustand store using the `create` function.
 * We wrap it with the `persist` middleware to automatically save the data
 * even after the app is closed and restarted.
 */
export const useUserHealthStore = create<UserHealthStore>()(
  persist(
    // This function defines the initial state and how to update it
    (set) => ({
      // --- Initial state values ---
      weight_KG: '',
      weight_lbs: '',
      heightInches: '',
      heightCM: '',
      ageYears: '',
      gender: '',
      activityLevel: '',
      allergies: '',
      preferences: '',
      // --- Updater functions to modify the state ---
      // Convert values to strings to ensure consistent type and avoid errors
      setWeight_KG: (weight) => set({ weight_KG: weight.toString() }),
      setWeight_lbs: (weight) => set({ weight_lbs: weight.toString() }),
      setHeightInches: (height) => set({ heightInches: height.toString() }),
      setHeightCM: (height) => set({ heightCM: height.toString() }),
      setAgeYears: (age) => set({ ageYears: age.toString() }),
      setGender: (sex) => set({ gender: sex }),
      setActivityLevel: (performance) => set({ activityLevel: performance }),
      setAllergies: (allergy) => set({allergies: allergy}),
      setPreferences: (preference) => set({preferences: preference}),
    
      // ✅ --- Reset function to clear all fields ---
      reset: () =>
        set({
          weight_KG: '',
          weight_lbs: '',
          heightInches: '',
          heightCM: '',
          ageYears: '',
          gender: '',
          activityLevel: '',
          allergies: '',
        }),
  
    }),

    
    // --- Persistence configuration for AsyncStorage ---
    {
      // A unique key used to store this state in AsyncStorage
      name: 'userHealthInfo-storage',

      // Wrap AsyncStorage using Zustand’s helper so it can stringify/parse JSON
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
