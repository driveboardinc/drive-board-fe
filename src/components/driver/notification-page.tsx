"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Bell, MessageSquare, Briefcase, Calendar, Eye } from "lucide-react";
import { NotificationItem } from "./notification-item";

interface Notification {
  id: string;
  type: "application" | "message" | "recommendation" | "profile" | "interview" | "saved";
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
  company?: string;
  jobTitle?: string;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "application",
      title: "Application viewed",
      description: "Interstate Trucking Co. has viewed your application for CDL Truck Driver",
      time: "10 minutes ago",
      isRead: false,
      company: "Interstate Trucking Co.",
      jobTitle: "CDL Truck Driver",
      actionUrl: "#",
      actionText: "View Application",
    },
    {
      id: "2",
      type: "message",
      title: "New message",
      description: "Robert Johnson from Interstate Trucking Co. sent you a message about your application",
      time: "1 hour ago",
      isRead: false,
      company: "Interstate Trucking Co.",
      actionUrl: "#",
      actionText: "Reply",
    },
    {
      id: "3",
      type: "interview",
      title: "Interview invitation",
      description: "TruckTech Services has invited you to interview for Truck Mechanic position",
      time: "3 hours ago",
      isRead: true,
      company: "TruckTech Services",
      jobTitle: "Truck Mechanic",
      actionUrl: "#",
      actionText: "Schedule Interview",
    },
    {
      id: "4",
      type: "recommendation",
      title: "Job recommendation",
      description: "Based on your profile, we found a new OTR Truck Driver job that might interest you",
      time: "Yesterday",
      isRead: true,
      company: "Cross Country Transport",
      jobTitle: "OTR Truck Driver",
      actionUrl: "#",
      actionText: "View Job",
    },
    {
      id: "5",
      type: "profile",
      title: "Profile viewed",
      description: "Your profile was viewed by FastTrack Logistics",
      time: "Yesterday",
      isRead: true,
      company: "FastTrack Logistics",
      actionUrl: "#",
      actionText: "View Company",
    },
    {
      id: "6",
      type: "application",
      title: "Application update",
      description:
        "Your application for Fleet Manager at Reliable Fleet Services has moved to the next stage",
      time: "2 days ago",
      isRead: true,
      company: "Reliable Fleet Services",
      jobTitle: "Fleet Manager",
      actionUrl: "#",
      actionText: "View Details",
    },
    {
      id: "7",
      type: "saved",
      title: "Saved job expiring",
      description: "The CDL Driver job you saved at Midwest Hauling is expiring in 2 days",
      time: "2 days ago",
      isRead: true,
      company: "Midwest Hauling",
      jobTitle: "CDL Driver",
      actionUrl: "#",
      actionText: "Apply Now",
    },
    {
      id: "8",
      type: "recommendation",
      title: "New jobs in your area",
      description: "5 new truck driving jobs were posted in Dallas, TX",
      time: "3 days ago",
      isRead: true,
      actionUrl: "#",
      actionText: "Browse Jobs",
    },
    {
      id: "9",
      type: "message",
      title: "Message from recruiter",
      description: "Sarah Martinez from Cross Country Transport has sent you a follow-up message",
      time: "4 days ago",
      isRead: true,
      company: "Cross Country Transport",
      actionUrl: "#",
      actionText: "Read Message",
    },
    {
      id: "10",
      type: "application",
      title: "Application rejected",
      description: "Your application for Local Delivery Driver at City Express Logistics was not selected",
      time: "1 week ago",
      isRead: true,
      company: "City Express Logistics",
      jobTitle: "Local Delivery Driver",
      actionUrl: "#",
      actionText: "View Similar Jobs",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const getFilteredNotifications = (type?: string) => {
    if (!type || type === "all") return notifications;
    return notifications.filter((notification) => notification.type === type);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "application":
        return <Briefcase className="h-5 w-5" />;
      case "message":
        return <MessageSquare className="h-5 w-5" />;
      case "recommendation":
        return <Briefcase className="h-5 w-5" />;
      case "profile":
        return <Eye className="h-5 w-5" />;
      case "interview":
        return <Calendar className="h-5 w-5" />;
      case "saved":
        return <Briefcase className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-3xl h-screen border mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        {unreadCount > 0 && (
          <Button variant="ghost" onClick={markAllAsRead} className="text-blue-600 hover:text-blue-800">
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-gray-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-white">
            All
            {unreadCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="application" className="data-[state=active]:bg-white">
            Applications
          </TabsTrigger>
          <TabsTrigger value="message" className="data-[state=active]:bg-white">
            Messages
          </TabsTrigger>
          <TabsTrigger value="recommendation" className="data-[state=active]:bg-white">
            Jobs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-1 mt-0">
          {getFilteredNotifications().map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              icon={getIcon(notification.type)}
              onMarkAsRead={() => markAsRead(notification.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="application" className="space-y-1 mt-0">
          {getFilteredNotifications("application").map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              icon={getIcon(notification.type)}
              onMarkAsRead={() => markAsRead(notification.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="message" className="space-y-1 mt-0">
          {getFilteredNotifications("message").map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              icon={getIcon(notification.type)}
              onMarkAsRead={() => markAsRead(notification.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="recommendation" className="space-y-1 mt-0">
          {getFilteredNotifications("recommendation").map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              icon={getIcon(notification.type)}
              onMarkAsRead={() => markAsRead(notification.id)}
            />
          ))}
        </TabsContent>
      </Tabs>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Bell className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
          <p className="text-gray-500 text-center mt-2">
            When you have new notifications, they will appear here
          </p>
        </div>
      )}
    </div>
  );
}
