"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ConversationListProps {
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

interface Conversation {
  id: string;
  name: string;
  company: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
}

export function ConversationList({ activeConversationId, onSelectConversation }: ConversationListProps) {
  // Updated mock data for truck-related conversations
  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Robert Johnson",
      company: "Interstate Trucking Co.",
      role: "CDL Truck Driver",
      lastMessage:
        "Thanks for your interest in our CDL position. Do you have experience with refrigerated loads?",
      time: "10:30 AM",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Maria Garcia",
      company: "TruckTech Services",
      role: "Truck Mechanic",
      lastMessage:
        "We've reviewed your application and would like to schedule an interview to discuss your experience with diesel engines.",
      time: "Yesterday",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "James Wilson",
      company: "FastTrack Logistics",
      role: "Logistics Coordinator",
      lastMessage:
        "Your experience with transportation management systems looks promising. Are you familiar with FreightWise?",
      time: "Monday",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Sarah Martinez",
      company: "Cross Country Transport",
      role: "OTR Truck Driver",
      lastMessage:
        "We're looking for drivers for our coast-to-coast routes. The pay is competitive and we offer great benefits.",
      time: "Aug 15",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Michael Brown",
      company: "Reliable Fleet Services",
      role: "Fleet Manager",
      lastMessage:
        "Your resume shows great experience in fleet management. We'd like to discuss how you handled driver retention in your previous role.",
      time: "Aug 10",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search messages" className="pl-9 bg-gray-100 border-0" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <Button
            key={conversation.id}
            variant="ghost"
            className={`w-full justify-start p-3 h-auto rounded-none ${
              activeConversationId === conversation.id ? "bg-blue-50 rounded-none" : ""
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-start gap-3 w-full text-left">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={conversation.avatar} alt={conversation.name} />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-sm truncate text-gray-900">{conversation.name}</h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">{conversation.time}</span>
                </div>
                <p className="text-xs text-gray-600 truncate">
                  {conversation.company} • {conversation.role}
                </p>
                <p
                  className={`text-xs mt-1 truncate ${
                    conversation.unread ? "font-medium text-gray-900" : "text-gray-500"
                  }`}
                >
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
