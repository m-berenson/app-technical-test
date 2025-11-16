import React, { createContext, useCallback, useReducer } from "react";
import { chatReducer, defaultState } from "./chatReducer";
import { ChatMessage, ChatStreamSSEEvent } from "../types";
import { mockStreamEvents } from "../data/mockStreamEvents";

export const ChatContext = createContext<{
  messages: ChatMessage[];
  handleStartStream: () => void;
}>({
  messages: [],
  handleStartStream: () => {},
});

export const ChatProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(chatReducer, defaultState);

  const processEvent = useCallback(
    (event: ChatStreamSSEEvent) => {
      switch (event.event) {
        case "message_start":
          return dispatch({ type: "MESSAGE_START", payload: event });
        case "text_chunk":
          return dispatch({ type: "TEXT_CHUNK", payload: event });
        case "message_end":
          return dispatch({ type: "MESSAGE_END", payload: event });
        case "component_start":
          return dispatch({ type: "COMPONENT_START", payload: event });
        case "component_field":
          return dispatch({ type: "COMPONENT_FIELD", payload: event });
        case "component_end":
          return dispatch({ type: "COMPONENT_END", payload: event });
        default:
          return;
      }
    },
    [dispatch]
  );

  const handleStartStream = useCallback(() => {
    if (state.streamStatus === "started") return;

    dispatch({ type: "UPDATE_STREAM_STATUS", payload: { status: "started" } });

    let eventIndex = 0;

    const processNextEvent = () => {
      if (eventIndex >= mockStreamEvents.length) {
        dispatch({
          type: "UPDATE_STREAM_STATUS",
          payload: { status: "completed" },
        });
        return;
      }

      const event = mockStreamEvents[eventIndex];
      processEvent(event);

      eventIndex++;
      setTimeout(processNextEvent, 200);
    };

    processNextEvent();
  }, [state.streamStatus, processEvent]);

  return (
    <ChatContext.Provider
      value={{ messages: state.messages, handleStartStream }}
    >
      {children}
    </ChatContext.Provider>
  );
};
