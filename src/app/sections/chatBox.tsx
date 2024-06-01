import { BiSend } from "react-icons/bi";
import ChatMessage from "../components/chatMessage";
import ProfileAvatar from "../components/profileAvatar";
import VoiceProfile from "../components/voiceProfile";
import { Direction } from "../types";
import { useContext, useEffect, useState } from "react";
import { VoiceContext } from "@/socket";

export default function ChatBox() {
  const socket = useContext(VoiceContext.SocketContext);
  const [messages, setMessages] = useState(
    [] as { user: string; message: string }[]
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on(
      "newMessageReceived",
      (data: { user: string; message: string }) => {
        console.log(data);
        setMessages((prevMessage) => {
          return [...prevMessage, data];
        });
      }
    );

    return () => {
      socket.off("newMessageReceived");
    };
  }, []);
  return (
    <div className="flex-grow flex flex-col border-solid border-black/5 bg-gradient-to-t from-white relative">
      <div className="h-12 absolute bottom-0 left-0 right-0 flex flex-row items-center justify-around gap-2 bg-white/70 backdrop-blur-xl border-black/5 border-t-2 p-2">
        <input
          className="flex-grow border-2 p-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              socket.emit("sendNewMessage", message);
              setMessage("");
            }
          }}
        />
        <button
          onClick={() => {
            socket.emit("sendNewMessage", message);
            setMessage("");
          }}
        >
          <BiSend className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-grow flex flex-col gap-4 overflow-y-auto custom-hide-scrollbar">
        {messages.map((x, i) => (
          <ChatMessage
            key={i}
            imageURL={`https://i.pravatar.cc/150?img=${x.user}`}
            dir={x.user === socket.id ? Direction.LTR : Direction.RTL}
            message={x.message}
          />
        ))}
      </div>
    </div>
  );
}
