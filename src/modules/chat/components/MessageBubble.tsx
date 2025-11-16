import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing, layout, colors } from "@/src/theme";
import { TestingProps } from "@/src/theme/types";
import { Text } from "@/src/ui/atoms/Text/Text";

interface MessageBubbleProps extends TestingProps {
  message: string;
  sender: "user" | "agent";
  component?: "contact" | "calendar_event";
}

const MESSAGE_BUBBLE_VARIANT_STYLES = {
  user: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
  },
  agent: {
    backgroundColor: colors.background,
    alignSelf: "flex-start",
  },
} as const;

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  sender,
  testID,
  component = "calendar_event",
}) => {
  return (
    <View
      style={[styles.container, MESSAGE_BUBBLE_VARIANT_STYLES[sender]]}
      testID={testID}
    >
      <Text variant="bodyMedium" testID={`${testID}-text`}>
        {message}
      </Text>
      {/* TODO: Add contact card */}
      {component === "contact" && null}
      {/* TODO: Add calendar event card */}
      {component === "calendar_event" && null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: layout.radius.lg,
    backgroundColor: colors.background,
    maxWidth: "80%",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  agentContainer: {
    alignSelf: "flex-start",
  },
});

export default MessageBubble;
