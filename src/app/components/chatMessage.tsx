import { Direction } from "../types";
import ProfileAvatar from "./profileAvatar";

export default function ChatMessage(props: {
  imageURL?: string;
  name?: string;
  dir: Direction.LTR | Direction.RTL;
  message?: String;
}) {
  return (
    <div dir={props.dir} className="flex flex-row flex-grow-0 gap-2">
      <ProfileAvatar imageURL={props.imageURL} />
      <div className="bg-purple-500 p-2 rounded-xl rounded-ss-none ">
        <span>{props.message}</span>
      </div>
    </div>
  );
}
