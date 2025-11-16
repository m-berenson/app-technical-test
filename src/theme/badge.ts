import { colors } from "./colors";

export const badgeVariants = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  neutral: "neutral",
} as const;

export type BadgeVariant = (typeof badgeVariants)[keyof typeof badgeVariants];

export type BadgeVariantStyles = {
  backgroundColor: string;
};

export const BADGE_VARIANT_STYLES = {
  success: {
    backgroundColor: colors.success,
  },
  warning: {
    backgroundColor: colors.warning,
  },
  error: {
    backgroundColor: colors.error,
  },
  info: {
    backgroundColor: colors.info,
  },
  neutral: {
    backgroundColor: colors.secondary,
  },
} satisfies Record<BadgeVariant, BadgeVariantStyles>;
