import { EditorOptions } from "@tiptap/core";
import React, { createContext, ReactNode, useContext } from "react";
 
import { useEditor, Editor, EditorContent } from "@tiptap/react";
import { EditorContextMenuWrapper } from "@/components/editor/context-menu";

export type EditorContextValue = {
  editor: Editor | null;
};

export const EditorContext = createContext<EditorContextValue>({
  editor: null,
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
    return null;
  }

  return (
    <EditorContext.Provider value={{ editor }}>
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
