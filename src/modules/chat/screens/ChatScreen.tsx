import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/src/ui/molecules/Button/Button";
import { colors, spacing, layout } from "@/src/theme";
import MessageBubble from "../components/MessageBubble";
import { ChatMessage, ChatStreamSSEEvent } from "../types";
import {
  buildMessageStartMessage,
  buildTextChunkMessage,
  buildMessageEndMessage,
  buildComponentStartMessage,
  buildComponentFieldMessage,
  buildComponentEndMessage,
} from "../utils/messages";
import { mockStreamEvents } from "../data/mockStreamEvents";

export const ChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const flatListRef = React.useRef<FlatList>(null);

  const processEvent = useCallback(
    (event: ChatStreamSSEEvent, currentMessages: ChatMessage[]) => {
      try {
        switch (event.event) {
          case "message_start":
            const newMessage = buildMessageStartMessage({ event });
            return [...currentMessages, newMessage];

          case "text_chunk":
            return currentMessages.map((msg) =>
              msg.id === event.messageId
                ? buildTextChunkMessage({ event, message: msg })
                : msg
            );

          case "message_end":
            return currentMessages.map((msg) =>
              msg.id === event.messageId
                ? buildMessageEndMessage({ event, message: msg })
                : msg
            );

          case "component_start":
            return currentMessages.map((msg) =>
              msg.id === event.messageId
                ? buildComponentStartMessage({ event, message: msg })
                : msg
            );

          case "component_field":
            return currentMessages.map((msg) =>
              msg.id === event.messageId
                ? buildComponentFieldMessage({ event, message: msg })
                : msg
            );

          case "component_end":
            return currentMessages.map((msg) =>
              msg.id === event.messageId
                ? buildComponentEndMessage({ event, message: msg })
                : msg
            );

          default:
            return currentMessages;
        }
      } catch (error) {
        console.error("Error processing event:", error);
        return currentMessages;
      }
    },
    []
  );

  const handleStartStream = () => {
    if (isStreaming) return;

    setIsStreaming(true);
    setMessages([]);

    let eventIndex = 0;

    const processNextEvent = () => {
      if (eventIndex >= mockStreamEvents.length) {
        setIsStreaming(false);
        return;
      }

      const event = mockStreamEvents[eventIndex];
      setMessages((currentMessages) => {
        const newMessages = processEvent(event, currentMessages);
        // Scroll to end after message update
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
        return newMessages;
      });

      eventIndex++;

      // Simulate realistic delays between events
      const delay =
        event.event === "text_chunk"
          ? 100 // Shorter delay since typing animation handles character timing
          : event.event === "component_field"
          ? 400
          : event.event === "message_start"
          ? 600
          : 500;

      setTimeout(processNextEvent, delay);
    };

    processNextEvent();
  };

  const renderMessage: ListRenderItem<ChatMessage> = ({ item, index }) => (
    <MessageBubble message={item} testID={`message-bubble-${index}`} />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />
      </View>

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
  messagesList: {
    padding: spacing.md,
    gap: spacing.md,
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
