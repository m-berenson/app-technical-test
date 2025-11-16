import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "@/src/ui/atoms/Text/Text";
import { colors, layout } from "@/src/theme";
import { AvatarToken, TestingProps, TextVariant } from "@/src/theme/types";
import { getInitials } from "@/src/utils/strings";

export interface AvatarProps extends TestingProps {
  name?: string;
  imageUri?: string;
  size?: AvatarToken;
}

const TEXT_VARIANTS = {
  xs: "labelSmall",
  sm: "labelMedium",
  md: "labelMedium",
  lg: "labelLarge",
  xl: "labelLarge",
} satisfies Record<AvatarToken, TextVariant>;

export const Avatar: React.FC<AvatarProps> = ({
  name,
  imageUri,
  size = "md",
  testID,
}) => {
  const initials = useMemo(() => getInitials(name), [name]);

  const avatarSize = layout.avatar[size];
  const avatarSizeStyles = useMemo(
    () => ({
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
    }),
    [avatarSize]
  );

  const imageSizeStyles = useMemo(
    () => ({
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
    }),
    [avatarSize]
  );

  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        style={imageSizeStyles}
        testID={testID}
        placeholder={colors.secondary}
        placeholderContentFit="cover"
        contentFit="cover"
      />
    );
  }

  return (
    <View style={[avatarSizeStyles, styles.avatar]} testID={testID}>
      <Text
        variant={TEXT_VARIANTS[size]}
        colorToken="textOnPrimary"
        testID={`${testID}-text`}
      >
        {initials ?? "?"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
