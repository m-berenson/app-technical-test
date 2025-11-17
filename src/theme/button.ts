import { colors } from "./colors";

export const buttonVariants = {
  primary: "primary",
  secondary: "secondary",
} as const;

export type ButtonVariant =
  (typeof buttonVariants)[keyof typeof buttonVariants];

export const getButtonStyles = (variant: ButtonVariant, disabled: boolean) => {
  switch (variant) {
    case buttonVariants.primary:
      return {
        backgroundColor: disabled ? colors.secondary : colors.primary,
      };
    case buttonVariants.secondary:
      return {
        backgroundColor: colors.secondary,
        borderWidth: 1,
        borderColor: disabled ? colors.border : colors.primary,
      };
    default:
      return {};
  }
};

export const getButtonTextColor = (
  variant: ButtonVariant,
  disabled: boolean
): keyof typeof colors => {
  if (disabled) {
    return "textSecondary";
  }
  return variant === buttonVariants.primary ? "textOnPrimary" : "primary";
};
