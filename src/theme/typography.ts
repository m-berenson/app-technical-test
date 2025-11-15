import { TextStyle } from "react-native";

export const typography = {
  // ================================
  // Display styles
  // ================================
  displayLarge: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  },
  displayMedium: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
  },
  // ================================
  // Heading styles
  // ================================
  headingLarge: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  headingMedium: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  headingSmall: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  // ================================
  // Title styles
  // ================================
  titleLarge: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  titleMedium: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  titleSmall: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  // ================================
  // Body styles
  // ================================
  bodyLarge: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  // ================================
  // Label styles
  // ================================
  labelLarge: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 14,
  },
  // ================================
  // Button styles
  // ================================
  button: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  // ================================
  // Caption styles
  // ================================
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
} satisfies Record<string, TextStyle>;
