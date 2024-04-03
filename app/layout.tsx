import { Nav } from "@/components/nav";
import "./globals.css";
import localFont from "next/font/local";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { CommandMenu } from "@/components/command-menu";

 
const Inter = localFont({
  src: "../fonts/InterVariable.woff2",
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={cn(Inter.className)}>
        <div className="fixed bottom-0 top-0 w-full overflow-x-auto">
          <Providers>
            <CommandMenu />
            {children}
          </Providers>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
