import { EditorOptions } from "@tiptap/core";
import React, { createContext, ReactNode, useContext } from "react";

import { useEditor, Editor, EditorContent } from "@tiptap/react";
import { EditorContextMenuWrapper } from "@/components/editor/context-menu";
import { TableOfContentData } from "@tiptap-pro/extension-table-of-contents";
import { Loader2 } from "lucide-react";

export type EditorContextValue = {
  editor: Editor | null;
  tocItems: TableOfContentData;
};

export const EditorContext = createContext<EditorContextValue>({
  editor: null,
  tocItems: [],
});

export const EditorConsumer = EditorContext.Consumer;

export const useCurrentEditor = () => useContext(EditorContext);

export type EditorProviderProps = {
  children: ReactNode;
  slotBefore?: ReactNode;
  slotAfter?: ReactNode;
} & Partial<EditorOptions>;

export const EditorProvider = ({
  children,
  slotAfter,
  slotBefore,
  ...editorOptions
}: EditorProviderProps) => {
  const editor = useEditor(editorOptions);

  if (!editor) {
    return (
      <div className="focus:outline-none border-none prose mt-8 prose-gray prose-strong:font-bold prose-h1:font-bold text-base">
        <Loader2 className="animate-spin text-gray-11" />
      </div>
    );
  }

  return (
    <EditorContext.Provider value={{ editor, tocItems: [] }}>
      {slotBefore}
      <EditorConsumer>
        {({ editor: currentEditor }) => (
          <EditorContextMenuWrapper>
            <EditorContent editor={currentEditor} />
          </EditorContextMenuWrapper>
        )}
      </EditorConsumer>
      {children}
      {slotAfter}
    </EditorContext.Provider>
  );
};
