import TailwindAdvancedEditor from "../components/notes/tailwind/advanced-editor";
import { Button } from "../components/notes/tailwind/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Menu from "../components/notes/tailwind/ui/menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, GithubIcon } from "lucide-react";
import Link from "next/link";

export default function Note() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <div className="flex w-full max-w-screen-lg items-center gap-2 px-4 sm:mb-[calc(20vh)]">
      
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml gap-2">
              <BookOpen className="h-4 w-4" />
              Usage in dialog
            </Button>
          </DialogTrigger>
          <DialogContent className="flex max-w-3xl h-[calc(100vh-24px)]">
            <ScrollArea className="max-h-screen">
              <TailwindAdvancedEditor />
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Link href="/docs" className="ml-auto">
          <Button variant="ghost">Documentation</Button>
        </Link>
        <Menu />
      </div>

      <TailwindAdvancedEditor />
    </div>
  );
}
