import { useCurrentEditor } from "./editor-context";

export const Statusbar = ({ saved }) => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  return (
    <div className="statusbar tabular-nums flex gap-3 items-baseline bg-gray-2 text-gray-11 absolute bottom-0 right-0 px-4 text-sm py-1.5 pb-1 border rounded-tl-lg">
      <div>{saved ? "Saved" : "Unsaved"}</div>
      <div>{editor?.getText().length} characters</div>
    </div>
  );
};
