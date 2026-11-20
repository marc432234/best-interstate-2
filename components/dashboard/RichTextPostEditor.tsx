"use client";

import { useMemo, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TableKit } from "@tiptap/extension-table";
import { marked } from "marked";
import { slugify, type BlogCategory, type BlogPost } from "@/lib/blog-utils";

type EditorAction = (formData: FormData) => void | Promise<void>;

function toDateTimeLocal(value: string | null | undefined) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function getInitialHtml(post?: BlogPost | null) {
  if (post?.content_html?.trim()) {
    return post.content_html;
  }
  if (post?.content_markdown?.trim()) {
    return String(
      marked.parse(post.content_markdown, {
        async: false,
        gfm: true,
        breaks: true,
      }),
    );
  }
  return "";
}

function ToolbarButton({
  active = false,
  disabled = false,
  label,
  onClick,
  title,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      className={`admin-rich-button${active ? " admin-rich-button-active" : ""}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function ToolbarSeparator() {
  return <span className="admin-rich-separator" aria-hidden="true" />;
}

function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return <div className="admin-rich-toolbar" />;
  }

  function setLink() {
    const previous = editor?.getAttributes("link").href || "";
    const url = window.prompt("Link URL", previous);
    if (!editor || url === null) {
      return;
    }
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  function setImage() {
    if (!editor) {
      return;
    }
    const src = window.prompt("Image URL");
    if (src?.trim()) {
      editor.chain().focus().setImage({ src: src.trim(), alt: "" }).run();
    }
  }

  return (
    <div className="admin-rich-toolbar">
      <ToolbarButton label="B" title="Bold" disabled={!editor.can().chain().focus().toggleBold().run()} active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
      <ToolbarButton label="I" title="Italic" disabled={!editor.can().chain().focus().toggleItalic().run()} active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
      <ToolbarButton label="U" title="Underline" disabled={!editor.can().chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} />
      <ToolbarButton label="S" title="Strikethrough" disabled={!editor.can().chain().focus().toggleStrike().run()} active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} />
      <ToolbarSeparator />
      <ToolbarButton label="H1" title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
      <ToolbarButton label="H2" title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
      <ToolbarButton label="H3" title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
      <ToolbarButton label="H4" title="Heading 4" active={editor.isActive("heading", { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} />
      <ToolbarSeparator />
      <ToolbarButton label="¶" title="Paragraph" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()} />
      <ToolbarButton label="“ ”" title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
      <ToolbarButton label="&lt;/&gt;" title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} />
      <ToolbarButton label="Code" title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
      <ToolbarButton label="—" title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()} />
      <ToolbarSeparator />
      <ToolbarButton label="• List" title="Bulleted list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} />
      <ToolbarButton label="1. List" title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
      <ToolbarButton label="Table" title="Insert table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
      <ToolbarSeparator />
      <ToolbarButton label="Link" title="Insert link" active={editor.isActive("link")} onClick={setLink} />
      <ToolbarButton label="Image" title="Insert image" onClick={setImage} />
      <ToolbarSeparator />
      <ToolbarButton label="←" title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} />
      <ToolbarButton label="↔" title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} />
      <ToolbarButton label="→" title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} />
      <ToolbarButton label="≡" title="Align justify" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()} />
      <ToolbarSeparator />
      <ToolbarButton label="Undo" title="Undo" disabled={!editor.can().chain().focus().undo().run()} onClick={() => editor.chain().focus().undo().run()} />
      <ToolbarButton label="Redo" title="Redo" disabled={!editor.can().chain().focus().redo().run()} onClick={() => editor.chain().focus().redo().run()} />
    </div>
  );
}

export default function RichTextPostEditor({
  action,
  categories,
  post,
}: {
  action: EditorAction;
  categories: BlogCategory[];
  post?: BlogPost | null;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!post);
  const initialHtml = useMemo(() => getInitialHtml(post), [post]);
  const [contentHtml, setContentHtml] = useState(initialHtml);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: { openOnClick: false },
      }),
      Image.configure({ allowBase64: false }),
      Placeholder.configure({ placeholder: "Write your article..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TableKit.configure({ table: { resizable: true } }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class: "admin-rich-content blog-prose",
      },
    },
    onUpdate: ({ editor: updatedEditor }) => setContentHtml(updatedEditor.getHTML()),
  });

  function handleTitle(value: string) {
    setTitle(value);
    if (autoSlug) {
      setSlug(slugify(value));
    }
  }

  function handleSlug(value: string) {
    setAutoSlug(false);
    setSlug(slugify(value));
  }

  return (
    <form action={action} className="admin-form">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <input type="hidden" name="content_html" value={contentHtml} />
      <input type="hidden" name="content_markdown" value={post?.content_markdown || ""} />

      <div className="admin-form-row">
        <label>
          <span>Title</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => handleTitle(event.target.value)}
            required
          />
        </label>
        <label>
          <span>Slug</span>
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={(event) => handleSlug(event.target.value)}
            required
          />
          <span className="admin-form-note">Auto-generated from the title by default.</span>
        </label>
      </div>

      <label className="admin-checkbox">
        <input
          type="checkbox"
          checked={autoSlug}
          onChange={(event) => {
            setAutoSlug(event.target.checked);
            if (event.target.checked) {
              setSlug(slugify(title));
            }
          }}
        />
        <span>Auto slug from title</span>
      </label>

      <label>
        <span>Excerpt / Meta Description</span>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt || ""}
          placeholder="Used as the post description and default meta description"
        />
      </label>

      <div className="admin-form-row">
        <label>
          <span>Category</span>
          <select name="category_id" defaultValue={post?.category_id || ""}>
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select name="status" defaultValue={post?.status || "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label>
          <span>Date</span>
          <input
            type="datetime-local"
            name="published_at"
            defaultValue={toDateTimeLocal(post?.published_at)}
          />
        </label>
      </div>

      <label>
        <span>Featured Image URL / Meta Image</span>
        <input
          type="url"
          name="featured_image"
          defaultValue={post?.featured_image || ""}
          placeholder="https://..."
        />
        <span className="admin-form-note">
          Used as the meta image when a separate meta image is not provided.
        </span>
      </label>

      <div className="admin-form-row">
        <label>
          <span>Meta Title</span>
          <input
            type="text"
            name="meta_title"
            defaultValue={post?.meta_title || ""}
            placeholder={title || "SEO title"}
          />
        </label>
        <label>
          <span>Meta Image</span>
          <input
            type="url"
            name="meta_image"
            defaultValue={post?.meta_image || ""}
            placeholder="https://..."
          />
        </label>
      </div>

      <label>
        <span>Meta Description</span>
        <textarea name="meta_description" defaultValue={post?.meta_description || ""} />
      </label>

      <label className="admin-checkbox">
        <input type="checkbox" name="no_index" defaultChecked={Boolean(post?.no_index)} />
        <span>No index</span>
      </label>

      <div className="admin-rich-editor">
        <span className="admin-preview-label">Content</span>
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <div className="admin-actions">
        <button type="submit" className="admin-button admin-button-primary">
          {post ? "Save post" : "Create post"}
        </button>
        <a href="/dashboard/blog" className="admin-button admin-button-secondary">
          Back to posts
        </a>
      </div>
    </form>
  );
}
