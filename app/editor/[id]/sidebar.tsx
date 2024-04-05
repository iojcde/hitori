import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn, timeAgo } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";
import { TimeAgo } from "@/components/timeago";
import { EllipsisVertical, PanelLeft } from "lucide-react";
import { SidebarContent } from "./sidebar-content";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Sidebar = async ({ id, q }: { id: string; q: string }) => {
  const session = await auth();

  if (!session) return null;

  const user = await db.user.findFirst({
    where: { id: session.user.id },
    select: {
      notes: {
        orderBy: { updatedAt: "desc" },
        select: {
          title: true,
          id: true,
          updatedAt: true,
          tags: true,
        },
        where: q
          ? {
              OR: [
                {
                  title: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  content: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  tags: {
                    hasSome: q.split(''),
                  },
                },
              ],
            }
          : undefined,
      },
      _count: {
        select: { notes: true },
      },
    },
  });

  if (!user) return null;
  let {
    notes,
    _count: { notes: noteCount },
  } = user;
  return (
    <>
      <div
        id="sidebar"
        className="max-w-[19rem] absolute sm:relative inset-y-0 bg-white z-50 sm:mt-0 overflow-clip shadow min-h-screen w-full border-r border-gray-4"
      >
        <div className="flex gap-2 items-center px-6 py-4">
          <Avatar className="h-8 w-8 select-none ">
            <AvatarImage
              src={session?.user.image || ""}
              alt={session?.user.name || ""}
            />
            <AvatarFallback>
              {session.user.name ? session?.user.name[0] : ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold">
              {session.user.name}&apos;s workspace
            </div>
            {noteCount && (
              <div className="text-xs text-gray-500">
                {noteCount} {noteCount === 1 ? "note" : "notes"}
              </div>
            )}
          </div>
        </div>
        <SidebarContent />

        <div className="px-2 mt-4 space-y-2">
          {notes.map((n) => (
            <Link
              href={`/editor/${n.id}`}
              key={n.id}
              className={cn(
                "border border-gray-4 rounded-sm  block px-4 py-2",
                n.id == id && "border-violet-6 bg-violet-2"
              )}
            >
              <div className="text-gray-12 font-semibold">{n.title}</div>

              <div>
                <span className="text-xs mt-1 text-gray-11">
                  <TimeAgo>{n.updatedAt}</TimeAgo>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const revalidate = 0;
export const dynamic = "force-dynamic";
