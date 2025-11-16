import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing, layout, colors } from "@/src/theme";
import { TestingProps } from "@/src/theme/types";
import { Text } from "@/src/ui/atoms/Text/Text";
import { ChatComponent, ChatMessage } from "../types";
import { ContactCard } from "./ContactCard";
import CalendarEventCard from "./CalendarEventCard";
import { useTypingAnimation } from "../hooks/useTypingAnimation";

interface MessageBubbleProps extends TestingProps {
  message: ChatMessage;
}

const MESSAGE_BUBBLE_VARIANT_STYLES = {
  user: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  agent: {
    backgroundColor: colors.background,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
} as const;

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, testID }) => {
  const { displayText } = useTypingAnimation({
    text: message.content,
    isCompleted: message.isCompleted,
  });

  return (
    <View
      style={[styles.container, MESSAGE_BUBBLE_VARIANT_STYLES[message.role]]}
      testID={testID}
    >
      {displayText && (
        <Text variant="bodyMedium" testID={`${testID}-text`}>
          {displayText}
        </Text>
      )}
      {message.component && (
        <Component component={message.component} testID={testID} />
      )}
    </View>
  );
};

const Component = ({
  component,
  testID,
}: {
  component: ChatComponent;
  testID: string;
}) => {
  if (component.type === "contact_badge") {
    return (
      <ContactCard
        name={component.name}
        email={component.email}
        company={component.company}
        profilePicture={component.profilePicture}
        testID={`${testID}-contact-card`}
      />
    );
  }
  if (component.type === "calendar_event") {
    return (
      <CalendarEventCard
        title={component.title}
        date={component.date}
        time={component.time}
        status={component.status}
        testID={`${testID}-calendar-card`}
      />
    );
  }
  return null;
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
