'use client';

import { useState } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FaCopy, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });

  const [editableInput, setEditableInput] = useState(input);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);

  const handleEditInput = (message: any) => {
    if (message.role === "user") {
      setEditableInput(message.content);
    }
  };

  const copyToClipboard = (content: any) => {
    // Use the Clipboard API without showing an alert
    navigator.clipboard.writeText(content).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const toggleReadAloud = (content: any) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setUtterance(null);
    } else {
      const newUtterance: any = new SpeechSynthesisUtterance(content);
      newUtterance.onend = () => {
        setIsSpeaking(false);
        setUtterance(null);
      };
      window.speechSynthesis.speak(newUtterance);
      setIsSpeaking(true);
      setUtterance(newUtterance);
    }
  };

  return (
    <Card className="h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Chat with PDF - Parle avec le PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`text-justify rounded-lg p-2 max-w-[80%] ${
                  m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                <p className="text-sm text-justify">{m.content}</p>
                {m.role === "assistant" && (
                  <div className="flex space-x-2 mt-2">
                    <Button onClick={() => copyToClipboard(m.content)} aria-label="Copy response">
                      <FaCopy />
                    </Button>
                    <Button 
                      onClick={() => toggleReadAloud(m.content)} 
                      aria-label={isSpeaking ? "Stop reading" : "Read aloud"}
                    >
                      {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setEditableInput('');
          }}
          className="flex w-full space-x-2"
        >
          <Input
            value={editableInput}
            onChange={(e) => {
              setEditableInput(e.target.value);
              handleInputChange(e);
            }}
            placeholder="Ask a question about the PDF..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;