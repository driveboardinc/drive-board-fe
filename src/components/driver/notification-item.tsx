"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface NotificationProps {
  notification: {
    id: string;
    type: string;
    title: string;
    description: string;
    time: string;
    isRead: boolean;
    actionUrl?: string;
    actionText?: string;
    company?: string;
    jobTitle?: string;
  };
  icon: ReactNode;
  onMarkAsRead: () => void;
}

export function NotificationItem({ notification, icon, onMarkAsRead }: NotificationProps) {
  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead();
    }
  };

  return (
    <div
      className={`p-4 rounded-lg transition-colors ${
        notification.isRead ? "bg-white hover:bg-gray-50" : "bg-blue-50 hover:bg-blue-100"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${notification.isRead ? "bg-gray-100" : "bg-blue-100"}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-medium ${notification.isRead ? "text-gray-900" : "text-blue-700"}`}>
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{notification.description}</p>

              {(notification.company || notification.jobTitle) && (
                <div className="mt-2 text-xs text-gray-500">
                  {notification.company && <span className="font-medium">{notification.company}</span>}
                  {notification.company && notification.jobTitle && <span> • </span>}
                  {notification.jobTitle && <span>{notification.jobTitle}</span>}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notification.time}</span>
          </div>

          {notification.actionUrl && notification.actionText && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = notification.actionUrl as string;
                }}
              >
                {notification.actionText}
              </Button>
            </div>
          )}
        </div>

        {!notification.isRead && <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />}
      </div>
    </div>
  );
}
