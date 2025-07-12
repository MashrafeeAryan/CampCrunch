import AuthGate from "@/components/auth/AuthGate";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthGate>
      <Stack>
        {/* Main app pages */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Auth pages: Login, Sign Up */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        {/* Hidden/protected pages */}
        <Stack.Screen name="(hidden)" options={{ headerShown: false }} />

        {/* Info or settings pages */}
        <Stack.Screen name="(infoPages)" options={{ headerShown: false }} />
      </Stack>
    </AuthGate>
  );
}
