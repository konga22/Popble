import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../../ui/AppText";
import { COLORS } from "../../../constants/colors";

export type TrendingPopupCardProps = {
  image: string;
  category: string;
  title: string;
  until: string;
  hot?: boolean;
  isSaved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export default function TrendingPopupCard({
  image,
  category,
  title,
  until,
  hot,
  isSaved,
  onPress,
  onToggleSaved,
}: TrendingPopupCardProps) {
  const handleSavePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onToggleSaved();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${category}, ${until}`}
      className="w-[260px] gap-2.5"
    >
      <View className="rounded-[32px] overflow-hidden shadow-md">
        <Image
          source={{ uri: image }}
          className="w-[260px] h-[325px]"
          resizeMode="cover"
        />
        {hot ? (
          <View className="absolute top-3 left-3 bg-white/80 rounded-full px-3 py-1">
            <Text className="text-primary text-[10px] font-bold">HOT</Text>
          </View>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSavePress}
          accessibilityRole="button"
          accessibilityLabel={isSaved ? "저장 해제" : "저장하기"}
          className="absolute right-3 top-3 h-11 w-11 items-center justify-center rounded-full bg-white/90"
        >
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={18}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <View className="px-1">
        <Text className="text-primary-dark text-[11px] font-bold tracking-widest uppercase">
          {category}
        </Text>
        <Text className="text-heading text-base leading-6 mt-0.5">
          {title}
        </Text>
        <Text className="text-muted text-xs mt-0.5">{until}</Text>
      </View>
    </TouchableOpacity>
  );
}
