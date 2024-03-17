import { useCurrentEditor } from "@/app/editor/[id]/editor-context";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CopyIcon } from "lucide-react";
export const EditorContextMenuWrapper = ({ children }) => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent
        onAnimationStart={() => {
          editor.commands.focus();
        }}
        onFocusOutside={(e) => {
          e.preventDefault();
        }}
        className="border min-w-[10rem]"
      >
        <ContextMenuItem
          disabled={editor.state.selection.empty}
          onClick={() => {
            editor.chain().focus().run();
            const { from, to } = editor.view.state.selection;
            const text = editor.view.state.doc.textBetween(from, to, "");

            navigator.clipboard.writeText(text);
          }}
          className="flex items-center gap-2"
        >
          <CopyIcon size="12" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
