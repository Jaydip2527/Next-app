// EmojiIconPicker.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

interface EmojiIconPickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const EmojiIconPicker: React.FC<EmojiIconPickerProps> = ({
  value,
  onChange,
  error,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = useCallback(
    (emoji: any) => {
      onChange(emoji.emoji);
      setShowEmojiPicker(false);
    },
    [onChange]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef?.current &&
        !pickerRef?.current?.contains(event?.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="emoji-picker-container"
      style={{ position: "relative" }}
      ref={pickerRef}
    >
      <TextBoxComponent
        placeholder="Select Emoji *"
        cssClass="e-outline"
        floatLabelType="Auto"
        value={value}
        readOnly
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      />
      {showEmojiPicker && (
        <div
          style={{ position: "absolute", zIndex: 999, top: "40px", left: 0 }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            searchDisabled={true}
            emojiStyle={EmojiStyle.NATIVE}
          />
        </div>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default React.memo(EmojiIconPicker);
