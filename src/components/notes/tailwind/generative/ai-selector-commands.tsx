import { ArrowDownWideNarrow, CheckCheck, RefreshCcwDot, StepForward, WrapText } from "lucide-react";
import { getPrevText, useEditor, EditorInstance } from "novel"; // Import EditorInstance type from 'novel'
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";
import React from 'react'; // Import React

interface Option {
  value: string;
  label: string;
  icon: React.ElementType; // Type for icon as React component
}

const options: Option[] = [ // Explicitly type options array
  {
    value: "improve",
    label: "Improve writing",
    icon: RefreshCcwDot,
  },
  {
    value: "fix",
    label: "Fix grammar",
    icon: CheckCheck,
  },
  {
    value: "shorter",
    label: "Make shorter",
    icon: ArrowDownWideNarrow,
  },
  {
    value: "longer",
    label: "Make longer",
    icon: WrapText,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void; // Type for onSelect function prop
}

const AISelectorCommands: React.FC<AISelectorCommandsProps> = ({ onSelect }) => {
  const { editor } = useEditor() as { editor: EditorInstance }; // Type assertion for useEditor, or get proper EditorInstance type

  if (!editor) {
    return null; // Handle case where editor might be null
  }

  return (
    <>
      <CommandGroup heading="Edit or review selection">
        {options.map((option) => (
          <CommandItem
            onSelect={(value) => { // Value here is CommandItem value, not option value
              if (!editor) return; // Add null check for editor here as well
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(slice.content);
              onSelect(text, option.value); // Use option.value here to pass correct option value
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="h-4 w-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Use AI to do more">
        <CommandItem
          onSelect={() => {
            if (!editor) return; // Add null check for editor
            const pos = editor.state.selection.from;
            const text = getPrevText(editor, pos);
            onSelect(text, "continue");
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <StepForward className="h-4 w-4 text-purple-500" />
          Continue writing
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;