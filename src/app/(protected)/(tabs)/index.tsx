import { Button } from "@/components/common/button";
import { Show, useClerk, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <SafeAreaView className="p-3">
      <Show when="signed-in">
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Button
          text="Sign Out"
          buttonProps={{
            onPress: async () => {
              await signOut();
              router.replace("/sign-in");
            },
          }}
        />
      </Show>
    </SafeAreaView>
  );
}
