import { useSyncUser } from "@/hooks/use-sync-user";
import { useAuth } from "@clerk/expo";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProtectedRootLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href={"/sign-in"} />;

  useSyncUser();

  return (
    <SafeAreaView className="p-3">
      <Slot />
    </SafeAreaView>
  );
}
