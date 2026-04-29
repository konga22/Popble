import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Text from "../../ui/AppText";
import { COLORS } from "../../../constants/colors";

type AvatarStackProps = {
  avatars: string[];
  avatarBgs: string[];
};

function AvatarStack({ avatars, avatarBgs }: AvatarStackProps) {
  return (
    <View className="flex-row">
      {avatars.slice(0, 3).map((uri, index) => (
        <View
          key={uri}
          className="w-7 h-7 rounded-full overflow-hidden border-2 border-white"
          style={{
            marginLeft: index === 0 ? 0 : -10,
            backgroundColor: avatarBgs[index] ?? COLORS.lavender,
          }}
        >
          <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
        </View>
      ))}
    </View>
  );
}

type Props = {
  image: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  tags: string[];
  dDay: string;
  slots: number;
  avatars: string[];
  avatarBgs: string[];
};

export default function PartnerRecruitCard({
  image,
  badge,
  badgeColor,
  title,
  subtitle,
  tags,
  dDay,
  slots,
  avatars,
  avatarBgs,
}: Props) {
  return (
    <View
      className="bg-white rounded-[32px] overflow-hidden"
      style={{
        shadowColor: "rgba(51,50,56,0.06)",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 6,
      }}
    >
      <View className="h-52 relative">
        <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
        <View
          className="absolute top-4 left-4 rounded-full px-3 py-1"
          style={{ backgroundColor: badgeColor }}
        >
          <Text className="text-white text-[10px] font-bold tracking-widest uppercase">
            {badge}
          </Text>
        </View>
        <View className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1">
          <Text className="text-primary text-[10px] font-bold">{dDay}</Text>
        </View>
      </View>

      <View className="p-5 gap-3">
        <View>
          <Text className="text-heading text-base font-bold leading-6">{title}</Text>
          <Text className="text-muted text-xs mt-1">{subtitle}</Text>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {tags.map((tag) => (
            <View key={tag} className="bg-muted-subtle rounded-full px-3 py-1">
              <Text className="text-muted text-[11px]">{tag}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center justify-between pt-1">
          <View className="flex-row items-center gap-2">
            <AvatarStack avatars={avatars} avatarBgs={avatarBgs} />
            <Text className="text-muted text-xs">{slots}자리 남음</Text>
          </View>
          <TouchableOpacity
            className="px-5 py-2.5 rounded-full"
            style={{ backgroundColor: COLORS.primary }}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`${title} 같이 가기`}
          >
            <Text className="text-white text-xs font-semibold">같이 가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
