interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function MessageBubble({ message, isUser, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-white text-gray-800 rounded-bl-none border"
          }`}
        >
          <p className="text-sm">{message}</p>
        </div>
        <p className={`text-xs mt-1 ${isUser ? "text-right" : "text-left"} text-gray-500`}>{timestamp}</p>
      </div>
    </div>
  );
}
