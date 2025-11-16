import {
  ChatMessage,
  ComponentEndEvent,
  ComponentFieldEvent,
  ComponentStartEvent,
  isValidComponentType,
  MessageEndEvent,
  MessageStartEvent,
  TextChunkEvent,
} from "../types";
import { eventValidators } from "./validators";

export const buildMessageStartMessage = ({
  event,
}: {
  event: MessageStartEvent;
}): ChatMessage => {
  try {
    const validatedEvent = eventValidators.messageStart(event);

    return {
      id: validatedEvent.messageId,
      role: validatedEvent.role,
      content: "",
      isCompleted: false,
      lastChunkIndex: -1,
    };
  } catch (error) {
    throw new Error("Error building message start message: " + error);
  }
};

export const buildTextChunkMessage = ({
  event,
  message,
}: {
  event: TextChunkEvent;
  message: ChatMessage;
}): ChatMessage => {
  try {
    const validatedEvent = eventValidators.textChunk(event);

    if (validatedEvent.index !== message.lastChunkIndex + 1) {
      throw new Error("Invalid chunk index");
    }

    if (validatedEvent.messageId !== message.id) {
      throw new Error("Invalid message id");
    }

    return {
      ...message,
      content: message.content + validatedEvent.chunk,
      lastChunkIndex: validatedEvent.index,
    };
  } catch (error) {
    throw new Error("Error building text chunk message: " + error);
  }
};

export const buildMessageEndMessage = ({
  event,
  message,
}: {
  event: MessageEndEvent;
  message: ChatMessage;
}): ChatMessage => {
  try {
    const validatedEvent = eventValidators.messageEnd(event);

    if (validatedEvent.messageId !== message.id) {
      throw new Error("Invalid message id");
    }

    return {
      ...message,
      isCompleted: true,
    };
  } catch (error) {
    throw new Error("Error building message end message: " + error);
  }
};

export const buildComponentStartMessage = ({
  event,
  message,
}: {
  event: ComponentStartEvent;
  message: ChatMessage;
}): ChatMessage => {
  try {
    const validatedEvent = eventValidators.componentStart(event);

    if (validatedEvent.messageId !== message.id) {
      throw new Error("Invalid message id");
    }

    if (!isValidComponentType(validatedEvent.componentType)) {
      throw new Error("Invalid component type");
    }

    if (validatedEvent.componentType === "calendar_event") {
      return {
        ...message,
        component: {
          type: validatedEvent.componentType,
          isCompleted: false,
          title: "",
          date: "",
          time: "",
          status: "",
        },
      };
    }

    if (validatedEvent.componentType === "contact_badge") {
      return {
        ...message,
        component: {
          type: validatedEvent.componentType,
          isCompleted: false,
          name: "",
          email: "",
          company: "",
          profilePicture: "",
        },
      };
    }

    throw new Error("Invalid component type");
  } catch (error) {
    throw new Error("Error building component start message: " + error);
  }
};

export const buildComponentFieldMessage = ({
  event,
  message,
}: {
  event: ComponentFieldEvent;
  message: ChatMessage;
}): ChatMessage => {
  try {
    const validatedEvent = eventValidators.componentField(event);

    if (validatedEvent.messageId !== message.id) {
      throw new Error("Invalid message id");
    }

    if (!message.component) {
      throw new Error("No component found");
    }

    return {
      ...message,
      component: {
        ...message.component,
        [validatedEvent.field]: validatedEvent.value,
      },
    };
  } catch (error) {
    throw new Error("Error building component field message: " + error);
  }
};

export const buildComponentEndMessage = ({
  event,
  message,
}: {
  event: ComponentEndEvent;
  message: ChatMessage;
}): ChatMessage => {
  try {
    const validatedEvent = eventValidators.componentEnd(event);

    if (validatedEvent.messageId !== message.id) {
      throw new Error("Invalid message id");
    }

    if (!message.component) {
      throw new Error("No component found");
    }

    return {
      ...message,
      component: { ...message.component, isCompleted: true },
    };
  } catch (error) {
    throw new Error("Error building component end message: " + error);
  }
};
