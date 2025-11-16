import { useEffect, useState } from "react";

export function useTypingAnimation({
  text,
  isCompleted,
}: {
  text: string;
  isCompleted: boolean;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (text.length > displayText.length) {
      const timer = setTimeout(() => {
        const nextChar = text[displayText.length];
        setDisplayText((prev) => prev + nextChar);
        setCurrentIndex((prev) => prev + 1);
      }, 20);

      return () => clearTimeout(timer);
    } else if (text.length < displayText.length) {
      // Text was reset (new message) - reset animation
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [text, displayText]);

  const cursor = !isCompleted && currentIndex < text.length ? "|" : "";

  return {
    displayText: displayText + cursor,
    isAnimating: displayText.length < text.length,
  };
}
