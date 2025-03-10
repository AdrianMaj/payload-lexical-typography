import { COMMAND_PRIORITY_CRITICAL } from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { $patchStyleText } from "@payloadcms/richtext-lexical/lexical/selection";

import { useEffect } from "react";

import { getSelection } from "../../../utils/getSelection";
import { TEXT_LETTER_SPACING_COMMAND } from "../command";

export const TextLetterSpacingIcon = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      TEXT_LETTER_SPACING_COMMAND,
      (payload) => {
        editor.update(() => {
          const selection = getSelection();
          if (selection) $patchStyleText(selection, { "letter-spacing": payload.spacing || "" });
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
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="M4 7v11" />
      <path d="M20 7v11" />
      <path d="M12 20v2" />
      <path d="M12 14v2" />
      <path d="M12 8v2" />
      <path d="M12 2v2" />
    </svg>
  );
};