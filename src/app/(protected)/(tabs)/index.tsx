import { HomePage } from "@/modules/home";
import { useUser } from "@clerk/expo";
import { useRouter } from "expo-router";

export default function Home() {
  const { user } = useUser();
  // const { signOut } = useClerk();
  const router = useRouter();
  return <HomePage />;
}
