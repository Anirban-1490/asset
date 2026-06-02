import { createClient } from "@supabase/supabase-js";
import { Database } from "../../supabase";

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    // auth: {
    //   storage: AsyncStorage,
    //   autoRefreshToken: true,
    //   persistSession: true,
    //   detectSessionInUrl: false,
    // },
  },
);

export const supabaseWithClerk = (token: () => Promise<string | null>) => {
  return createClient<Database>(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_KEY!,
    {
      accessToken: async () => token() ?? null,
      // auth: {
      //   storage: AsyncStorage,
      //   autoRefreshToken: true,
      //   persistSession: true,
      //   detectSessionInUrl: false,
      // },
    },
  );
};
