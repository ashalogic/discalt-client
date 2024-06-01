import ProfileAvatar from "../components/profileAvatar";
import VoiceProfile from "../components/voiceProfile";
import { TbMicrophone } from "react-icons/tb";
import { TbMicrophoneOff } from "react-icons/tb";
import { TbHeadset } from "react-icons/tb";
import { TbHeadsetOff } from "react-icons/tb";
import { TbPhoneCall } from "react-icons/tb";
import { TbPhoneOff } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { VoiceContext } from "../../socket";

import * as Pizzicato from "pizzicato";

export default function VoicBox() {
  const socket = useContext(VoiceContext.SocketContext);
  // const room = useContext(VoiceContext.Room);

  const [room, setRoom] = useState("");
  const [inTheRoom, setInTheRoom] = useState(false);
  const [usersInTheRoom, setUsersInTheRoom] = useState([] as string[]);

  useEffect(() => {
    socket.on("joinRoom return", (data: string) => {
      setInTheRoom((prevState) => {
        return true;
      });
      setRoom("2");
      (window as any).isRec = true;
    });
    socket.on("leaveRoom return", (data: string) => {
      setInTheRoom((prevState) => {
        return false;
      });
      setRoom("");
      (window as any).isRec = false;
    });

    socket.on(
      "reportUsersInRoom return",
      (data: { type: string; users: string[] }) => {
        console.log(data);
        setUsersInTheRoom(data.users);
      }
    );

    socket.on("audioStream return", (audioData) => {
      var newData = audioData.split(";");
      newData[0] = "data:audio/ogg;";
      newData = newData[0] + newData[1];

      var audio = new Audio(newData);
      if (!audio || document.hidden) {
        return;
      }
      audio.play();
    });

    return () => {
      socket.off("joinRoom return");
      socket.off("leaveRoom return");
      socket.off("reportUsersInRoom return");
      socket.off("audioStream");
    };
  }, []);

  const startRec = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        var madiaRecorder = new MediaRecorder(stream);
        (window as any).mR = madiaRecorder;
        var audioChunks: any[] = [];

        madiaRecorder.addEventListener("dataavailable", function (event) {
          audioChunks.push(event.data);
        });

        madiaRecorder.addEventListener("stop", function () {
          console.log((window as any).isRec);
          if ((window as any).isRec) {
            var audioBlob = new Blob(audioChunks);
            audioChunks = [];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(audioBlob);
            fileReader.onloadend = function () {
              var base64String = fileReader.result;
              console.log(base64String);
              socket.emit("audioStream", base64String);
            };

            madiaRecorder.start();
            setTimeout(function () {
              madiaRecorder.stop();
            }, 1000);
          } else {
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
          }
        });

        madiaRecorder.start();
        setTimeout(function () {
          madiaRecorder.stop();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error capturing audio.", error);
      });
  };

  return (
    <div className="flex-none w-56 flex flex-col border-r-2 border-solid border-black/5 bg-gradient-to-t from-white relative">
      <div className="h-12 absolute bottom-0 left-0 right-0 flex flex-row items-center justify-around bg-white/30 backdrop-blur-xl border-black/5 border-t-2">
        {inTheRoom ? (
          <button
            onClick={() => {
              socket.emit("leaveRoom", { roomName: 2 });
            }}
          >
            <TbPhoneOff />
          </button>
        ) : (
          <button
            onClick={() => {
              socket.emit("joinRoom", { roomName: 2 });

              setTimeout(() => {
                startRec();
              }, 200);
            }}
          >
            <TbPhoneCall />
          </button>
        )}

        {/* <TbHeadset />
        <TbHeadsetOff />
        <TbMicrophone />
        <TbMicrophoneOff /> */}
      </div>

      <div className="h-full flex flex-col gap-4 overflow-y-auto custom-hide-scrollbar px-2 pt-2">
        {usersInTheRoom.map((x, i) => (
          <VoiceProfile
            key={i}
            imageURL={`https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${i}`}
            name={x.toString()}
            mute={false}
            talking={false}
          />
        ))}
      </div>
    </div>
  );
}
