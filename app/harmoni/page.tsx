"use client";

import { useState, useEffect, useRef } from "react";
import PromptSuggestionsRow from "../components/PromptSuggestionsRow";
import LoadingBubble from "../components/LoadingBubble";
import Bubble from "../components/Bubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const noMessages = messages.length === 0;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      role: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      const data = await response.json();

      if (data.reply) {
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          content: data.reply,
          role: "assistant",
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrompt = (promptText: string) => {
    setInput(promptText);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col p-4 gap-2">
      <main className=" dark:bg-gray-800 bg-gray-200  rounded-t-3xl  h-[75vh] p-2">
        <section className={noMessages ? "" : "populated"}>
          {noMessages ? (
            <div className="flex flex-col h-[75vh] w-full items-center justify-center">
              <p className="starter-text text-center px-5">
                {`Hi there! 😊 I'm Harmoni.AI, your AI companion for mental well-being.
  Whether you need a listening ear, a moment of calm, or helpful coping
  strategies, I'm here for you. 💙 Feel free to share your thoughts—I'm
  always ready to chat. You're not alone. 💬✨`}
              </p>

              <br />
              <PromptSuggestionsRow onPromptClick={handlePrompt} />
            </div>
          ) : (
            <div className="flex flex-col h-[73vh] overflow-y-auto no-scrollbar flex-grow">
              <div className="flex flex-col mt-auto">
                {messages.map((message, index) => (
                  <Bubble key={`message-${index}`} message={message} />
                ))}
                {isLoading && <LoadingBubble />}
              </div>
              <div ref={messagesEndRef} />
            </div>
          )}
        </section>
      </main>
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-around items-center gap-4"
      >
        <Input
          className="w-full"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Ask me something..?"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Home;
