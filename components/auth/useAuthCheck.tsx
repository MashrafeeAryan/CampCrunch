// utils/useAuthCheck.ts
import { useEffect, useState } from "react";
import { account } from "@/appwriteConfig";
import { useUserAuthStore } from "../zustandStore/AuthStore";
export function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const { setUserID, setUserEmail, setUserName } = useUserAuthStore.getState();

  useEffect(() => {
    const check = async () => {
      try {
        const user = await account.get();
        setUserID(user.$id);
        setUserEmail(user.email);
        setUserName(user.name);
      } catch (e) {
        // Not logged in – do nothing here
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  return { loading };
}
