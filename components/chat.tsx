'use client';

import { useState } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FaCopy, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; // Added FaVolumeMute icon

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });

  // State to manage editable input and speech synthesis
  const [editableInput, setEditableInput] = useState(input);
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track if the app is reading aloud
  const [utterance, setUtterance] = useState(null); // Manage the speech utterance

  const handleEditInput = (message) => {
    if (message.role === "user") {
      setEditableInput(message.content); // Set input to last user message for editing
    }
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const toggleReadAloud = (content) => {
    // If currently speaking, stop the speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setUtterance(null);
    } else {
      // If not speaking, start speech synthesis
      const newUtterance = new SpeechSynthesisUtterance(content);
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
    <Card className="h-[600px] flex flex-col">
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
            setEditableInput(''); // Clear input after submit
          }}
          className="flex w-full space-x-2"
        >
          <Input
            value={editableInput}
            onChange={(e) => {
              setEditableInput(e.target.value);
              handleInputChange(e); // Keep original input handling
            }}
            placeholder="Ask a question about the PDF..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Thinking..." : "Send"}
          </Button>
          {/* Button to edit last user message */}
          {messages.length > 0 && messages[messages.length - 1].role === "user" && (
            <Button onClick={() => handleEditInput(messages[messages.length - 1])}>
              Edit Last Input
            </Button>
          )}
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;