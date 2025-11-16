import React, { useMemo } from "react";
import { PressableContainer } from "@/src/ui/atoms/PressableContainer/PressableContainer";
import { Text } from "@/src/ui/atoms/Text/Text";
import {
  getButtonStyles,
  getButtonTextColor,
  buttonVariants,
  layout,
  spacing,
} from "@/src/theme";
import { ButtonVariant, TestingProps } from "@/src/theme/types";
import { StyleSheet } from "react-native";

export interface ButtonProps extends TestingProps {
  label: string;
  variant?: ButtonVariant;
  onPress: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = buttonVariants.primary,
  onPress,
  disabled = false,
  testID,
}) => {
  const buttonStyles = useMemo(
    () => ({ ...styles.button, ...getButtonStyles(variant, disabled) }),
    [variant, disabled]
  );
  const textColor = useMemo(
    () => getButtonTextColor(variant, disabled),
    [variant, disabled]
  );

  return (
    <PressableContainer
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      testID={`${testID}-pressable`}
    >
      <Text variant="button" colorToken={textColor} testID={`${testID}-text`}>
        {label}
      </Text>
    </PressableContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: layout.radius.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
});
