"use client";

import { type ToolbarGroup, type ToolbarGroupItem } from "@payloadcms/richtext-lexical";
import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { COMMAND_PRIORITY_CRITICAL, type BaseSelection } from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@payloadcms/richtext-lexical/lexical/selection";

import { useEffect } from "react";

import { TEXT_CLASS_COMMAND } from "./command";
import { Dropdown } from "./components/TextClassDropdown";
import { TextClassIcon } from "./components/TextClassIcon";

import { getSelection } from "../../utils/getSelection";

export type TextClassFeatureProps = {
  hideAttribution?: boolean;
  classes: { value: string; label: string }[];
  scroll?: boolean;
};

export type TextClassItem = ToolbarGroupItem & {
  command: Record<string, unknown>;
  current: () => string | null;
} & TextClassFeatureProps;

export const TextClassClientFeature = createClientFeature<TextClassFeatureProps, TextClassItem>(({ props }) => {
  const DropdownComponent: ToolbarGroup = {
    type: "dropdown",
    ChildComponent: TextClassIcon,
    isEnabled({ selection }: { selection: BaseSelection }) {
      return !!getSelection(selection);
    },
    items: [
      {
        Component: () => {
          const [editor] = useLexicalComposerContext();
          return Dropdown({
            editor,
            item: {
              command: TEXT_CLASS_COMMAND,
              current() {
                const selection = getSelection();
                return selection ? $getSelectionStyleValueForProperty(selection, "className", "") : null;
              },
              hideAttribution: props?.hideAttribution,
              classes: props?.classes,
              scroll: props?.scroll,
              key: "textClass",
            },
          });
        },
        key: "textClass",
      },
    ],
    key: "textClassDropdown",
    order: 60,
  };

  return {
    plugins: [
      {
        Component: () => {
          const [editor] = useLexicalComposerContext();

          useEffect(() => {
            return editor.registerCommand(
              TEXT_CLASS_COMMAND,
              (payload) => {
                editor.update(() => {
                  const selection = getSelection();
                  if (selection) {
                    $patchStyleText(selection, { "className": payload.className || "" });
                  }
                });
                return true;
              },
              COMMAND_PRIORITY_CRITICAL,
            );
          }, [editor]);

          return null;
        },
        position: "normal",
      },
    ],
    toolbarFixed: {
      groups: [DropdownComponent],
    },
    toolbarInline: {
      groups: [DropdownComponent],
    },
  };
});
