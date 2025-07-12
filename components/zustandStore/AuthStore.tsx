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
type UserAuthStore = {
  // --- Data fields (state) ---
  userID: string

  // --- Updater functions (similar to setState) ---
  setUserID: (id: string) => void
 
}

/**
 * 2. Create the Zustand store using the `create` function.
 * We wrap it with the `persist` middleware to automatically save the data
 * even after the app is closed and restarted.
 */
export const useUserAuthStore = create<UserAuthStore>()(
  persist(
    // This function defines the initial state and how to update it
    (set) => ({
      // --- Initial state values ---
      userID: '',
      // --- Updater functions to modify the state ---
      // Convert values to strings to ensure consistent type and avoid errors
      setUserID: (id) => set({ userID: id }),
     
    }),

    // --- Persistence configuration for AsyncStorage ---
    {
      // A unique key used to store this state in AsyncStorage
      name: 'userAuthInfo--storage',

      // Wrap AsyncStorage using Zustand’s helper so it can stringify/parse JSON
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
