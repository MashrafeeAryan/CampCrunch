import { account } from "@/appwriteConfig";
import LoadScreen from "@/components/auth/LoadScreen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [exists, setExistence] = useState<boolean | null>(null); // null means "loading"

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await account.get(); // Will throw if not logged in
        setExistence(true);
      } catch (error) {
        setExistence(false);
      }
    };

    checkUserSession(); // <- You forgot to call it
  }, []);

  if (exists === null) {
    // While checking, show loader
    return (
      <LoadScreen/>
    );
  }

  return exists ? (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(hidden)" options={{ headerShown: false }} />
      <Stack.Screen name="(infoPages)" options={{ headerShown: false }} />
    </Stack>
  ) : (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
