import {
  MessageStartEvent,
  TextChunkEvent,
  MessageEndEvent,
  ComponentStartEvent,
  ComponentFieldEvent,
  COMPONENT_TYPE,
  ComponentEndEvent,
  ChatStreamSSEEvent,
  VALID_COMPONENT_FIELDS,
} from "@/src/modules/chat/types";

const validateMessageStartEvent = (
  event: MessageStartEvent
): MessageStartEvent => {
  if (!event.messageId || !event.role) {
    throw new Error("Invalid message start event");
  }

  return event;
};

const validateTextChunkEvent = (event: TextChunkEvent): TextChunkEvent => {
  if (!event.messageId || !event.chunk || !event.index) {
    throw new Error("Invalid text chunk event");
  }

  return event;
};

const validateMessageEndEvent = (event: MessageEndEvent): MessageEndEvent => {
  if (!event.messageId) {
    throw new Error("Invalid message end event");
  }

  return event;
};

const validateComponentStartEvent = (
  event: ComponentStartEvent
): ComponentStartEvent => {
  if (
    !event.messageId ||
    !event.componentType ||
    !COMPONENT_TYPE.includes(event.componentType)
  ) {
    throw new Error("Invalid component start event.");
  }

  return event;
};

const validateComponentFieldEvent = (
  event: ComponentFieldEvent
): ComponentFieldEvent => {
  if (!event.messageId || !event.field || !event.value) {
    throw new Error("Invalid component field event");
  }

  if (
    !VALID_COMPONENT_FIELDS.includes(
      event.field as unknown as (typeof VALID_COMPONENT_FIELDS)[number]
    )
  ) {
    throw new Error("Invalid component field event");
  }

  return event;
};

const validateComponentEndEvent = (
  event: ComponentEndEvent
): ComponentEndEvent => {
  if (!event.messageId) {
    throw new Error("Invalid component end event");
  }

  return event;
};

export const validateChatStreamSSEEvent = (
  event: ChatStreamSSEEvent
): ChatStreamSSEEvent => {
  try {
    switch (event.event) {
      case "message_start":
        return validateMessageStartEvent(event);
      case "text_chunk":
        return validateTextChunkEvent(event);
      case "message_end":
        return validateMessageEndEvent(event);
      case "component_start":
        return validateComponentStartEvent(event);
      case "component_field":
        return validateComponentFieldEvent(event);
      case "component_end":
        return validateComponentEndEvent(event);
      default:
        throw new Error("Invalid event: " + event);
    }
  } catch (error) {
    throw new Error("Error parsing chat stream SSE event: " + error);
  }
};
