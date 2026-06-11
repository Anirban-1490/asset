import { supabaseWithClerk } from "@/services/supabase";
import { useAuth } from "@clerk/expo";
import { useMemo } from "react";

export const useAuthSupabase = () => {
  const { getToken } = useAuth();

  return useMemo(() => {
    return supabaseWithClerk(() => getToken());
  }, [getToken]);
};
