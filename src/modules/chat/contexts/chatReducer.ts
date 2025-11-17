import {
  ChatMessage,
  ComponentEndEvent,
  ComponentFieldEvent,
  ComponentStartEvent,
  MessageEndEvent,
  MessageStartEvent,
  TextChunkEvent,
} from "@/src/modules/chat/types";
import {
  buildComponentEndMessage,
  buildComponentFieldMessage,
  buildComponentStartMessage,
  buildMessageEndMessage,
  buildMessageStartMessage,
  buildTextChunkMessage,
} from "../utils/messages";

interface ChatState {
  messages: ChatMessage[];
  error?: string;
  status: "idle" | "loading" | "streaming";
}

interface MessageStartAction {
  type: "MESSAGE_START";
  payload: MessageStartEvent;
}

interface TextChunkAction {
  type: "TEXT_CHUNK";
  payload: TextChunkEvent;
}

interface MessageEndAction {
  type: "MESSAGE_END";
  payload: MessageEndEvent;
}

interface ComponentStartAction {
  type: "COMPONENT_START";
  payload: ComponentStartEvent;
}

interface ComponentFieldAction {
  type: "COMPONENT_FIELD";
  payload: ComponentFieldEvent;
}

interface ComponentEndAction {
  type: "COMPONENT_END";
  payload: ComponentEndEvent;
}

interface ResetChatAction {
  type: "RESET_CHAT";
}

interface SetStatusAction {
  type: "SET_STATUS";
  payload: "idle" | "loading" | "streaming";
}

export type ChatAction =
  | MessageStartAction
  | TextChunkAction
  | MessageEndAction
  | ComponentStartAction
  | ComponentFieldAction
  | ComponentEndAction
  | ResetChatAction
  | SetStatusAction;

const chatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case "MESSAGE_START":
      try {
        const newMessage = buildMessageStartMessage({ event: action.payload });
        return {
          ...state,
          messages: [...state.messages, newMessage],
        };
      } catch {
        return {
          ...state,
          error: "Error building message start message",
        };
      }

    case "TEXT_CHUNK":
      try {
        return {
          ...state,
          messages: state.messages.map((message) =>
            message.id === action.payload.messageId
              ? buildTextChunkMessage({ event: action.payload, message })
              : message
          ),
        };
      } catch {
        return {
          ...state,
          error: "Error building text chunk message",
        };
      }

    case "MESSAGE_END":
      try {
        return {
          ...state,
          messages: state.messages.map((message) =>
            message.id === action.payload.messageId
              ? buildMessageEndMessage({ event: action.payload, message })
              : message
          ),
        };
      } catch {
        return {
          ...state,
          error: "Error building message end message",
        };
      }
    case "COMPONENT_START":
      try {
        return {
          ...state,
          messages: state.messages.map((message) =>
            message.id === action.payload.messageId
              ? buildComponentStartMessage({ event: action.payload, message })
              : message
          ),
        };
      } catch {
        return {
          ...state,
          error: "Error building component start message",
        };
      }
    case "COMPONENT_FIELD":
      try {
        return {
          ...state,
          messages: state.messages.map((message) =>
            message.id === action.payload.messageId
              ? buildComponentFieldMessage({ event: action.payload, message })
              : message
          ),
        };
      } catch {
        return {
          ...state,
          error: "Error building component field message",
        };
      }

    case "COMPONENT_END":
      try {
        return {
          ...state,
          messages: state.messages.map((message) =>
            message.id === action.payload.messageId
              ? buildComponentEndMessage({ event: action.payload, message })
              : message
          ),
        };
      } catch {
        return {
          ...state,
          error: "Error building component end message",
        };
      }

    case "RESET_CHAT":
      return {
        ...defaultState,
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };

    default:
      return { ...state, error: "Invalid action" };
  }
};

const defaultState: ChatState = {
  messages: [],
  error: undefined,
  status: "idle",
};

export { chatReducer, defaultState };
