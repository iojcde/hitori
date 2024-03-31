import { db } from "@/lib/db";
import Tiptap from "./editor";
import { ScrollArea } from "@/components/ui/scroll-area";

const EditorPage = async ({ params: { id } }) => {
  const note = await db.note.findFirst({
    where: {
      id,
    },
  });
  if (!note) {
    return <div>Not found</div>;
  }

  return (
    <ScrollArea id="editor-scrollarea" className=" h-screen w-full">
      <div className="container mx-auto w-full">
        <Tiptap note={note} />
      </div>
    </ScrollArea>
  );
};
export default EditorPage;

export const revalidate = 0;
