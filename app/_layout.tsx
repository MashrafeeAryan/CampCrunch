import { account } from "@/appwriteConfig";
import LoadScreen from "@/components/auth/LoadScreen";
import { useUserAuthStore } from "@/components/zustandStore/AuthStore";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";


export default function RootLayout() {


 const [exists, setExistence] = useState<boolean | null>(null); // null means "loading"
 const setUserID = useUserAuthStore((s) => s.setUserID)
 const setUserEmail = useUserAuthStore((s) => s.setUserEmail)
 const setUserName = useUserAuthStore((s)=>s.setUserName)
 const userName = useUserAuthStore((s)=>s.userName)
 const setCampCrunchUserName = useUserAuthStore((s)=>s.setCampCrunchUserName)
 useEffect(() => {
   const checkUserSession = async () => {
     try {
       const response = await account.get(); // Will throw if not logged in
       setUserID(response.$id);       // Save their ID
       setUserEmail(response.email);  // Save their email
       setUserName(response.name);
       setCampCrunchUserName(userName.toLowerCase().replace(/\s+/g, ""))
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
     <Stack.Screen name="(auth)" options={{ headerShown: false }} />
   </Stack>
  
 ) : (
     <Stack>
     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       <Stack.Screen name="(hidden)" options={{ headerShown: false }} />
       <Stack.Screen name="(infoPages)" options={{ headerShown: false }} />
       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
   </Stack>
 );
}


