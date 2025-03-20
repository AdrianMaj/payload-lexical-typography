import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_UNDERLINE,
  IS_CODE,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  type SerializedTextNode,
} from "@payloadcms/richtext-lexical/lexical";
import { type JSXConverters } from "@payloadcms/richtext-lexical/react";

export const TextJSXConverter: JSXConverters<SerializedTextNode> = {
  text: ({ node }: { node: SerializedTextNode }) => {
    const styles: React.CSSProperties = {};

    if (node.style) {
      let match = /(?:^|;)\s?color: ([^;]+)/.exec(node.style);
      if (match) styles.color = match[1];

      match = /(?:^|;)\s?font-size: ([^;]+)/.exec(node.style);
      if (match) styles.fontSize = match[1];

      match = /(?:^|;)\s?letter-spacing: ([^;]+)/.exec(node.style);
      if (match) styles.letterSpacing = match[1];
      
      match = /(?:^|;)\s?line-height: ([^;]+)/.exec(node.style);
      if (match) styles.lineHeight = match[1];
    }

    const formatters: Record<number, (element: React.ReactElement) => React.ReactElement> = {
      [IS_BOLD]: (el) => <strong>{el}</strong>,
      [IS_ITALIC]: (el) => <em>{el}</em>,
      [IS_STRIKETHROUGH]: (el) => <span style={{ textDecoration: "line-through" }}>{el}</span>,
      [IS_UNDERLINE]: (el) => <span style={{ textDecoration: "underline" }}>{el}</span>,
      [IS_CODE]: (el) => <code>{el}</code>,
      [IS_SUBSCRIPT]: (el) => <sub>{el}</sub>,
      [IS_SUPERSCRIPT]: (el) => <sup>{el}</sup>,
    };

    let textElement = <span style={styles}>{node.text}</span>;

    Object.entries(formatters).forEach(([formatFlag, formatter]) => {
      if (node.format & Number(formatFlag)) {
        textElement = formatter(textElement);
      }
    });

    return textElement;
  },
};
