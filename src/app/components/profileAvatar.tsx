import { url } from "inspector";

export default function ProfileAvatar(props: {
  imageURL?: string;
  name?: string;
  className?: string;
}) {
  return (
    <img
      alt="profile"
      className={
        `w-10 h-10 rounded-full border-2 border-transparent p-1 ` +
        props.className
      }
      src={props.imageURL}
    />
  );
}
