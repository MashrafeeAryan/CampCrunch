import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import avatarIcons from "@/assets/images/avatar";

type ProfileStore = {
  selectedAvatar: any; // You can make this string if you store image names instead of objects
  setSelectedAvatar: (avatar: any) => void;
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      selectedAvatar: avatarIcons.eagle, // default avatar
      setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar }),
    }),
    {
      name: "profile-store", // storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);