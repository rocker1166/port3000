import { EditorBubble, removeAIHighlight, useEditor, EditorInstance } from "novel"; // Import EditorInstance type from 'novel'
import { Fragment, type ReactNode, useEffect } from "react";
import { Button } from "../ui/button";
import Magic from "../ui/icons/magic";
import { AISelector } from "./ai-selector";
import { Placement } from "tippy.js";

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GenerativeMenuSwitch: React.FC<GenerativeMenuSwitchProps> = ({ children, open, onOpenChange }: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor() as { editor: EditorInstance }; // Type assertion for useEditor

  useEffect(() => {
    if (!open && editor) removeAIHighlight(editor); // Add check for editor before calling removeAIHighlight
  }, [open, editor]); // Add editor to the dependency array

  const tippyOptions = { // Explicitly type tippyOptions
    placement: open ? ("bottom-start" as Placement) : ("top" as Placement),
    onHidden: () => {
      onOpenChange(false);
      editor?.chain().unsetHighlight().focus().run(); // Use optional chaining and check for editor existence
    },
  };

  return (
    <EditorBubble
      tippyOptions={tippyOptions}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <Fragment>
          <Button
            className="gap-1 rounded-none text-purple-500"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <Magic className="h-5 w-5" />
            Ask AI
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;