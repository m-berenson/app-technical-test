import {
  MessageStartEvent,
  TextChunkEvent,
  MessageEndEvent,
  ComponentStartEvent,
  ComponentFieldEvent,
  ComponentEndEvent,
} from "../types";
import { eventValidators } from "./validators";

describe("eventValidators", () => {
  describe("messageStart", () => {
    it("should validate a valid message start event", () => {
      const validEvent: MessageStartEvent = {
        event: "message_start",
        messageId: "msg-123",
        role: "user",
      };

      const result = eventValidators.messageStart(validEvent);
      expect(result).toEqual(validEvent);
    });

    it("should throw error for missing messageId", () => {
      const invalidEvent = {
        event: "message_start",
        role: "user",
      } as any;

      expect(() => eventValidators.messageStart(invalidEvent)).toThrow(
        "Invalid message start event"
      );
    });

    it("should throw error for missing role", () => {
      const invalidEvent = {
        event: "message_start",
        messageId: "msg-123",
      } as any;

      expect(() => eventValidators.messageStart(invalidEvent)).toThrow(
        "Invalid message start event"
      );
    });

    it("should throw error for both missing messageId and role", () => {
      const invalidEvent = {
        event: "message_start",
      } as any;

      expect(() => eventValidators.messageStart(invalidEvent)).toThrow(
        "Invalid message start event"
      );
    });
  });

  describe("textChunk", () => {
    it("should validate a valid text chunk event", () => {
      const validEvent: TextChunkEvent = {
        event: "text_chunk",
        messageId: "msg-123",
        chunk: "Hello",
        index: 0,
      };

      const result = eventValidators.textChunk(validEvent);
      expect(result).toEqual(validEvent);
    });

    it("should throw error for missing messageId", () => {
      const invalidEvent = {
        event: "text_chunk",
        chunk: "Hello",
        index: 0,
      } as any;

      expect(() => eventValidators.textChunk(invalidEvent)).toThrow(
        "Invalid text chunk event"
      );
    });

    it("should throw error for missing chunk", () => {
      const invalidEvent = {
        event: "text_chunk",
        messageId: "msg-123",
        index: 0,
      } as any;

      expect(() => eventValidators.textChunk(invalidEvent)).toThrow(
        "Invalid text chunk event"
      );
    });

    it("should throw error for missing index", () => {
      const invalidEvent = {
        event: "text_chunk",
        messageId: "msg-123",
        chunk: "Hello",
      } as any;

      expect(() => eventValidators.textChunk(invalidEvent)).toThrow(
        "Invalid text chunk event"
      );
    });
  });

  describe("messageEnd", () => {
    it("should validate a valid message end event", () => {
      const validEvent: MessageEndEvent = {
        event: "message_end",
        messageId: "msg-123",
      };

      const result = eventValidators.messageEnd(validEvent);
      expect(result).toEqual(validEvent);
    });

    it("should throw error for missing messageId", () => {
      const invalidEvent = {
        event: "message_end",
      } as any;

      expect(() => eventValidators.messageEnd(invalidEvent)).toThrow(
        "Invalid message end event"
      );
    });
  });

  describe("componentStart", () => {
    it("should validate a valid component start event with contact_badge", () => {
      const validEvent: ComponentStartEvent = {
        event: "component_start",
        messageId: "msg-123",
        componentType: "contact_badge",
      };

      const result = eventValidators.componentStart(validEvent);
      expect(result).toEqual(validEvent);
    });

    it("should validate a valid component start event with calendar_event", () => {
      const validEvent: ComponentStartEvent = {
        event: "component_start",
        messageId: "msg-123",
        componentType: "calendar_event",
      };

      const result = eventValidators.componentStart(validEvent);
      expect(result).toEqual(validEvent);
    });

    it("should throw error for missing messageId", () => {
      const invalidEvent = {
        event: "component_start",
        componentType: "contact_badge",
      } as any;

      expect(() => eventValidators.componentStart(invalidEvent)).toThrow(
        "Invalid component start event."
      );
    });

    it("should throw error for missing componentType", () => {
      const invalidEvent = {
        event: "component_start",
        messageId: "msg-123",
      } as any;

      expect(() => eventValidators.componentStart(invalidEvent)).toThrow(
        "Invalid component start event."
      );
    });

    it("should throw error for invalid componentType", () => {
      const invalidEvent = {
        event: "component_start",
        messageId: "msg-123",
        componentType: "invalid_type",
      } as any;

      expect(() => eventValidators.componentStart(invalidEvent)).toThrow(
        "Invalid component start event."
      );
    });
  });

  describe("componentField", () => {
    it("should validate a valid component field event", () => {
      const validEvent: ComponentFieldEvent = {
        event: "component_field",
        messageId: "msg-123",
        field: "name",
        value: "John Doe",
      };

      const result = eventValidators.componentField(validEvent);
      expect(result).toEqual(validEvent);
    });

    it("should validate all valid component fields", () => {
      const validFields = [
        "name",
        "email",
        "company",
        "profilePicture",
        "title",
        "date",
        "time",
        "status",
      ];

      validFields.forEach((field) => {
        const validEvent: ComponentFieldEvent = {
          event: "component_field",
          messageId: "msg-123",
          field,
          value: "test value",
        };

        expect(() => eventValidators.componentField(validEvent)).not.toThrow();
      });
    });

    it("should throw error for missing messageId", () => {
      const invalidEvent = {
        event: "component_field",
        field: "name",
        value: "John Doe",
      } as any;

      expect(() => eventValidators.componentField(invalidEvent)).toThrow(
        "Invalid component field event"
      );
    });

    it("should throw error for missing field", () => {
      const invalidEvent = {
        event: "component_field",
        messageId: "msg-123",
        value: "John Doe",
      } as any;

      expect(() => eventValidators.componentField(invalidEvent)).toThrow(
        "Invalid component field event"
      );
    });

    it("should throw error for missing value", () => {
      const invalidEvent = {
        event: "component_field",
        messageId: "msg-123",
        field: "name",
      } as any;

      expect(() => eventValidators.componentField(invalidEvent)).toThrow(
        "Invalid component field event"
      );
    });

    it("should throw error for invalid field", () => {
      const invalidEvent = {
        event: "component_field",
        messageId: "msg-123",
        field: "invalid_field",
        value: "test value",
      } as any;

      expect(() => eventValidators.componentField(invalidEvent)).toThrow(
        "Invalid component field event"
      );
    });
  });

  describe("componentEnd", () => {
    it("should validate a valid component end event", () => {
      const validEvent: ComponentEndEvent = {
        event: "component_end",
        messageId: "msg-123",
      };

      const result = eventValidators.componentEnd(validEvent);
      expect(result).toEqual(validEvent);
    });

    it("should throw error for missing messageId", () => {
      const invalidEvent = {
        event: "component_end",
      } as any;

      expect(() => eventValidators.componentEnd(invalidEvent)).toThrow(
        "Invalid component end event"
      );
    });
  });
});
