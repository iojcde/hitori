"use client";

import { saveNote } from "@/actions/save-note";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Typography from "@tiptap/extension-typography";

import StarterKit from "@tiptap/starter-kit";
import { debounce } from "lodash";
import { Markdown } from "tiptap-markdown";
import { Command, handleCommandNavigation } from "./extensions/command";
import { slashCommand, suggestionItems } from "./slash-command";

import { Provider } from "jotai";

import {
  EditorCommand,
  EditorCommandList,
  EditorCommandTunnelContext,
} from "./extensions/editor-command";
import EditorCommandItem, {
  EditorCommandEmpty,
} from "./extensions/editor-command-item";
import { useRef } from "react";
import tunnel from "tunnel-rat";
import { editorStore } from "./extensions/utils/store";
import { EditorProvider } from "./editor-context";
import { Editor } from "@tiptap/react";

const CustomDocument = Document.extend({
  content: "heading block*",
});

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </button>
      <button onClick={() => editor.chain().focus().toggleList().run()}>
        List
      </button>
    </div>
  );
};

const save = debounce(async ({ id, title, content }) => {
  console.log("Saving", id, title, content);
  await saveNote({ id, title, content });
}, 2000);

const Tiptap = ({ note }) => {
  const extensions = [
    Markdown,
    CustomDocument,
    Typography,
    StarterKit.configure({
      document: false,
    }),
    Table.configure({
      resizable: true,
      lastColumnResizable: false,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "heading") {
          return "Untitled Document";
        }

        return 'Press "/" for commands';
      },
    }),
    slashCommand,
  ];

  const tunnelInstance = useRef(tunnel()).current;

  return (
    <div className="p-8">
      <EditorCommandTunnelContext.Provider value={tunnelInstance}>
        <Provider store={editorStore}>
          <EditorProvider
            extensions={extensions}
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              attributes: {
                class:
                  "focus:outline-none border-none mt-8 prose prose-gray prose-strong:font-bold prose-h1:font-bold text-base",
              },
            }}
            content={note.content}
            onUpdate={({ editor }) => {
              console.log(editor.getHTML());
              save({
                id: note.id,
                title: "Untitled",
                content: editor.getHTML(),
              });
            }}
          >
            <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems.map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => {
                      item.command(val);
                    }}
                    className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>
          </EditorProvider>
        </Provider>
      </EditorCommandTunnelContext.Provider>
    </div>
  );
};

export default Tiptap;
