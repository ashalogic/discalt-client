import { TbMicrophone } from "react-icons/tb";
import { TbMicrophoneOff } from "react-icons/tb";
import ProfileAvatar from "./profileAvatar";
import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";
type ButtonProps = {
  children?: ReactNode | undefined;
  icon?: ReactElement<IconType> | undefined;
};
export default function LoadingButton(
  props: {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  },
  { children, icon }: ButtonProps
) {
  return (
    <button
      className="ml-auto rounded-full p-2 hover:shadow-lg active:shadow"
      onClick={props.onClick}
    >
      {icon}
      {children}
    </button>
  );
}
