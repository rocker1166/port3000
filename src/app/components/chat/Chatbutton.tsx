'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChatbotUI } from "./chat"
import { BrainCircuitIcon } from "lucide-react"

interface AIChatbotSheetProps {

  onAIChatbotClick: () => void
}

export function AIChatbotSheet({ onAIChatbotClick }: AIChatbotSheetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  

  useEffect(() => {
    if ( isOpen) {
      contentRef.current?.querySelector('form')?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }
  }, [ isOpen])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      onAIChatbotClick()
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
      <Button ref={triggerRef} onClick={() => setIsOpen(true)} className="bg-black text-white">
        ASK AI <BrainCircuitIcon className="w-4 h-4 ml-2" />
      </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full bg-gray-900 text-white sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-0">
      <div className="flex flex-col h-full" ref={contentRef}>
        <SheetHeader className="p-4 sm:p-6">
        <SheetTitle className="text-white">AI Chatbot</SheetTitle>
        <SheetDescription className="mt-2">
          Chat with our AI assistant for help and information.
        </SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-hidden">
        <ChatbotUI 
          initialMessage="Welcome! How can I assist you today?" 
        />
        </div>
      </div>
      </SheetContent>
    </Sheet>
  )
}