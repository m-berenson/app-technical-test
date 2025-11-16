import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { triggerImpactLight } from "@/src/services/haptics";
import { pressFeedback } from "@/src/theme";
import { HapticProps } from "@/src/theme/types";

export interface PressableContainerProps
  extends Omit<PressableProps, "style">,
    HapticProps {
  disabled?: boolean;
  onPress?: () => void;
  enableScale?: boolean;
  style?: ViewStyle;
}

export const PressableContainer: React.FC<PressableContainerProps> = ({
  disabled = false,
  children,
  style,
  onPress,
  enableHaptics = true,
  enableScale = !!onPress && !disabled,
  ...pressableProps
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (event: GestureResponderEvent) => {
    if (enableScale) {
      scale.value = pressFeedback.scale.pressed;
    }
    pressableProps.onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    if (enableScale) {
      scale.value = pressFeedback.scale.released;
    }
    pressableProps.onPressOut?.(event);
  };

  const handlePress = async () => {
    if (!!onPress && !disabled) {
      if (enableHaptics) {
        await triggerImpactLight();
      }
      onPress();
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole={pressableProps.accessibilityRole || "button"}
        accessibilityState={pressableProps.accessibilityState || { disabled }}
        disabled={disabled}
        style={style}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        {...pressableProps}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};
