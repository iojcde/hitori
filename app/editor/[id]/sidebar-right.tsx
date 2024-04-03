import { ToC } from "./toc";
import React from "react";
import TagMaker from "@/components/tag/tag-maker";

const MemorizedToC = React.memo(ToC);
export const RightSidebar = ({ items, n }) => {
  return (
    <div className="hidden xl:block absolute right-0 inset-y-4 w-80 p-4 text-sm">
      <MemorizedToC items={items} />

      <div className="pb-1 space-x-1 mt-16">
        <TagMaker initial={n.tags} />
      </div>
    </div>
  );
};
