import { TbMicrophone } from "react-icons/tb";
import { TbMicrophoneOff } from "react-icons/tb";
import ProfileAvatar from "./profileAvatar";
import LoadingButton from "./loadingButton";

export default function VoiceProfile(props: {
  imageURL?: string;
  name?: string;
  mute?: boolean;
  talking?: boolean;
}) {
  return (
    <div className="h-12 flex flex-row gap-2 items-center">
      <ProfileAvatar
        imageURL={props.imageURL}
        className={`${props.mute ? "border-red-500" : ""} ${
          props.talking ? "border-green-500" : ""
        }`}
      />
      <span>{props.name}</span>
      {/* <LoadingButton>
        <TbMicrophone />
      </LoadingButton> */}
      {/* <button className="ml-auto rounded-full p-2 hover:shadow-lg active:shadow"></button> */}
    </div>
  );
}
