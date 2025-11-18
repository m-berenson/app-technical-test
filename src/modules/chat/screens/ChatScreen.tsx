import React, { useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/src/ui/molecules/Button/Button";
import { colors, spacing, layout, useResponsiveLayout } from "@/src/theme";
import MessageBubble from "../components/MessageBubble";
import { ChatMessage } from "../types";
import { useChatContext } from "../hooks/useChatContext";
import { Text } from "@/src/ui/atoms/Text/Text";

export const ChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { messages, handleStartStream, handleStopStream, status } =
    useChatContext();

  const { isChatLoading, isChatStreaming } = useMemo(
    () => ({
      isChatLoading: status === "loading",
      isChatStreaming: status === "streaming",
      isChatIdle: status === "idle",
    }),
    [status]
  );

  const flatListRef = React.useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

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
          ListEmptyComponent={<EmptyState isLoading={isChatLoading} />}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />
      </View>

      <View style={[styles.controls, { paddingBottom: insets.bottom }]}>
        <Button
          label={isChatStreaming ? "Stop Stream" : "Start Stream"}
          variant="primary"
          onPress={isChatStreaming ? handleStopStream : handleStartStream}
          testID="start-stream-button"
          loading={isChatLoading}
        />
      </View>
    </View>
  );
};

const EmptyState = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateContent}>
        {isLoading ? (
          <>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text
              variant="bodyLarge"
              colorToken="textSecondary"
              style={styles.emptyStateText}
              testID="loading-text"
            >
              Starting conversation...
            </Text>
          </>
        ) : (
          <>
            <Text
              variant="displayMedium"
              colorToken="text"
              testID="empty-state-title"
            >
              Welcome! 👋
            </Text>
            <Text
              variant="bodyLarge"
              colorToken="textSecondary"
              style={styles.emptyStateText}
              testID="empty-state-subtitle"
            >
              Ready to start a new chat? Tap the button below to begin your
              conversation.
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    paddingTop: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  connectionStatus: {
    fontSize: 14,
    fontWeight: "500",
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
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyStateContent: {
    alignItems: "center",
    gap: spacing.lg,
    maxWidth: 300,
  },
  emptyStateText: {
    textAlign: "center",
  },
});
