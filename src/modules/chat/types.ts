export interface BaseEvent {
  event: string;
  messageId: string;
}

export interface MessageStartEvent extends BaseEvent {
  event: "message_start";
  role: "user" | "agent";
}

export interface TextChunkEvent extends BaseEvent {
  event: "text_chunk";
  chunk: string;
  index: number;
}

export interface MessageEndEvent extends BaseEvent {
  event: "message_end";
}

export const COMPONENT_TYPE = ["contact_badge", "calendar_event"] as const;

export type ComponentType = (typeof COMPONENT_TYPE)[number];

export interface ComponentStartEvent extends BaseEvent {
  event: "component_start";
  componentType: ComponentType;
}

export interface ComponentFieldEvent extends BaseEvent {
  event: "component_field";
  field: string;
  value: string;
}

export interface ComponentEndEvent extends BaseEvent {
  event: "component_end";
}

export type ChatStreamSSEEvent =
  | MessageStartEvent
  | TextChunkEvent
  | MessageEndEvent
  | ComponentStartEvent
  | ComponentFieldEvent
  | ComponentEndEvent;

interface BaseMessageProps {
  isCompleted: boolean;
}

export interface ContactBadgeFields {
  name: string;
  email: string;
  company: string;
  profilePicture: string;
}

export interface ContactBadgeComponent
  extends BaseMessageProps,
    ContactBadgeFields {
  type: "contact_badge";
}

export interface CalendarEventFields {
  title: string;
  date: string;
  time: string;
  status: string;
}

export interface CalendarEventComponent
  extends BaseMessageProps,
    CalendarEventFields {
  type: "calendar_event";
}

export type ChatComponent = ContactBadgeComponent | CalendarEventComponent;

export type ChatMessageStatus = "started" | "streaming" | "completed";

export interface ChatMessage extends BaseMessageProps {
  id: string;
  role: "user" | "agent";
  content: string;
  component?: ChatComponent;
  lastChunkIndex: number;
}

export const VALID_COMPONENT_FIELDS: (
  | keyof CalendarEventFields
  | keyof ContactBadgeFields
)[] = [
  "title",
  "date",
  "time",
  "status",
  "name",
  "email",
  "company",
  "profilePicture",
];

export const isValidComponentType = (type: string): type is ComponentType => {
  return COMPONENT_TYPE.includes(type as ComponentType);
};
