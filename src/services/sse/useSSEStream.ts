import { useEffect, useRef, useState, useCallback } from "react";
import EventSource, {
  EventSourceOptions,
  MessageEvent,
  ErrorEvent,
  TimeoutEvent,
  ExceptionEvent,
} from "react-native-sse";

type SSEErrorEvent = ErrorEvent | TimeoutEvent | ExceptionEvent;

interface UseSSEStreamProps {
  url: string;
  options?: EventSourceOptions;
  eventHandlers?: {
    onOpen?: () => void;
    onMessage?: (event: MessageEvent) => void;
    onError?: (event: SSEErrorEvent) => void;
    onClose?: () => void;
    [eventName: string]: ((event: any) => void) | undefined;
  };
}

export const useSSEStream = ({
  url,
  options,
  eventHandlers = {},
}: UseSSEStreamProps) => {
  const eventSourceRef = useRef<EventSource<string> | null>(null);
  const urlRef = useRef<string>(url);
  const eventHandlersRef = useRef(eventHandlers);
  const [isConnected, setIsConnected] = useState(false);
  const lastEventTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.removeAllEventListeners();
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }

    // Clear timeout when stopping
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const updateLastEventTime = useCallback(() => {
    lastEventTimeRef.current = Date.now();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const timeSinceLastEvent = Date.now() - lastEventTimeRef.current;
      if (timeSinceLastEvent >= 5000) {
        console.log(
          "SSE timeout: No events received for 5 seconds, closing connection"
        );
        stop();
      }
    }, 5000);
  }, [stop]);

  useEffect(() => {
    eventHandlersRef.current = eventHandlers;
  }, [eventHandlers]);

  const start = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.removeAllEventListeners();
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setIsConnected(false);

    if (urlRef.current !== url) {
      urlRef.current = url;
    }

    eventSourceRef.current = new EventSource(url, options);

    const builtInHandlers = {
      open: () => {
        console.log("SSE connection opened");
        setIsConnected(true);
        updateLastEventTime();
        eventHandlersRef.current.onOpen?.();
      },
      message: (event: MessageEvent) => {
        console.log("SSE message received", event);
        updateLastEventTime();
        eventHandlersRef.current.onMessage?.(event);
      },
      error: (event: SSEErrorEvent) => {
        console.log("SSE error", event);
        setIsConnected(false);
        eventHandlersRef.current.onError?.(event);
      },
      close: () => {
        console.log("SSE connection closed");
        setIsConnected(false);
        eventHandlersRef.current.onClose?.();
      },
    };

    Object.entries(builtInHandlers).forEach(([eventName, handler]) => {
      eventSourceRef.current?.addEventListener(eventName, handler as any);
    });

    Object.entries(eventHandlersRef.current).forEach(([eventName, handler]) => {
      if (["onOpen", "onMessage", "onError", "onClose"].includes(eventName))
        return;

      if (handler) {
        const wrappedHandler = (event: any) => {
          updateLastEventTime();
          handler(event);
        };
        eventSourceRef.current?.addEventListener(
          eventName,
          wrappedHandler as any
        );
      }
    });
  }, [url, options, updateLastEventTime]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stop();
    };
  }, [stop]);

  return {
    start,
    stop,
    isConnected,
  };
};
