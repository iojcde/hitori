"use client";
import { PanelLeft } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

export const MobileNav = () => {
  return (
    <>
      <button
        id="sidebar-overlay"
        onClick={() => {
          document.querySelector("#sidebar").classList.toggle("open");
          document.querySelector("#sidebar-overlay").classList.toggle("open");
        }}
      />
      <div className="sm:hidden flex bg-white dark:bg-black items-center justify-between z-10 top-0 inset-x-0 h-14 p-2">
        <Button
          onClick={() => {
            document.querySelector("#sidebar").classList.toggle("open");
            document.querySelector("#sidebar-overlay").classList.toggle("open");
          }}
          variant="ghost"
          className="px-2 relative z-50 text-violet-500 focus:text-violet-500"
        >
          <PanelLeft size={24} />
        </Button>
        <Button
          variant="ghost"
          className="px-2 text-violet-500 focus:text-violet-500"
        >
          <EllipsisVertical size={24} />
        </Button>
      </div>
    </>
  );
};
