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

import { TEXT_LINE_HEIGHT_COMMAND } from "./command";
import { Dropdown } from "./components/TextLineHeightDropdown";
import { TextLineHeightIcon } from "./components/TextLineHeightIcon";

import { getSelection } from "../../utils/getSelection";

export type TextLineHeightFeatureProps = {
  hideAttribution?: boolean;
  lineHeights?: { value: string; label: string }[];
  method?: "replace" | "combine";
  customLineHeight?: boolean;
  scroll?: boolean;
};

export type TextLineHeightItem = ToolbarGroupItem & {
  command: Record<string, unknown>;
  current: () => string | null;
} & TextLineHeightFeatureProps;

export const TextLineHeightClientFeature = createClientFeature<TextLineHeightFeatureProps, TextLineHeightItem>(({ props }) => {
  const DropdownComponent: ToolbarGroup = {
    type: "dropdown",
    ChildComponent: TextLineHeightIcon,
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
              command: TEXT_LINE_HEIGHT_COMMAND,
              current() {
                const selection = getSelection();
                return selection ? $getSelectionStyleValueForProperty(selection, "line-height", "") : null;
              },
              hideAttribution: props?.hideAttribution,
              lineHeights: props?.lineHeights,
              method: props?.method,
              scroll: props?.scroll,
              customLineHeight: props?.customLineHeight,
              key: "textLineHeight",
            },
          });
        },
        key: "textLineHeight",
      },
    ],
    key: "textLineHeightDropdown",
    order: 70,
  };

  return {
    plugins: [
      {
        Component: () => {
          const [editor] = useLexicalComposerContext();

          useEffect(() => {
            return editor.registerCommand(
              TEXT_LINE_HEIGHT_COMMAND,
              (payload) => {
                editor.update(() => {
                  const selection = getSelection();
                  if (selection) {
                    $patchStyleText(selection, { "line-height": payload.lineHeight || "" });
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