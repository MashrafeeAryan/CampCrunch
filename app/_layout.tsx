import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
    <Stack>
      {/*Showns all the main pages inlcuding home */}
      <Stack.Screen
        name="(tabs)"
        options={{headerShown: false}}
      />

      {/*Screen for signUp, Login*/}
      <Stack.Screen
        name="(auth)"
        options={{headerShown:false}}
      
      />

      <Stack.Screen
        name="(hidden)"
        options={{headerShown:false}}
      
      />
      <Stack.Screen
        name="(infoPages)"
        options={{headerShown:false}}
      
      />
    </Stack>
    </UserProvider>
  );
}
