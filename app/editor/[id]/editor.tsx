"use client";

import { saveNote } from "@/actions/save-note";
import TableOfContents, {
  TableOfContentData,
  getHierarchicalIndexes,
} from "@tiptap-pro/extension-table-of-contents";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Typography from "@tiptap/extension-typography";

import StarterKit from "@tiptap/starter-kit";
import { debounce, set } from "lodash";
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
import { useCallback, useRef, useState } from "react";
import tunnel from "tunnel-rat";
import { editorStore } from "./extensions/utils/store";
import { EditorProvider } from "./editor-context";
import { Editor } from "@tiptap/react";
import { Statusbar } from "./statusbar";
import { useRouter } from "next-nprogress-bar";
import { toast } from "sonner";
import React from "react";
import { ToC } from "./toc";
import { RightSidebar } from "./sidebar-right";
import { Note } from "@prisma/client";

// const MenuBar = ({ editor }: { editor: Editor | null }) => {
//   if (!editor) {
//     return null;
//   }

//   return (
//     <div>
//       <button onClick={() => editor.chain().focus().toggleBold().run()}>
//         Bold
//       </button>
//       <button onClick={() => editor.chain().focus().toggleItalic().run()}>
//         Italic
//       </button>
//       <button onClick={() => editor.chain().focus().toggleList().run()}>
//         List
//       </button>
//     </div>
//   );
// };

export const CustomTable = Table.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "tableWrapper" },
      ["table", HTMLAttributes, ["tbody", 0]],
    ];
  },
});

const Tiptap = ({ note }: { note: Note }) => {
  const router = useRouter();

  const [saved, setSaved] = useState(true);
  const [tocItems, setTocItems] = useState<TableOfContentData>([]);

  const save = useCallback(
    debounce(async ({ id, title, content }) => {
      console.log("Saving", id, title, content);
      await saveNote({ id, title, content })
        .then(() => {
          setSaved(true);
        })
        .catch(() => {
          setSaved(false);
          toast.error("Failed to save note");
        });
    }, 2000),
    []
  );

  const extensions = [
    Markdown,
    TableOfContents.configure({
      getIndex: getHierarchicalIndexes,
      onUpdate(content) {
        setTocItems(content);
      },
    }),
    Typography,
    StarterKit,
    CustomTable.configure({
      cellMinWidth: 70,
      allowTableNodeSelection: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name == "codeBlock") {
          return 'console.log("Hello, World!");\n';
        }

        return 'Press "/" for commands';
      },
    }),
    slashCommand,
  ];

  const [title, setTitle] = useState(note.title);

  const tunnelInstance = useRef(tunnel()).current;

  return (
    <div className="pt-16 pb-16  ">
      <input
        placeholder="Title"
        className="text-4xl font-bold outline-none bg-inherit"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setSaved(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            (document.querySelector(".ProseMirror") as HTMLElement)?.focus();

            return;
          }
        }}
        onBlur={() => {
          save({
            id: note.id,
            title,
            content: note.content,
          });
        }}
      />
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
                  "focus:outline-none border-none prose w-full mt-8 prose-gray prose-strong:font-bold prose-h1:font-bold text-base",
              },
            }}
            content={note.content}
            onUpdate={({ editor }) => {
              setSaved(false);
              save({
                id: note.id,
                title,
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

            <Statusbar saved={saved} />
            <RightSidebar n={note} items={tocItems} />
          </EditorProvider>
        </Provider>
      </EditorCommandTunnelContext.Provider>
    </div>
  );
};

export default Tiptap;
