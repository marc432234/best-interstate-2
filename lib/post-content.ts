import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

const allowedTags = [
  "a",
  "blockquote",
  "br",
  "caption",
  "code",
  "col",
  "colgroup",
  "del",
  "details",
  "div",
  "em",
  "figcaption",
  "figure",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "iframe",
  "img",
  "li",
  "mark",
  "ol",
  "p",
  "pre",
  "s",
  "section",
  "small",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
];

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags,
  allowedAttributes: {
    "*": ["style"],
    a: ["href", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
    iframe: ["src", "title", "allow", "allowfullscreen", "width", "height"],
    col: ["span"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesAppliedToAttributes: ["href", "src"],
  allowedStyles: {
    "*": {
      "text-align": [/^(left|center|right|justify)$/],
    },
  },
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "noopener noreferrer",
      target: "_blank",
    }),
    img: (_tagName, attribs) => ({
      tagName: "img",
      attribs: { ...attribs, loading: "lazy", decoding: "async" },
    }),
  },
};

export function sanitizePostHtml(html: string) {
  return sanitizeHtml(html || "", sanitizeOptions);
}

export function markdownToHtml(value: string) {
  if (!value.trim()) {
    return "";
  }
  const parsed = marked.parse(value, {
    async: false,
    gfm: true,
    breaks: true,
  });
  return sanitizePostHtml(String(parsed));
}

export function postContentHtml(post: {
  content_html?: string | null;
  content_markdown?: string | null;
}) {
  if (post.content_html?.trim()) {
    return sanitizePostHtml(post.content_html);
  }
  return markdownToHtml(post.content_markdown || "");
}

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'");
}

export function htmlToExcerpt(html: string, maxLength = 180) {
  const text = decodeEntities(
    sanitizeHtml(html || "", {
      allowedTags: [],
      allowedAttributes: {},
    }),
  )
    .replace(/\s+/g, " ")
    .trim();

  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text;
}

export function postContentExcerpt(
  post: { content_html?: string | null; content_markdown?: string | null },
  maxLength = 180,
) {
  return htmlToExcerpt(postContentHtml(post), maxLength);
}
