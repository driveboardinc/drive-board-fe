"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, Paperclip, Send, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "./message-bubble";

interface MessageAreaProps {
  conversationId: string | null;
  onBackClick?: () => void;
  onToggleJobDetails?: () => void;
  showJobDetailsButton?: boolean;
}

interface Message {
  id: string;
  sender: "user" | "recruiter";
  content: string;
  timestamp: string;
}

interface ConversationDetails {
  id: string;
  recruiterName: string;
  company: string;
  role: string;
  avatar: string;
}

export function MessageArea({
  conversationId,
  onBackClick,
  onToggleJobDetails,
  showJobDetailsButton,
}: MessageAreaProps) {
  const [newMessage, setNewMessage] = useState("");

  // Updated mock conversation data for truck-related jobs
  const conversations: Record<string, ConversationDetails> = {
    "1": {
      id: "1",
      recruiterName: "Robert Johnson",
      company: "Interstate Trucking Co.",
      role: "CDL Truck Driver",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    "2": {
      id: "2",
      recruiterName: "Maria Garcia",
      company: "TruckTech Services",
      role: "Truck Mechanic",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    "3": {
      id: "3",
      recruiterName: "James Wilson",
      company: "FastTrack Logistics",
      role: "Logistics Coordinator",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    "4": {
      id: "4",
      recruiterName: "Sarah Martinez",
      company: "Cross Country Transport",
      role: "OTR Truck Driver",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    "5": {
      id: "5",
      recruiterName: "Michael Brown",
      company: "Reliable Fleet Services",
      role: "Fleet Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  };

  // Updated mock messages data for truck-related conversations
  const messagesData: Record<string, Message[]> = {
    "1": [
      {
        id: "1-1",
        sender: "recruiter",
        content:
          "Hi there! I'm Robert from Interstate Trucking Co. I noticed you have a Class A CDL and we're currently hiring drivers for our regional routes.",
        timestamp: "10:15 AM",
      },
      {
        id: "1-2",
        sender: "user",
        content:
          "Hello Robert, thanks for reaching out! I'm definitely interested in learning more about the position.",
        timestamp: "10:20 AM",
      },
      {
        id: "1-3",
        sender: "recruiter",
        content:
          "Great! The position is for regional routes, primarily in the Southwest. You'd be home most weekends and we offer competitive pay with benefits. Do you have experience with refrigerated loads?",
        timestamp: "10:25 AM",
      },
      {
        id: "1-4",
        sender: "user",
        content:
          "Yes, I've been driving refrigerated loads for about 3 years now. I'm looking for something with more regular home time, so this sounds perfect.",
        timestamp: "10:28 AM",
      },
      {
        id: "1-5",
        sender: "recruiter",
        content:
          "Thanks for your interest in our CDL position. Do you have experience with refrigerated loads?",
        timestamp: "10:30 AM",
      },
    ],
    "2": [
      {
        id: "2-1",
        sender: "recruiter",
        content:
          "Hello! I'm Maria from TruckTech Services. We're looking for an experienced truck mechanic to join our team.",
        timestamp: "Yesterday, 2:15 PM",
      },
      {
        id: "2-2",
        sender: "user",
        content:
          "Hi Maria, I'm interested in the mechanic position. I have 5 years of experience with diesel engines.",
        timestamp: "Yesterday, 3:00 PM",
      },
      {
        id: "2-3",
        sender: "recruiter",
        content:
          "We've reviewed your application and would like to schedule an interview to discuss your experience with diesel engines.",
        timestamp: "Yesterday, 4:30 PM",
      },
    ],
    "3": [
      {
        id: "3-1",
        sender: "recruiter",
        content:
          "Hi! I'm James from FastTrack Logistics. We're looking for a Logistics Coordinator to help manage our trucking operations.",
        timestamp: "Monday, 11:20 AM",
      },
      {
        id: "3-2",
        sender: "user",
        content:
          "Hello James, I'm interested in the Logistics Coordinator role. I have experience with transportation management systems.",
        timestamp: "Monday, 12:45 PM",
      },
      {
        id: "3-3",
        sender: "recruiter",
        content:
          "Your experience with transportation management systems looks promising. Are you familiar with FreightWise?",
        timestamp: "Monday, 2:30 PM",
      },
    ],
    "4": [
      {
        id: "4-1",
        sender: "recruiter",
        content:
          "Hello! I'm Sarah from Cross Country Transport. We're hiring OTR drivers for our long-haul routes.",
        timestamp: "Aug 15, 9:00 AM",
      },
      {
        id: "4-2",
        sender: "user",
        content:
          "Hi Sarah, I'm interested in the OTR position. I have 2 years of experience with long-haul routes.",
        timestamp: "Aug 15, 10:15 AM",
      },
      {
        id: "4-3",
        sender: "recruiter",
        content:
          "We're looking for drivers for our coast-to-coast routes. The pay is competitive and we offer great benefits.",
        timestamp: "Aug 15, 11:30 AM",
      },
    ],
    "5": [
      {
        id: "5-1",
        sender: "recruiter",
        content:
          "Hello! This is Michael from Reliable Fleet Services. We have an opening for a Fleet Manager position.",
        timestamp: "Aug 10, 1:00 PM",
      },
      {
        id: "5-2",
        sender: "user",
        content:
          "Hi Michael, I'm interested in the Fleet Manager role. I have 7 years of experience managing truck fleets.",
        timestamp: "Aug 10, 2:20 PM",
      },
      {
        id: "5-3",
        sender: "recruiter",
        content:
          "Your resume shows great experience in fleet management. We'd like to discuss how you handled driver retention in your previous role.",
        timestamp: "Aug 10, 4:45 PM",
      },
    ],
  };

  const currentConversation = conversationId ? conversations[conversationId] : null;
  const messages = conversationId ? messagesData[conversationId] : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId) return;

    // In a real app, you would send this to your API
    console.log("Sending message:", newMessage);

    // Clear the input
    setNewMessage("");
  };

  if (!currentConversation) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-500">Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b bg-white">
        {onBackClick && (
          <Button variant="ghost" size="icon" onClick={onBackClick} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentConversation.avatar} alt={currentConversation.recruiterName} />
          <AvatarFallback>{currentConversation.recruiterName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h2 className="font-medium text-sm">{currentConversation.recruiterName}</h2>
          <p className="text-xs text-gray-500">
            {currentConversation.company} • {currentConversation.role}
          </p>
        </div>

        {showJobDetailsButton && onToggleJobDetails && (
          <Button variant="ghost" size="sm" onClick={onToggleJobDetails} className="ml-auto text-blue-600">
            <FileText className="h-4 w-4 mr-1" />
            View Job
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.content}
              isUser={message.sender === "user"}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </div>

      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-3xl mx-auto">
          <Button type="button" variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
