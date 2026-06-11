import { useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FeaturedCard } from "./components/featured-card";
import { RecommendedCards } from "./components/recommended-card";
import { useHomeData } from "./hooks/use-home-data";

export function HomePage() {
  const { recommendedProperties, featuredProperties, isError, isLoading } =
    useHomeData();

  const { user } = useUser();
  const router = useRouter();

  return (
    <View>
      <View className="flex flex-row justify-end py-7 px-5">
        <Text className="">
          Hi,{" "}
          <Text className="font-bold">
            {user?.emailAddresses[0].emailAddress ?? "Guest"}
          </Text>
        </Text>
      </View>

      <FlatList
        data={recommendedProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <RecommendedCards property={item} />;
        }}
        contentContainerClassName="px-5 pb-[8rem]"
        ListHeaderComponent={
          <View>
            <View className="flex flex-row gap-3 items-center">
              <TouchableOpacity
                onPress={() => {
                  router.push("/(protected)/(tabs)/search");
                }}
                className="flex flex-row  flex-1 gap-3 px-3 py-4 border border-gray-300 rounded-xl"
              >
                <Ionicons name="search-outline" size={22} color="red" />
                <Text className=" text-sm text-gray-400">
                  Search properties, cities...
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-4  bg-primary rounded-lg">
                <Ionicons name="options-outline" color="white" size={22} />
              </TouchableOpacity>
            </View>

            <View className="py-5 h-[24.5rem]">
              <Text className="text-xl font-bold text-primary py-4">
                Featured Properties
              </Text>

              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  className=" py-7 text-primary"
                />
              ) : (
                <FlatList
                  renderItem={({ item }) => {
                    return <FeaturedCard property={item} />;
                  }}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="px-1 h-full"
                  data={featuredProperties}
                />
              )}
            </View>

            <Text className="text-xl font-bold text-primary py-4">
              Recommended Properties
            </Text>
          </View>
        }
        ListEmptyComponent={
          !isLoading ? (
            <View className="py-10 ">
              <Text className="text-gray-500 text-center">
                No Properties Found
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
