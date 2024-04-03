import { useCurrentEditor } from "@/app/editor/[id]/editor-context";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ClipboardPasteIcon,
  CopyIcon,
  TableIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
export const EditorContextMenuWrapper = ({ children }) => {
  const { editor } = useCurrentEditor();

  const [state, setState] = useState<{
    isInTable: boolean;
  }>({});

  if (!editor) return null;

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger
        onContextMenu={(e) => {
          const target = e.target as HTMLElement;
          const isInTable = target.closest("table") != null;
          setState({ isInTable });
        }}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent
        onAnimationStart={(e) => {
          console.log("animation start", e);
          editor.commands.focus();
        }}
        onFocusOutside={(e) => {
          e.preventDefault();
        }}
        className="border border-gray-6 min-w-[12rem] p-1"
      >
        {state.isInTable && (
          <>
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <TableIcon size="13" className="mr-2 " />
                Row
              </ContextMenuSubTrigger>
              <ContextMenuSubContent
                onFocusOutside={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest(".ProseMirror")) {
                    e.preventDefault();
                  }
                }}
              >
                <ContextMenuItem
                  onClick={() => {
                    editor.chain().focus().addRowBefore().run();
                  }}
                >
                  <ArrowUpIcon size="13" className="mr-2" />
                  Add Row Before
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    editor.chain().focus().addRowAfter().run();
                  }}
                >
                  <ArrowDownIcon size="13" className="mr-2" />
                  Add Row After
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  onClick={() => {
                    editor.chain().focus().deleteRow().run();
                  }}
                >
                  <TrashIcon size="13" className="mr-2" />
                  Delete Row
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSub>
              <ContextMenuSubTrigger
                onFocus={() => {
                  console.log("sub trigger focus");
                }}
              >
                <TableIcon size="13" className="mr-2 " />
                Column
              </ContextMenuSubTrigger>
              <ContextMenuSubContent
                onFocusOutside={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest(".ProseMirror")) {
                    e.preventDefault();
                  }
                }}
              >
                <ContextMenuItem
                  onClick={() => {
                    editor.chain().focus().addColumnBefore().run();
                  }}
                >
                  <ArrowLeftIcon size="13" className="mr-2" />
                  Add Column Before
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    editor.chain().focus().addColumnAfter().run();
                  }}
                >
                  <ArrowRightIcon size="13" className="mr-2" />
                  Add Column After
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  onClick={() => {
                    editor.chain().focus().deleteColumn().run();
                  }}
                >
                  <TrashIcon size="13" className="mr-2" />
                  Delete Column
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem
              onClick={() => {
                editor.chain().focus().deleteTable().run();
              }}
            >
              <TrashIcon size="13" className="mr-2" />
              Delete Table
            </ContextMenuItem>
            <ContextMenuSeparator />
          </>
        )}
        <ContextMenuItem
          disabled={editor.state.selection.empty}
          onClick={() => {
            editor.chain().focus().run();
            const { from, to } = editor.view.state.selection;
            const text = editor.view.state.doc.textBetween(from, to, "");

            navigator.clipboard.writeText(text);
          }}
        >
          <CopyIcon size="13" className="mr-2" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.chain().focus().run();
            navigator.clipboard.readText().then((text) => {
              editor.commands.insertContent(text);
            });
          }}
        >
          <ClipboardPasteIcon size="13" className="mr-2" />
          Paste
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
