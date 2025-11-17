import React, { createContext, useCallback, useMemo, useReducer } from "react";
import { chatReducer, defaultState } from "./chatReducer";
import {
  ChatMessage,
  MessageStartEvent,
  TextChunkEvent,
  MessageEndEvent,
  ComponentStartEvent,
  ComponentFieldEvent,
  ComponentEndEvent,
} from "../types";
import { useSSEStream } from "../../../services/sse/useSSEStream";

const STREAM_URL =
  "https://api-dev.withallo.com/v1/demo/interview/conversation";

type ChatContextType = {
  messages: ChatMessage[];
  handleStartStream: () => void;
  handleStopStream: () => void;
  status: "idle" | "loading" | "streaming";
};

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  handleStartStream: () => {},
  handleStopStream: () => {},
  status: "idle",
});

export const ChatProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(chatReducer, defaultState);

  const processEvent = useCallback(
    (event: any) => {
      console.log("processEvent", event);
      try {
        const data = JSON.parse(event.data);
        switch (event.type) {
          case "message_start":
            return dispatch({
              type: "MESSAGE_START",
              payload: data as MessageStartEvent,
            });
          case "text_chunk":
            return dispatch({
              type: "TEXT_CHUNK",
              payload: data as TextChunkEvent,
            });
          case "message_end":
            return dispatch({
              type: "MESSAGE_END",
              payload: data as MessageEndEvent,
            });
          case "component_start":
            return dispatch({
              type: "COMPONENT_START",
              payload: data as ComponentStartEvent,
            });
          case "component_field":
            return dispatch({
              type: "COMPONENT_FIELD",
              payload: data as ComponentFieldEvent,
            });
          case "component_end":
            return dispatch({
              type: "COMPONENT_END",
              payload: data as ComponentEndEvent,
            });
          default:
            console.error("Unknown event type", event.type, data);
            return;
        }
      } catch (error) {
        console.error("Failed to parse SSE event data:", event.data, error);
      }
    },
    [dispatch]
  );

  // SSE event handlers
  const eventHandlers = useMemo(
    () => ({
      onOpen: () => {
        console.log("Chat SSE connection opened");
        dispatch({ type: "SET_STATUS", payload: "streaming" });
      },
      onError: (event: any) => {
        console.error("Chat SSE connection error", event);
        dispatch({ type: "SET_STATUS", payload: "idle" });
      },
      onClose: () => {
        console.log("Chat SSE connection closed");
        dispatch({ type: "SET_STATUS", payload: "idle" });
      },
      message_start: processEvent,
      text_chunk: processEvent,
      message_end: processEvent,
      component_start: processEvent,
      component_field: processEvent,
      component_end: processEvent,
    }),
    [processEvent]
  );

  const { start, stop } = useSSEStream({
    url: STREAM_URL,
    eventHandlers,
  });

  const handleStartStream = useCallback(() => {
    console.log("Starting SSE stream");
    start();
    dispatch({ type: "SET_STATUS", payload: "loading" });
  }, [start]);

  const handleStopStream = useCallback(() => {
    console.log("Stopping SSE stream");

    stop();
    dispatch({ type: "RESET_CHAT" });
  }, [stop, dispatch]);

  return (
    <ChatContext.Provider
      value={{
        messages: state.messages,
        handleStartStream,
        handleStopStream,
        status: state.status,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
