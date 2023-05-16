import ThemeConfig from "./themes/theme-config";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function Placeholder() {
  return (
    <div className="overflow-hidden absolute text-ellipsis top-[15px] left-[10px] text-sm select-none inline-block pointer-events-none">
      Start typing...
    </div>
  );
}

const editorConfig = {
  // The editor theme
  theme: ThemeConfig,
  // Handling of errors during update¨
  editorState: null,
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export default function Editor({ getObjectValueFromEditor, editorState }) {
  editorConfig.editorState = editorState;
  function onChange(editorState, editor) {
    editor.update(() => {
      const html = $generateHtmlFromNodes(editor);
      getObjectValueFromEditor(editorState, html);
    });
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="mt-2 rounded border rounded-t-[11px] max-h-[600px] overflow-y-auto">
        <ToolbarPlugin />
        <div id="editor-rich-content" className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[150px] resize-none text-sm py-[15px] px-[10px] rounded-b relative focus:outline-none focus:ring-2 focus:ring-slate-400 focus:-ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900" />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {<HistoryPlugin />}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
