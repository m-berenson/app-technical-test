import React, { useEffect } from "react";
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
import { ChatMessage } from "../types";
import { useChatContext } from "../hooks/useChatContext";

export const ChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { messages, handleStartStream } = useChatContext();

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
