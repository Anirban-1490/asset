import { useAdmin } from "@/store/use-admin";
import { useUser } from "@clerk/expo";
import { useEffect } from "react";
import { useAuthSupabase } from "./use-supabase";

export const useSyncUser = () => {
  const { user } = useUser();
  const supabaseAuthClient = useAuthSupabase();
  const setAdmin = useAdmin((state) => state.setAdmin);

  useEffect(() => {
    if (!user) return;

    async function syncUser() {
      const { data } = await supabaseAuthClient
        .from("users")
        .select("*")
        .eq("clerk_id", user?.id!)
        .single();

      if (!data) {
        const { data, error } = await supabaseAuthClient
          .from("users")
          .insert({
            avatar_url: user?.imageUrl!,
            clerk_id: user?.id!,
            email: user?.emailAddresses[0].emailAddress!,
            is_admin: false,
          })
          .select("is_admin")
          .single();
        setAdmin(data?.is_admin!);

        return;
      }

      setAdmin(data?.is_admin!);
    }

    syncUser();
  }, []);
};
