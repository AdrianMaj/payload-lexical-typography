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

import { TEXT_LETTER_SPACING_COMMAND } from "./command";
import { Dropdown } from "./components/TextLetterSpacingDropdown";
import { TextLetterSpacingIcon } from "./components/TextLetterSpacingIcon";

import { getSelection } from "../../utils/getSelection";

export type TextLetterSpacingFeatureProps = {
  hideAttribution?: boolean;
  spacings?: { value: string; label: string }[];
  method?: "replace" | "combine";
  customSpacing?: boolean;
  scroll?: boolean;
};

export type TextLetterSpacingItem = ToolbarGroupItem & {
  command: Record<string, unknown>;
  current: () => string | null;
} & TextLetterSpacingFeatureProps;

export const TextLetterSpacingClientFeature = createClientFeature<TextLetterSpacingFeatureProps, TextLetterSpacingItem>(({ props }) => {
  const DropdownComponent: ToolbarGroup = {
    type: "dropdown",
    ChildComponent: TextLetterSpacingIcon,
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
              command: TEXT_LETTER_SPACING_COMMAND,
              current() {
                const selection = getSelection();
                return selection ? $getSelectionStyleValueForProperty(selection, "letter-spacing", "") : null;
              },
              hideAttribution: props?.hideAttribution,
              spacings: props?.spacings,
              method: props?.method,
              scroll: props?.scroll,
              customSpacing: props?.customSpacing,
              key: "textLetterSpacing",
            },
          });
        },
        key: "textLetterSpacing",
      },
    ],
    key: "textLetterSpacingDropdown",
    order: 62,
  };

  return {
    plugins: [
      {
        Component: () => {
          const [editor] = useLexicalComposerContext();

          useEffect(() => {
            return editor.registerCommand(
              TEXT_LETTER_SPACING_COMMAND,
              (payload) => {
                editor.update(() => {
                  const selection = getSelection();
                  if (selection) {
                    $patchStyleText(selection, { "letter-spacing": payload.spacing || "" });
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