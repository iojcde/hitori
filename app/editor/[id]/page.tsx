import { db } from "@/lib/db";
import Editor from "./editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound } from "next/navigation";
import { Sidebar } from "./sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const EditorPage = async ({
  params: { id },
  searchParams: { q },
}: {
  params: { id: string };
  searchParams: { q: string | undefined };
}) => {
  const session = await auth();
  if (!session) return redirect("/login");

  const note = await db.note.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });
  if (!note) {
    return notFound();
  }

  return (
    <>
      <Sidebar id={id} q={q} />
      <ScrollArea id="editor-scrollarea" className=" h-screen w-full">
        <div className="container mx-auto w-full">
          <Editor note={note} />
        </div>
      </ScrollArea>
    </>
  );
};
export default EditorPage;

export const revalidate = 0;
