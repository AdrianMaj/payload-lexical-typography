import { createCommand } from "@payloadcms/richtext-lexical/lexical";

export const TEXT_CLASS_COMMAND = createCommand<{ className: string }>("TEXT_CLASS_COMMAND");
