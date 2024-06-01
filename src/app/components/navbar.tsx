import ProfileAvatar from "./profileAvatar";
import { TbUsersGroup } from "react-icons/tb";
// import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { VoiceContext } from "../../socket";

export default function Navbar() {
  const socket = useContext(VoiceContext.SocketContext);
  const room = useContext(VoiceContext.Room);

  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    socket.connect();
    const listener = () => setIsConnected(true);
    socket.on("connect", listener);
    return () => {
      socket.off("disconnect", listener);
    };
  }, []);
  return (
    <div className="flex-none h-12 flex flex-row gap-2 items-center border-b-2 border-black/5 p-2">
      <TbUsersGroup className="w-10 h-10" />
      <div
        className={`h-4 w-4 ${
          isConnected ? "bg-green-500" : "bg-red-500"
        } rounded-full`}
      />
      <h1>DiscALT</h1>
      {`Room:${room}`}
      <ProfileAvatar
        className="ml-auto"
        imageURL={
          "https://api.dicebear.com/8.x/adventurer/svg?seed=Sammy&skinColor=ecad80,f2d3b1&backgroundColor=b6e3f4"
        }
      />
    </div>
  );
}
