import * as Haptics from "expo-haptics";

export const triggerImpactLight = async (): Promise<void> => {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    console.warn("Haptics not available:", error);
  }
};

export const hapticImpact = async (style: Haptics.ImpactFeedbackStyle) => {
  await Haptics.impactAsync(style);
};

export const hapticSelection = async () => {
  await Haptics.selectionAsync();
};

export const hapticNotification = async (
  type: Haptics.NotificationFeedbackType
) => {
  await Haptics.notificationAsync(type);
};
