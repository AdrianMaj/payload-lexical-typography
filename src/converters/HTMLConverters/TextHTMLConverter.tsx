import { type HTMLConverter } from "@payloadcms/richtext-lexical";
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

import escapeHTML from "escape-html";

export const TextHTMLConverter: HTMLConverter<SerializedTextNode> = {
  converter({ node }) {
    let styles = "";

    if (node.style) {
      let match = /(?:^|;)\s?color: ([^;]+)/.exec(node.style);
      if (match) {
        styles = `${styles} color: ${match[1]};`;
      }

      match = /(?:^|;)\s?font-size: ([^;]+)/.exec(node.style);
      if (match) {
        styles = `${styles} font-size: ${match[1]};`;
      }

      match = /(?:^|;)\s?letter-spacing: ([^;]+)/.exec(node.style);
      if (match) {
        styles = `${styles} letter-spacing: ${match[1]};`;
      }

      match = /(?:^|;)\s?line-height: ([^;]+)/.exec(node.style);
      if (match) {
        styles = `${styles} line-height: ${match[1]};`;
      }
    }

    const styleAttr = styles ? ` style="${styles}"` : "";

    let html = escapeHTML(node.text);
    if (!html) {
      return "";
    }

    const formatters: Record<number, (content: string, styleAttribute: string) => string> = {
      [IS_BOLD]: (content) => `<strong>${content}</strong>`,
      [IS_ITALIC]: (content) => `<em>${content}</em>`,
      [IS_STRIKETHROUGH]: (content) => {
        return `<span style="text-decoration: line-through">${content}</span>`;
      },
      [IS_UNDERLINE]: (content) => {
        return `<span style="text-decoration: underline">${content}</span>`;
      },
      [IS_CODE]: (content) => `<code>${content}</code>`,
      [IS_SUBSCRIPT]: (content) => `<sub>${content}</sub>`,
      [IS_SUPERSCRIPT]: (content) => `<sup>${content}</sup>`,
    };

    html = styles ? `<span${styleAttr}>${html}</span>` : html;

    Object.entries(formatters).forEach(([formatFlag, formatter]) => {
      if (node.format & Number(formatFlag)) {
        html = formatter(html, styleAttr);
      }
    });

    return html;
  },
  nodeTypes: ["text"],
};
