import { Property } from "@/types";
import { formatPrice } from "@/utils/format-price";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function FeaturedCard({ property }: { property: Property }) {
  return (
    <View className="w-[16rem] h-full  mr-4 rounded-lg overflow-hidden relative">
      <TouchableOpacity>
        <Image
          className="w-full h-[10rem]"
          source={{ uri: property?.images?.[0] || " " }}
          resizeMode="cover"
        />

        <View className="py-5 px-2">
          <Text className="font-semibold text-lg">{property.title}</Text>

          <View className="flex items-center flex-row gap-1">
            <Ionicons name="location-outline" size={16} />
            <Text numberOfLines={1} className="text-sm text-gray-400">
              {property.address}, {property.city}
            </Text>
          </View>
        </View>
        <View className="flex flex-row px-2">
          <Text className="text-lg font-bold text-primary mr-auto">
            {formatPrice(property.price)}
          </Text>

          <View className="flex flex-row items-center gap-2">
            <View className="flex flex-row items-center gap-1">
              <Ionicons name="bed-outline" size={15} />
              <Text>{property.bedrooms}</Text>
            </View>
            <View className="flex flex-row items-center gap-1">
              <Ionicons name="water-outline" size={15} />
              <Text>{property.bathrooms}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View className="absolute top-2 left-2 bg-white/70 px-3 py-1 rounded-3xl">
        <Text className="capitalize text-sm">{property.type}</Text>
      </View>

      {property.is_sold && (
        <View className="absolute top-2 right-2 bg-primary/70 px-3 py-1 rounded-3xl">
          <Text className="capitalize text-sm text-white">Sold</Text>
        </View>
      )}
    </View>
  );
}
