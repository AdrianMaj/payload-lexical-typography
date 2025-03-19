import { COMMAND_PRIORITY_CRITICAL } from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { $patchStyleText } from "@payloadcms/richtext-lexical/lexical/selection";

import { useEffect } from "react";

import { getSelection } from "../../../utils/getSelection";
import { TEXT_CLASS_COMMAND } from "../command";

export const TextClassIcon = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      TEXT_CLASS_COMMAND,
      (payload) => {
        editor.update(() => {
          const selection = getSelection();
          if (selection) $patchStyleText(selection, { className: payload.className || "" });
        });
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 14h-5" />
      <path d="M16 16v-3.5a2.5 2.5 0 0 1 5 0V16" />
      <path d="M4.5 13h6" />
      <path d="m3 16 4.5-9 4.5 9" />
    </svg>
  );
};
