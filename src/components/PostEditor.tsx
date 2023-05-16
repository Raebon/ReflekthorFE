"use client";
import { ChangeEvent, FC, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Editor from "@/components/text-editor/TextEditor";
interface PostEditorProps {
  getEditorObjectValue: (editorState: any, editor: string) => void;
}

/* const value =
  '{"root":{"children":[{"children": [{"detail": 0,"format": 0,"mode": "normal","style": "","text": "aasd","type": "text","version":1}],"direction": "ltr","format": "","indent": 0,"type": "paragraph","version": 1}],"direction": "ltr","format": "","indent": 0,"type": "root","version": 1}}'; */

const PostEditor: FC<PostEditorProps> = ({ getEditorObjectValue }) => {
  const [html, setHtml] = useState<string>("");
  const [editorState, setEditorState] = useState();

  const createMarkup = () => {
    return { __html: html };
  };

  const handleGetObjectValueFromEditor = (editorState: any, editor: string) => {
    setHtml(editor);
    setEditorState(editorState);
    if (getEditorObjectValue) {
      getEditorObjectValue(editorState, editor);
    }
  };

  return (
    <>
      <Tabs defaultValue="editor" className="w-full">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="result">Result</TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="p-0">
          <Editor
            getObjectValueFromEditor={handleGetObjectValueFromEditor}
            editorState={editorState}
          />
        </TabsContent>
        <TabsContent value="result">
          <div
            dangerouslySetInnerHTML={createMarkup()}
            className="text-md [&>h3]:text-lg [&>h2]:text-xl [&>h1]:text-2xl"
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PostEditor;
