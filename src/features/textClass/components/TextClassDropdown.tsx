import { type LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { useEffect, useState } from "react";

import { ClassPicker } from "./TextClassPicker";

import { type TextClassItem } from "../feature.client";

export const Dropdown = ({ editor, item }: { editor: LexicalEditor; item: TextClassItem }) => {
  const [activeClass, setActiveClass] = useState<string>("");

  const onChange = (className: string) => {
    editor.dispatchCommand(item.command, { className });
    setActiveClass(className || "");
  };

  useEffect(() => {
    editor.read(() => {
      const current = item.current ? item.current() : null;
      if (current) setActiveClass(current);
    });
  }, [editor, item]);

  return (
    <ClassPicker
      className={activeClass}
      onChange={onChange}
      hideAttribution={item.hideAttribution}
      scroll={item.scroll}
      classes={item.classes}
    />
  );
};
