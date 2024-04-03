import { TextSelection } from "@tiptap/pm/state";
import { useCurrentEditor } from "./editor-context";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { TagPopover } from "./tag-popover";
import { TagList } from "@/components/tag/tag-list";

export const ToCItem = ({ item, onItemClick }) => {
  return (
    <div
      className={`toc--item toc--item--level_${item.level} pb-2`}
      style={{
        paddingLeft: (item.level - 1) * 20,
      }}
    >
      <a
        style={{
          display: "block",
          borderRadius: "4px",
        }}
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.id)}
        className={cn(
          "font-semibold  ",
          item.isActive && "font-bold  text-purple-12"
        )}
      >
        {item.itemIndex}. {item.textContent}
      </a>
    </div>
  );
};

export const ToC = ({ items = [] }) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return <>wowwowowowowoowowowowowo</>;
  }

  const onItemClick = (e, id) => {
    e.preventDefault();

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`);
      const pos = editor.view.posAtDOM(element, 0);

      // set focus
      const tr = editor.view.state.tr;

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)));

      editor.view.dispatch(tr);

      editor.view.focus();

      if (history.pushState) {
        // eslint-disable-line
        history.pushState(null, null, `#${id}`); // eslint-disable-line
      }

      const scrollArea = document.querySelector(
        "#editor-scrollarea [data-radix-scroll-area-viewport]"
      );
      console.log(scrollArea);
      scrollArea?.scrollTo({
        top: element?.getBoundingClientRect().top + scrollArea.scrollTop - 20,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="toc--list ">
      <h2 className="mb-4 font-bold"> Table of Contents</h2>
      {items.length == 0 && (
        <p className="text-xs font-gray-11">
          Start editing your document to see the outline.
        </p>
      )}
      {items.map((item, i) => (
        <ToCItem
          onItemClick={onItemClick}
          key={item.id}
          item={item}
          index={i + 1}
        />
      ))}
    </div>
  );
};
