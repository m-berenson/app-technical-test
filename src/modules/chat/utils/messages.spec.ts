import {
  ChatMessage,
  MessageStartEvent,
  TextChunkEvent,
  MessageEndEvent,
  ComponentStartEvent,
  ComponentFieldEvent,
  ComponentEndEvent,
} from "../types";
import {
  buildMessageStartMessage,
  buildTextChunkMessage,
  buildMessageEndMessage,
  buildComponentStartMessage,
  buildComponentFieldMessage,
  buildComponentEndMessage,
} from "./messages";

describe("buildMessage", () => {
  describe("message_start event", () => {
    it("should build a message start message successfully", () => {
      const event: MessageStartEvent = {
        event: "message_start",
        messageId: "msg-123",
        role: "user",
      };

      const result = buildMessageStartMessage({ event });

      expect(result).toEqual({
        id: "msg-123",
        role: "user",
        content: "",
        isCompleted: false,
        lastChunkIndex: -1,
      });
    });

    it("should build a message start message for agent role", () => {
      const event: MessageStartEvent = {
        event: "message_start",
        messageId: "msg-456",
        role: "agent",
      };

      const result = buildMessageStartMessage({ event });

      expect(result).toEqual({
        id: "msg-456",
        role: "agent",
        content: "",
        isCompleted: false,
        lastChunkIndex: -1,
      });
    });

    it("should throw error for invalid message start event", () => {
      const invalidEvent = {
        event: "message_start",
        role: "user",
      } as any;

      expect(() => buildMessageStartMessage({ event: invalidEvent })).toThrow(
        "Error building message start message: Error: Invalid message start event"
      );
    });
  });

  describe("text_chunk event", () => {
    let baseMessage: ChatMessage;

    beforeEach(() => {
      baseMessage = {
        id: "msg-123",
        role: "user",
        content: "Hello",
        isCompleted: false,
        lastChunkIndex: 0,
      } as const;
    });

    it("should build a text chunk message successfully", () => {
      const event: TextChunkEvent = {
        event: "text_chunk",
        messageId: "msg-123",
        chunk: " world",
        index: 1,
      };

      const result = buildTextChunkMessage({ event, message: baseMessage });

      expect(result).toEqual({
        id: "msg-123",
        role: "user",
        content: "Hello world",
        isCompleted: false,
        lastChunkIndex: 1,
      });
    });

    it("should throw error for invalid chunk index (not sequential)", () => {
      const event: TextChunkEvent = {
        event: "text_chunk",
        messageId: "msg-123",
        chunk: " world",
        index: 3, // Should be 1
      };

      expect(() =>
        buildTextChunkMessage({ event, message: baseMessage })
      ).toThrow(
        "Error building text chunk message: Error: Invalid chunk index"
      );
    });

    it("should throw error for mismatched message ID", () => {
      const event: TextChunkEvent = {
        event: "text_chunk",
        messageId: "different-id",
        chunk: " world",
        index: 1,
      };

      expect(() =>
        buildTextChunkMessage({ event, message: baseMessage })
      ).toThrow("Error building text chunk message: Error: Invalid message id");
    });

    it("should throw error for invalid text chunk event", () => {
      const invalidEvent = {
        event: "text_chunk",
        chunk: " world",
        index: 1,
      } as any;

      expect(() =>
        buildTextChunkMessage({ event: invalidEvent, message: baseMessage })
      ).toThrow(
        "Error building text chunk message: Error: Invalid text chunk event"
      );
    });
  });

  describe("message_end event", () => {
    let baseMessage: ChatMessage;

    beforeEach(() => {
      baseMessage = {
        id: "msg-123",
        role: "user",
        content: "Hello world",
        isCompleted: false,
        lastChunkIndex: 2,
      };
    });

    it("should build a message end message successfully", () => {
      const event: MessageEndEvent = {
        event: "message_end",
        messageId: "msg-123",
      };

      const result = buildMessageEndMessage({ event, message: baseMessage });

      expect(result).toEqual({
        id: "msg-123",
        role: "user",
        content: "Hello world",
        isCompleted: true,
        lastChunkIndex: 2,
      });
    });

    it("should throw error for mismatched message ID", () => {
      const event: MessageEndEvent = {
        event: "message_end",
        messageId: "different-id",
      };

      expect(() =>
        buildMessageEndMessage({ event, message: baseMessage })
      ).toThrow(
        "Error building message end message: Error: Invalid message id"
      );
    });

    it("should throw error for invalid message end event", () => {
      const invalidEvent = {
        event: "message_end",
      } as any;

      expect(() =>
        buildMessageEndMessage({ event: invalidEvent, message: baseMessage })
      ).toThrow(
        "Error building message end message: Error: Invalid message end event"
      );
    });
  });

  describe("component_start event", () => {
    let baseMessage: ChatMessage;

    beforeEach(() => {
      baseMessage = {
        id: "msg-123",
        role: "agent",
        content: "Here's a contact:",
        isCompleted: false,
        lastChunkIndex: 1,
      };
    });

    it("should build a contact badge component start message", () => {
      const event: ComponentStartEvent = {
        event: "component_start",
        messageId: "msg-123",
        componentType: "contact_badge",
      };

      const result = buildComponentStartMessage({
        event,
        message: baseMessage,
      });

      expect(result).toEqual({
        id: "msg-123",
        role: "agent",
        content: "Here's a contact:",
        isCompleted: false,
        lastChunkIndex: 1,
        component: {
          type: "contact_badge",
          isCompleted: false,
          name: "",
          email: "",
          company: "",
          profilePicture: "",
        },
      });
    });

    it("should build a calendar event component start message", () => {
      const event: ComponentStartEvent = {
        event: "component_start",
        messageId: "msg-123",
        componentType: "calendar_event",
      };

      const result = buildComponentStartMessage({
        event,
        message: baseMessage,
      });

      expect(result).toEqual({
        id: "msg-123",
        role: "agent",
        content: "Here's a contact:",
        isCompleted: false,
        lastChunkIndex: 1,
        component: {
          type: "calendar_event",
          isCompleted: false,
          title: "",
          date: "",
          time: "",
          status: "",
        },
      });
    });

    it("should throw error for mismatched message ID", () => {
      const event: ComponentStartEvent = {
        event: "component_start",
        messageId: "different-id",
        componentType: "contact_badge",
      };

      expect(() =>
        buildComponentStartMessage({ event, message: baseMessage })
      ).toThrow(
        "Error building component start message: Error: Invalid message id"
      );
    });

    it("should throw error for invalid component type", () => {
      const event = {
        event: "component_start",
        messageId: "msg-123",
        componentType: "invalid_type",
      } as any;

      expect(() =>
        buildComponentStartMessage({ event, message: baseMessage })
      ).toThrow(
        "Error building component start message: Error: Invalid component start event."
      );
    });

    it("should throw error for invalid component start event", () => {
      const invalidEvent = {
        event: "component_start",
        componentType: "contact_badge",
      } as any;

      expect(() =>
        buildComponentStartMessage({
          event: invalidEvent,
          message: baseMessage,
        })
      ).toThrow(
        "Error building component start message: Error: Invalid component start event."
      );
    });
  });

  describe("component_field event", () => {
    let baseMessage: ChatMessage;

    beforeEach(() => {
      baseMessage = {
        id: "msg-123",
        role: "agent",
        content: "Contact info:",
        isCompleted: false,
        lastChunkIndex: 1,
        component: {
          type: "contact_badge",
          isCompleted: false,
          name: "",
          email: "",
          company: "",
          profilePicture: "",
        },
      };
    });

    it("should build a component field message successfully", () => {
      const event: ComponentFieldEvent = {
        event: "component_field",
        messageId: "msg-123",
        field: "name",
        value: "John Doe",
      };

      const result = buildComponentFieldMessage({
        event,
        message: baseMessage,
      });

      expect(result).toEqual({
        id: "msg-123",
        role: "agent",
        content: "Contact info:",
        isCompleted: false,
        lastChunkIndex: 1,
        component: {
          type: "contact_badge",
          isCompleted: false,
          name: "John Doe",
          email: "",
          company: "",
          profilePicture: "",
        },
      });
    });

    it("should update calendar event fields", () => {
      const calendarMessage: ChatMessage = {
        id: "msg-456",
        role: "agent",
        content: "Event details:",
        isCompleted: false,
        lastChunkIndex: 1,
        component: {
          type: "calendar_event",
          isCompleted: false,
          title: "",
          date: "",
          time: "",
          status: "",
        },
      };

      const event: ComponentFieldEvent = {
        event: "component_field",
        messageId: "msg-456",
        field: "title",
        value: "Team Meeting",
      };

      const result = buildComponentFieldMessage({
        event,
        message: calendarMessage,
      });

      expect(result.component).toEqual({
        type: "calendar_event",
        isCompleted: false,
        title: "Team Meeting",
        date: "",
        time: "",
        status: "",
      });
    });

    it("should throw error for mismatched message ID", () => {
      const event: ComponentFieldEvent = {
        event: "component_field",
        messageId: "different-id",
        field: "name",
        value: "John Doe",
      };

      expect(() =>
        buildComponentFieldMessage({ event, message: baseMessage })
      ).toThrow(
        "Error building component field message: Error: Invalid message id"
      );
    });

    it("should throw error when no component exists", () => {
      const messageWithoutComponent: ChatMessage = {
        id: "msg-123",
        role: "agent",
        content: "No component here",
        isCompleted: false,
        lastChunkIndex: 1,
      };

      const event: ComponentFieldEvent = {
        event: "component_field",
        messageId: "msg-123",
        field: "name",
        value: "John Doe",
      };

      expect(() =>
        buildComponentFieldMessage({ event, message: messageWithoutComponent })
      ).toThrow(
        "Error building component field message: Error: No component found"
      );
    });

    it("should throw error for invalid component field event", () => {
      const invalidEvent = {
        event: "component_field",
        messageId: "msg-123",
        value: "John Doe",
      } as any;

      expect(() =>
        buildComponentFieldMessage({
          event: invalidEvent,
          message: baseMessage,
        })
      ).toThrow(
        "Error building component field message: Error: Invalid component field event"
      );
    });
  });

  describe("component_end event", () => {
    let baseMessage: ChatMessage;

    beforeEach(() => {
      baseMessage = {
        id: "msg-123",
        role: "agent",
        content: "Contact info:",
        isCompleted: false,
        lastChunkIndex: 1,
        component: {
          type: "contact_badge",
          isCompleted: false,
          name: "John Doe",
          email: "john@example.com",
          company: "Acme Corp",
          profilePicture: "avatar.jpg",
        },
      };
    });

    it("should build a component end message successfully", () => {
      const event: ComponentEndEvent = {
        event: "component_end",
        messageId: "msg-123",
      };

      const result = buildComponentEndMessage({ event, message: baseMessage });

      expect(result).toEqual({
        id: "msg-123",
        role: "agent",
        content: "Contact info:",
        isCompleted: false,
        lastChunkIndex: 1,
        component: {
          type: "contact_badge",
          isCompleted: true,
          name: "John Doe",
          email: "john@example.com",
          company: "Acme Corp",
          profilePicture: "avatar.jpg",
        },
      });
    });

    it("should throw error for mismatched message ID", () => {
      const event: ComponentEndEvent = {
        event: "component_end",
        messageId: "different-id",
      };

      expect(() =>
        buildComponentEndMessage({ event, message: baseMessage })
      ).toThrow(
        "Error building component end message: Error: Invalid message id"
      );
    });

    it("should throw error when no component exists", () => {
      const messageWithoutComponent: ChatMessage = {
        id: "msg-123",
        role: "agent",
        content: "No component here",
        isCompleted: false,
        lastChunkIndex: 1,
      };

      const event: ComponentEndEvent = {
        event: "component_end",
        messageId: "msg-123",
      };

      expect(() =>
        buildComponentEndMessage({ event, message: messageWithoutComponent })
      ).toThrow(
        "Error building component end message: Error: No component found"
      );
    });

    it("should throw error for invalid component end event", () => {
      const invalidEvent = {
        event: "component_end",
      } as any;

      expect(() =>
        buildComponentEndMessage({ event: invalidEvent, message: baseMessage })
      ).toThrow(
        "Error building component end message: Error: Invalid component end event"
      );
    });
  });

  describe("invalid event type", () => {
    it("should throw error for unknown event type", () => {
      const invalidEvent = {
        event: "unknown_event",
        messageId: "msg-123",
      } as any;

      expect(() => buildMessageStartMessage({ event: invalidEvent })).toThrow(
        "Error building message start message: Error: Invalid message start event"
      );
    });
  });

  describe("integration scenarios", () => {
    it("should handle a complete message flow", () => {
      const startEvent: MessageStartEvent = {
        event: "message_start",
        messageId: "msg-123",
        role: "user",
      };

      let message = buildMessageStartMessage({ event: startEvent });
      expect(message.content).toBe("");
      expect(message.isCompleted).toBe(false);

      const chunk1: TextChunkEvent = {
        event: "text_chunk",
        messageId: "msg-123",
        chunk: "Hello",
        index: 0,
      };

      message = buildTextChunkMessage({ event: chunk1, message });
      expect(message.content).toBe("Hello");

      const chunk2: TextChunkEvent = {
        event: "text_chunk",
        messageId: "msg-123",
        chunk: " world",
        index: 1,
      };

      message = buildTextChunkMessage({ event: chunk2, message });
      expect(message.content).toBe("Hello world");

      const endEvent: MessageEndEvent = {
        event: "message_end",
        messageId: "msg-123",
      };

      message = buildMessageEndMessage({ event: endEvent, message });
      expect(message.isCompleted).toBe(true);
    });

    it("should handle a message with component", () => {
      const startEvent: MessageStartEvent = {
        event: "message_start",
        messageId: "msg-456",
        role: "agent",
      };

      let message = buildMessageStartMessage({ event: startEvent });

      const chunk: TextChunkEvent = {
        event: "text_chunk",
        messageId: "msg-456",
        chunk: "Contact: ",
        index: 0,
      };

      message = buildTextChunkMessage({ event: chunk, message });

      const componentStart: ComponentStartEvent = {
        event: "component_start",
        messageId: "msg-456",
        componentType: "contact_badge",
      };

      message = buildComponentStartMessage({ event: componentStart, message });
      expect(message.component?.type).toBe("contact_badge");
      expect(message.component?.isCompleted).toBe(false);

      const nameField: ComponentFieldEvent = {
        event: "component_field",
        messageId: "msg-456",
        field: "name",
        value: "Jane Smith",
      };

      message = buildComponentFieldMessage({ event: nameField, message });
      // @ts-ignore
      expect(message.component?.name).toBe("Jane Smith");

      const emailField: ComponentFieldEvent = {
        event: "component_field",
        messageId: "msg-456",
        field: "email",
        value: "jane@example.com",
      };

      message = buildComponentFieldMessage({ event: emailField, message });
      // @ts-ignore
      expect(message.component?.email).toBe("jane@example.com");

      const componentEnd: ComponentEndEvent = {
        event: "component_end",
        messageId: "msg-456",
      };

      message = buildComponentEndMessage({ event: componentEnd, message });
      expect(message.component?.isCompleted).toBe(true);

      const messageEnd: MessageEndEvent = {
        event: "message_end",
        messageId: "msg-456",
      };

      message = buildMessageEndMessage({ event: messageEnd, message });
      expect(message.isCompleted).toBe(true);
    });
  });
});
