import { type HTMLConverters } from "@payloadcms/richtext-lexical/html";
import { type HTMLConvertersAsync } from "@payloadcms/richtext-lexical/html-async";

import { TextHTMLConverter, TextHTMLConverterAsync } from "./TextHTMLConverter";

export const TypographyHTMLConverters: HTMLConverters = { ...TextHTMLConverter };
export const TypographyHTMLConvertersAsync: HTMLConvertersAsync = { ...TextHTMLConverterAsync };
