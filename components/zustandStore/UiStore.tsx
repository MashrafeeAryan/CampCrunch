import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UIStore = {
  allergiesUI: string;
  preferencesUI: string;

  setAllergiesUI: (allergies: string) => void;
  setPreferencesUI: (preferences: string) => void;
  reset: () => void;
};

export const useUserUIStore = create<UIStore>()(
  persist(
    (set) => ({
      allergiesUI: "",
      preferencesUI: "",

      setAllergiesUI: (allergies) => set({ allergiesUI: allergies }),
      setPreferencesUI: (preferences) => set({ preferencesUI: preferences }),

      reset: () =>
        set({
          allergiesUI: "",
          preferencesUI: "",
        }),
    }),
    {
      name: 'userUIInfo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
