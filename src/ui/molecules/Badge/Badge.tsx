import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/src/ui/atoms/Text/Text";
import { spacing, layout, badgeVariants } from "@/src/theme";
import { BadgeVariant, TestingProps } from "@/src/theme/types";
import { BADGE_VARIANT_STYLES } from "@/src/theme/badge";

export interface BadgeProps extends TestingProps {
  label: string;
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = badgeVariants.subtle,
  testID,
}) => {
  const variantStyles = BADGE_VARIANT_STYLES[variant];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: variantStyles.backgroundColor },
      ]}
      testID={testID}
    >
      <Text
        variant="overline"
        colorToken={variantStyles.textColorToken}
        testID={`${testID}-label`}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: layout.radius.full,
  },
});
