import TailwindAdvancedEditor from "../../components/notes/tailwind/advanced-editor";
import { Button } from "../../components/notes/tailwind/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Menu from "../../components/notes/tailwind/ui/menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, GithubIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5 bg-zinc-900 text-cyan-500">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-lg shadow-lg border border-cyan-900/30 p-4">
        <TailwindAdvancedEditor />
      </div>
    </div>
  );
}
