import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { layout } from "./layout";

export { ButtonVariant } from "./button";

export { BadgeVariant } from "./badge";

export type ColorToken = keyof typeof colors;

export type SpacingToken = keyof typeof spacing;

export type TextVariant = keyof typeof typography;

export type RadiusToken = keyof typeof layout.radius;

export type AvatarToken = keyof typeof layout.avatar;

export type ZIndexToken = keyof typeof layout.zIndex;

export type TestingProps = {
  testID: string;
};

export type HapticProps = {
  enableHaptics?: boolean;
};
