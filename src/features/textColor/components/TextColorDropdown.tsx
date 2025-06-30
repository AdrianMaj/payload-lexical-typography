import { type LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { useEffect, useState } from "react";

import { TextColorPicker } from "./TextColorPicker";

import { type TextColorItem } from "../feature.client";

export const TextColorDropdown = ({ editor, item }: { editor: LexicalEditor; item: TextColorItem }) => {
  const [activeColor, setActiveColor] = useState<string>("");

  const onChange = (color: string) => {
    setActiveColor(color || "");
  };

  const applyColor = (color?: string) => {
    editor.dispatchCommand(item.command, { color: color ?? activeColor });
  };

  const handleReset = () => {
    editor.dispatchCommand(item.command, { color: "" });
    setActiveColor("");
  };

  useEffect(() => {
    editor.read(() => {
      const current = item.current ? item.current() : null;
      if (current) setActiveColor(current);
    });
  }, [editor, item]);

  return (
    <TextColorPicker
      color={activeColor}
      applyColor={applyColor}
      onChange={onChange}
      colors={item.colors}
      hideAttribution={item.hideAttribution}
      colorPicker={item.colorPicker}
      listView={item.listView}
      handleReset={handleReset}
    />
  );
};
