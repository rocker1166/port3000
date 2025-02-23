'use client'

import { useRef, useEffect, useState, FormEvent } from "react"
import { useChat, Message } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { SendIcon, UserIcon, BotIcon, Loader2Icon } from "lucide-react"

const STORAGE_KEY = 'chatbot_data'

interface ChatbotUIProps {
  initialMessage?: string
  selectedQuestion?: { question: string, answer: string } | null
}

export function ChatbotUI({ initialMessage = "Hello! How can I assist you today?",}: ChatbotUIProps) {
  const [isClient, setIsClient] = useState(false)
  const [questionSubmitted, setQuestionSubmitted] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, setMessages } = useChat({
    initialMessages: [{ id: 'initial', role: 'assistant', content: initialMessage }],
    api: '/api/chat',
    onFinish: (message: Message) => {
      const updatedMessages = [...messages, message]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages))
    },
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setIsClient(true)
    const storedMessages = localStorage.getItem(STORAGE_KEY)
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [setMessages])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  useEffect(() => {
    if ( isClient && !questionSubmitted) {
    
      setQuestionSubmitted(true)
      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }
  }, [ setInput, isClient, questionSubmitted])



  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const currentInput = input.trim()
    if (!currentInput) return

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: currentInput }
    const updatedMessages = [...messages, userMessage]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages))
    
    setInput('')
    await handleSubmit(e)
  }

  const handleClearChat = () => {
    const initialMessages: Message[] = [{ id: 'initial', role: 'assistant', content: initialMessage }]
    setMessages(initialMessages)
    setInput("")
    setQuestionSubmitted(false)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMessages))
  }

  if (!isClient) {
    return null
  }

  return (
    <Card className="w-full h-full flex flex-col  bg-blue-950 text-primary">
      <CardHeader className="px-4 py-3 sm:px-6 sm:py-4 border-b flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white">AI Chatbot</h2>
        <Button onClick={handleClearChat} variant="outline" size="sm" className="text-xs sm:text-sm">
          Clear Chat
        </Button>
      </CardHeader>
      <CardContent className="flex-grow p-2 sm:p-4 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full pr-2 sm:pr-4">
          {Array.isArray(messages) && messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 mb-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarFallback><BotIcon className="h-3 w-3 sm:h-4 sm:w-4" /></AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Avatar" />
                </Avatar>
              )}
              <div
                className={`p-2 sm:p-3 rounded-lg max-w-[75%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-xs sm:text-sm md:text-base break-words">{message.content}</p>
              </div>
              {message.role === "user" && (
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarFallback><UserIcon className="h-3 w-3 sm:h-4 sm:w-4" /></AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center py-2 sm:py-4">
              <Loader2Icon className="h-4 w-4 sm:h-6 sm:w-6 animate-spin text-primary" />
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-2 sm:p-4 border-t">
        <form ref={formRef} onSubmit={handleFormSubmit} className="flex space-x-2 w-full">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-grow text-xs sm:text-sm md:text-base"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" className="shrink-0" disabled={isLoading}>
            <SendIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default ChatbotUI