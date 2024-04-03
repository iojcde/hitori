"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagInput } from "@/components/tag/tag-input";
import { Button, buttonVariants } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Label } from "../ui/label";
import { addTags } from "@/actions/add-tags";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function TagMaker({ initial }) {
  const [tags, setTags] = React.useState<string[]>(initial || []);

  const route = usePathname();
  const id = route.split("/").pop();

  return (
    <div className="w-full relative flex flex-col space-y-1">
      <div className="preview flex  w-full  mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md">
        <div className="space-y-2 flex flex-col items-start">
          <Label>Tags</Label>
          <TagInput
            shape={"pill"}
            size={"sm"}
            className="text-xs h-8"
            placeholder="New Tags"
            tags={tags}
            maxTags={10}
            setTags={(newTags) => {
              setTags(newTags);
            }}
          />

          <Button
            variant={"outline"}
            size={"sm"}
            onClick={async () => {
              toast.promise(addTags(tags, id), {
                loading: "Saving tags...",
                success: "Tags saved!",
                error: "Failed to save tags",
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
