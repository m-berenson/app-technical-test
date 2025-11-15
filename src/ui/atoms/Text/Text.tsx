import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { colors, typography } from "@/src/theme";
import { TextVariant, ColorToken, TestingProps } from "@/src/theme/types";

export interface TextProps
  extends Omit<RNTextProps, "style" | "testID">,
    TestingProps {
  variant: TextVariant;
  colorToken?: ColorToken;
  style?: RNTextProps["style"];
}

export const Text: React.FC<TextProps> = ({
  variant,
  colorToken,
  style,
  children,
  testID,
  ...textProps
}) => {
  const textStyle = StyleSheet.flatten([
    typography[variant],
    colorToken && { color: colors[colorToken] },
    style,
  ]);

  return (
    <RNText style={textStyle} testID={testID} {...textProps}>
      {children}
    </RNText>
  );
};
