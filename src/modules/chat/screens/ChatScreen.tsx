import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/src/ui/molecules/Button";
import { colors, spacing, layout } from "@/src/theme";

export const ChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const handleStartStream = () => {
    console.log("Start streaming chat");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content} />

      <View style={[styles.controls, { paddingBottom: insets.bottom }]}>
        <Button
          label="Start Stream"
          variant="primary"
          onPress={handleStartStream}
          testID="start-stream-button"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  controls: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.border,
    borderRadius: layout.radius.lg,
  },
});
