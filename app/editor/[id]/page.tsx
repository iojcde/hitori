import { db } from "@/lib/db";
import Tiptap from "./editor";

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
    <div className="container mx-auto w-full">
      <Tiptap note={note} />
    </div>
  );
};
export default EditorPage;
