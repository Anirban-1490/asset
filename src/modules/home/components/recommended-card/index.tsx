import { Property } from "@/types";
import { formatPrice } from "@/utils/format-price";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function RecommendedCards({ property }: { property: Property }) {
  const isSaved = true;

  return (
    <View className="mb-7 rounded-lg overflow-hidden relative">
      <TouchableOpacity>
        <Image
          className="w-full h-[10rem]"
          source={{ uri: property?.images?.[0] || " " }}
          resizeMode="cover"
          alt={property.title}
        />

        <View className="py-5 px-2">
          <Text className="font-semibold text-lg">{property.title}</Text>

          <View className="flex items-center flex-row gap-1">
            <Ionicons name="location-outline" size={16} />
            <Text numberOfLines={1} className="text-sm text-gray-400">
              {property.city}
            </Text>
          </View>
        </View>
        <View className="flex flex-row px-2">
          <Text className="text-lg font-bold text-primary mr-auto">
            {formatPrice(property.price)}
          </Text>

          {property.is_sold ? (
            <View>
              <Text className="text-lg text-primary font-bold">SOLD</Text>
            </View>
          ) : (
            <View className="flex flex-row items-center gap-2">
              <View className="flex flex-row items-center gap-1">
                <Ionicons name="bed-outline" size={15} />
                <Text>{property.bedrooms}</Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <Ionicons name="expand-outline" size={15} />
                <Text>{property.area_sqft} ft²</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,

          elevation: 6,
        }}
        className="absolute top-2 right-2 p-2  bg-white rounded-full"
      >
        <Ionicons
          name={isSaved ? "heart" : "heart-outline"}
          color="#F5004F"
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
}
