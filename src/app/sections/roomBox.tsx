import ProfileAvatar from "../components/profileAvatar";
import VoiceProfile from "../components/voiceProfile";
import { TbMicrophone } from "react-icons/tb";
import { TbMicrophoneOff } from "react-icons/tb";
import { TbHeadset } from "react-icons/tb";
import { TbHeadsetOff } from "react-icons/tb";
import { TbPhoneCall } from "react-icons/tb";
import { TbPhoneOff } from "react-icons/tb";

export default function RoomBox() {
  return (
    <div className="flex-none w-28 flex flex-col border-r-2 border-solid border-black/5 bg-gradient-to-t from-white relative">
      <div className="h-full flex flex-col">
        <button className="hover:shadow-md p-2">Room 1</button>
        <button className="shadow-md bg-white/70 p-2">Room 2</button>
        <button className="hover:shadow-md p-2">Room 3</button>
        <button className="hover:shadow-md p-2">Room 4</button>
      </div>
    </div>
  );
}
