import { supabase } from "@/services/supabase";
import { useQueries } from "@tanstack/react-query";

export const useHomeData = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: ["featured-data"],
        queryFn: async () => {
          return await supabase
            .from("properties")
            .select("*")
            .eq("is_featured", true)
            .order("created_at", { ascending: false });
        },
      },
      {
        queryKey: ["recommended-data"],
        queryFn: async () => {
          return await supabase
            .from("properties")
            .select("*")
            .eq("is_featured", false)
            .order("created_at", { ascending: false });
        },
      },
    ],
  });

  const isLoading = result.some((query) => query.isLoading);
  const recommendedProperties = result[1].data?.data;
  const featuredProperties = result[0].data?.data;

  const isError = result.some((query) => query.isError || query.data?.error);

  return {
    isLoading,
    recommendedProperties,
    featuredProperties,
    isError,
  };
};
