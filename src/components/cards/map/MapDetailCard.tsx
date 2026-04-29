import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Text from "../../ui/AppText";
import { COLORS } from "../../../constants/colors";

type Props = {
  imageUri: string;
  title: string;
  dDay: string;
  waitTime: string;
  distance: string;
};

export default function MapDetailCard({
  imageUri,
  title,
  dDay,
  waitTime,
  distance,
}: Props) {
  return (
    <View className="absolute bottom-[110px] left-6 right-6 z-10">
      <View
        className="bg-white/95 rounded-[32px] p-5 gap-4"
        style={{
          shadowColor: "rgba(132,77,116,0.12)",
          shadowOffset: { width: 0, height: 8 * 2.5 },
          shadowOpacity: 1,
          shadowRadius: 50,
          elevation: 10,
        }}
      >
        <View
          className="absolute w-24 h-24 rounded-full -top-10 -right-10 opacity-20"
          style={{ backgroundColor: COLORS.accentPink }}
        />

        <View className="flex-row gap-4">
          <View className="w-24 h-24 rounded-[24px] overflow-hidden">
            <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
          </View>
          <View className="flex-1 gap-1.5">
            <View className="flex-row items-center justify-between">
              <View className="bg-primary-light rounded-full px-2 py-0.5">
                <Text className="text-primary text-[10px] font-bold tracking-widest">
                  {dDay}
                </Text>
              </View>
              <Text className="text-base">🔖</Text>
            </View>
            <Text className="text-heading text-lg font-semibold leading-6">{title}</Text>
            <View className="flex-row gap-3 mt-1">
              <View className="flex-row items-center gap-1">
                <Text className="text-xs">⏱</Text>
                <Text className="text-muted text-xs">{waitTime}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-xs">📍</Text>
                <Text className="text-muted text-xs">{distance}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-full"
            style={{ backgroundColor: COLORS.primary }}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`${title.replace(/\n/g, " ")} 길찾기 및 상세정보 보기`}
          >
            <Text className="text-white text-sm">🗺</Text>
            <Text className="text-white text-sm">길찾기 및 상세정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-12 h-12 bg-muted-subtle rounded-full items-center justify-center"
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`${title.replace(/\n/g, " ")} 공유하기`}
          >
            <Text className="text-base">↗</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
