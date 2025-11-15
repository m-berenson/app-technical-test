import { Easing, withSpring } from "react-native-reanimated";

export const animationConfig = {
  spring: {
    damping: 15,
    stiffness: 300,
    mass: 1,
  },
  timing: {
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
} as const;

export const pressFeedback = {
  scale: {
    pressed: withSpring(0.95, animationConfig.spring),
    released: withSpring(1, animationConfig.spring),
  },
  opacity: {
    pressed: 0.8,
    released: 1,
  },
} as const;
