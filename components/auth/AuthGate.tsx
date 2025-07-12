// components/AuthGate.tsx
import { useRouter } from "expo-router";
import { useEffect } from "react";
import LoadScreen from "./LoadScreen";
import { useAuthCheck } from "./useAuthCheck";
import { useUserAuthStore } from "../zustandStore/AuthStore";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { loading } = useAuthCheck();
  const userID = useUserAuthStore((s) => s.userID);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userID) {
      router.replace("/(auth)/LoginScreen");
    }
  }, [loading, userID]);

  if (loading || !userID) {
    return <LoadScreen />;
  }

  return <>{children}</>;
}
