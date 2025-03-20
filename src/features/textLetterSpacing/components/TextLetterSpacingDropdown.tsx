import { type LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { useEffect, useState } from "react";

import { SpacingPicker } from "./TextLetterSpacingPicker";

import { type TextLetterSpacingItem } from "../feature.client";

export const Dropdown = ({ editor, item }: { editor: LexicalEditor; item: TextLetterSpacingItem }) => {
  const [activeSpacing, setActiveSpacing] = useState<string>("");

  const onChange = (spacing: string) => {
    editor.dispatchCommand(item.command, { spacing });
    setActiveSpacing(spacing || "");
  };

  useEffect(() => {
    editor.read(() => {
      const current = item.current ? item.current() : null;
      if (current) setActiveSpacing(current);
    });
  }, [editor, item]);

  return (
    <SpacingPicker
      spacing={activeSpacing}
      onChange={onChange}
      hideAttribution={item.hideAttribution}
      method={item.method}
      scroll={item.scroll}
      spacings={item.spacings}
      customSpacing={item.customSpacing}
    />
  );
};