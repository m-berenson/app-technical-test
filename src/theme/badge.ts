import { colors } from "./colors";

export const badgeVariants = {
  subtle: "subtle",
  positive: "positive",
  informative: "informative",
  negative: "negative",
} as const;

export type BadgeVariant = (typeof badgeVariants)[keyof typeof badgeVariants];

export type BadgeVariantStyles = {
  backgroundColor: string;
  textColorToken: keyof typeof colors;
};

export const BADGE_VARIANT_STYLES = {
  subtle: {
    backgroundColor: colors.badgeSubtleBackground,
    textColorToken: "textSecondary",
  },
  positive: {
    backgroundColor: colors.badgePositiveBackground,
    textColorToken: "success",
  },
  informative: {
    backgroundColor: colors.badgeInformativeBackground,
    textColorToken: "info",
  },
  negative: {
    backgroundColor: colors.badgeNegativeBackground,
    textColorToken: "error",
  },
} satisfies Record<BadgeVariant, BadgeVariantStyles>;
