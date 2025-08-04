import { account } from "@/appwriteConfig";
import LoadScreen from "@/components/auth/LoadScreen";
import { useUserAuthStore } from "@/components/zustandStore/AuthStore";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const [exists, setExistence] = useState<boolean | null>(null);
  const setUserID = useUserAuthStore((s) => s.setUserID);
  const setUserEmail = useUserAuthStore((s) => s.setUserEmail);
  const setUserName = useUserAuthStore((s) => s.setUserName);
  const userName = useUserAuthStore((s) => s.userName);
  const setCampCrunchUserName = useUserAuthStore((s) => s.setCampCrunchUserName);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await account.get();
        setUserID(response.$id);
        setUserEmail(response.email);
        setUserName(response.name);
        setCampCrunchUserName(response.name.toLowerCase().replace(/\s+/g, ""));
        setExistence(true);
      } catch (error) {
        setExistence(false);
      }
    };

    checkUserSession();
  }, []);

  if (exists === null) {
    return <LoadScreen />;
  }

  return (
    <>
      <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(hidden)" options={{ headerShown: false }} />
            <Stack.Screen name="(infoPages)" options={{ headerShown: false }} />

      </Stack>
      <Toast />
    </>
  );
}
