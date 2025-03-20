import { createCommand } from "@payloadcms/richtext-lexical/lexical";

export const TEXT_LETTER_SPACING_COMMAND = createCommand<{ spacing: string }>("TEXT_LETTER_SPACING_COMMAND");