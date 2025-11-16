import React from "react";
import { ChatScreen } from "@/src/modules/chat/screens/ChatScreen";
import { ChatProvider } from "@/src/modules/chat/contexts/ChatProvider";

export default function App() {
  return (
    <ChatProvider>
      <ChatScreen />
    </ChatProvider>
  );
}
