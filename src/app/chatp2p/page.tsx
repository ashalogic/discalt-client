/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { TbSend2 } from "react-icons/tb";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import Image from "next/image";
import eye from "../../../public/bg_p2p_chat.svg";
import cryptoAPI from "@/app/util/cryptoAPI";
import { BiCopy } from "react-icons/bi";

import { PC } from "./ChatP2PContextProvider";

export default function Chatp2p() {
  const [QRCodeDataURL, setQRCodeDataURL] = useState("");
  // const [localOffer, setLocalOffer] = useState<RTCSessionDescriptionInit>();
  // const [localOfferEncrypted, setLocalOfferEncrypted] = useState<string>();
  // // const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
  // const [localAnswer, setLocalAnswer] = useState<RTCSessionDescriptionInit>();
  // const [localAnswerEncrypted, setLocalAnswerEncrypted] = useState<string>();

  useEffect(() => {
    async function doAsync() {
      QRCode.toDataURL("Venus")
        .then((url: string) => {
          setQRCodeDataURL(url);
        })
        .catch((err: string) => {
          console.error(err);
        });
      await PC.createPeerConnection();
      // const offer = await PC.createOffer();
      // (document.getElementById("SDP") as HTMLTextAreaElement).value = offer;
      PC.addEventListener("local-stream-available", () => {
        if (PC.localStream)
          (
            document.getElementById("local-video") as HTMLVideoElement
          ).srcObject = PC.localStream;
      });
      PC.addEventListener("remote-stream-available", () => {
        if (PC.remoteStream)
          (
            document.getElementById("remote-video") as HTMLVideoElement
          ).srcObject = PC.remoteStream;
      });
      PC.addEventListener("peers-connected", () => {
        alert("connected");
      });
      PC.addEventListener("peers-disconnected", () => {
        alert("disconnected");
      });
      return () => {
        PC.removeEventListener("local-stream-available");
        PC.removeEventListener("remote-stream-available");
        PC.removeEventListener("peers-connected");
        PC.removeEventListener("peers-disconnected");
      };
    }
    doAsync();
  }, []);

  const Init = async () => {};
  const CreateOffer = async () => {
    const offer = await PC.createOffer();
    (document.getElementById("SDP") as HTMLTextAreaElement).value = offer;
  };
  const AcceptOffer = async () => {
    const offer = (document.getElementById("SDP") as HTMLTextAreaElement).value;
    await PC.acceptOffer(JSON.parse(offer));
    const answer = await PC.createAnswer();
    (document.getElementById("SDP") as HTMLTextAreaElement).value = answer;
  };
  const AcceptAnswer = async () => {
    const answer = (document.getElementById("SDP") as HTMLTextAreaElement)
      .value;
    await PC.acceptAnswer(JSON.parse(answer));
  };

  // (window as any).initializePeerConnection = async (remoteSocketId?: any) => {
  //   // console.log("Remote Socket ID: " + remoteSocketId);
  //   // remoteSocketId = remoteSocketId;
  //   const localOffer = await peer.createOffer();
  //   await peer.setLocalDescription(new RTCSessionDescription(localOffer));
  //   console.log(localOffer);
  //   // (window as any).offer1 = localOffer;
  //   // console.log(
  //   //   "Set local description for creating call: " +
  //   //     JSON.stringify((window as any).offer1)
  //   // );
  //   // socket.emit("offer-request", { fromOffer: localOffer, to: remoteSocketId });
  // };
  // (window as any).readTheOffer = async (offer: any) => {
  //   await peer.setRemoteDescription(new RTCSessionDescription(offer));
  //   console.log("Set Remote Description:" + offer);
  //   const answereOffer = await peer.createAnswer();
  //   await peer.setLocalDescription(new RTCSessionDescription(answereOffer));
  //   console.log(answereOffer);
  //   const mySteam = await navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: true,
  //   });
  //   mySteam.getTracks().forEach((track) => peer.addTrack(track, mySteam));
  // };
  // (window as any).acceptAnswer = async (offer: any) => {
  //   await peer.setRemoteDescription(new RTCSessionDescription(offer));
  //   console.log(offer);
  // };
  // (window as any).start = async () => {
  //   try {
  //     var localVideo = document.getElementById(
  //       "local-video"
  //     ) as HTMLVideoElement;
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     localVideo.srcObject = stream;

  //     // Add the local stream to the connection
  //     stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  //   } catch (error) {
  //     console.error("Error Streaming video:", error);
  //   }

  //   peer.ontrack = (event) => {
  //     // Don't set srcObject again if it is already set.
  //     var remoteVideo = document.getElementById(
  //       "remote-video"
  //     ) as HTMLVideoElement;
  //     if (remoteVideo.srcObject) return;
  //     remoteVideo.srcObject = event.streams[0];
  //   };
  // };
  // useEffect(() => {
  //   async function doAsync() {
  //     const localVideo = document.getElementById(
  //       "local-video"
  //     ) as HTMLVideoElement;

  //     if (localVideo) {
  //       navigator.mediaDevices
  //         .getUserMedia({ video: true, audio: true })
  //         .then((stream) => {
  //           localVideo.srcObject = stream;
  //         })
  //         .catch((error) => {
  //           console.error("Error accessing media devices.", error);
  //         });
  //     }

  //     const config = {
  //       iceServers: [
  //         {
  //           urls: "stun:stun.l.google.com:19302", // Google's public STUN server
  //         },
  //       ],
  //     };

  //     var _peerConnection = new RTCPeerConnection(config);
  //     const localOffer = await _peerConnection.createOffer();
  //     await _peerConnection.setLocalDescription(
  //       new RTCSessionDescription(localOffer)
  //     );
  //     setLocalOffer(localOffer);
  //     const result = await cryptoAPI.encryptData(localOffer.sdp, "ashalogic");
  //     setLocalOfferEncrypted(result);

  //     // Handle ICE candidates
  //     _peerConnection.onicecandidate = (event) => {
  //       console.log(event);
  //       if (event.candidate) {
  //         console.log(event);
  //         // socket.emit("ice candidate", event.candidate, roomId);
  //       }
  //     };

  //     // Handle remote video stream
  //     _peerConnection.ontrack = (event) => {
  //       // remoteVideo.srcObject = event.streams[0];
  //     };

  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     localVideo.srcObject = stream;

  //     // Add the local stream to the connection
  //     stream
  //       .getTracks()
  //       .forEach((track) => _peerConnection.addTrack(track, stream));

  //     (window as any).pee = _peerConnection;
  //     // setPeerConnection(_peerConnection);
  //   }

  //   doAsync();
  // }, []);

  // useEffect(() => {
  //   if (localOfferEncrypted) {
  //     QRCode.toDataURL(localOfferEncrypted)
  //       .then((url: string) => {
  //         setQRCodeDataURL(url);
  //       })
  //       .catch((err: string) => {
  //         console.error(err);
  //       });
  //   }
  // }, [localOfferEncrypted]);

  const ChatCard = (
    <div className="flex-none w-72 flex flex-col gap-4 rounded-t-none rounded-lg bg-white/70 border-t-8 border-[#F7E6D4] text-black shadow-md p-4">
      <div className="h-auto">
        <span className="bg-[#F7E6D4] p-2 rounded-lg">Chat</span>
      </div>
      <div className="h-64 flex flex-col overflow-scroll bg-[#F7E6D4] p-2 rounded-lg">
        {[...Array(5)].map((x, i) => (
          <div key={i}>You: sadsa</div>
        ))}
      </div>
      <div className="h-auto bg-[#F7E6D4] p-2 rounded-lg flex flex-row gap-1 items-center">
        <input className="w-full rounded-lg" />
        <button className="w-auto hover:shadow">
          <TbSend2 size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* <button onClick={initializePeerConnection}>Create Offer</button> */}

      <div className="flex flex-col gap-4">
        <div className="w-full md:w-8/12 lg:w-8/12 xl:6/12 flex flex-row mx-auto gap-2 sm:gap-4">
          <div className="flex flex-row flex-shrink rounded-md backdrop-blur-md bg-white text-black shadow-md">
            <div className="flex flex-col flex-shrink items-center bg-[#FEE7F9] p-2 sm:p-4 gap-2 sm:gap-4">
              <img
                alt=""
                className="border-2 border-black rounded-full"
                height={64}
                width={64}
                src="https://avatar.iran.liara.run/public/boy?username=Scott"
              />
              <span>Parsiya</span>
              <span>Keshavarz</span>
            </div>
            <div className="flex flex-col justify-center p-1 sm:p-4 gap-1 sm:gap-4">
              <img
                className="w-fit"
                alt=""
                height={64}
                width={64}
                src={QRCodeDataURL}
              />
            </div>
          </div>
          <div className="flex flex-row flex-grow rounded-md backdrop-blur-md bg-white text-black shadow-md">
            <div className="basis-3/4 sm:basis-2/4 flex flex-col justify-around p-2 sm:p-4 gap-2 sm:gap-4">
              <button
                onClick={async () => {
                  await CreateOffer();
                }}
                className="hover:shadow-md bg-white p-2 rounded-sm minw-fit"
              >
                Create Offer
              </button>
              <button
                onClick={async () => {
                  await AcceptOffer();
                }}
                className="hover:shadow-md bg-white p-2 rounded-sm"
              >
                AcceptOffer
              </button>
              <button
                onClick={async () => {
                  await AcceptAnswer();
                }}
                className="hover:shadow-md bg-white p-2 rounded-sm"
              >
                Accept Answer
              </button>
            </div>
            <div className="basis-2/4 sm:basis-2/4 p-4 flex">
              <textarea id="SDP" className="w-full h-full border-2" />
              <button className="p-2 shadow-sm hover:shadow-lg bg-white rounded-sm absolute bottom-5 right-5">
                <BiCopy />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-8/12 lg:w-8/12 mx-auto rounded-md backdrop-blur-md bg-white/70 border-t-8 border-[#F7E6D4] text-black shadow-md p-4">
          <video
            className="w-full"
            id="remote-video"
            src="https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4"
            autoPlay={true}
            muted
          />
          <video
            className="absolute bottom-4 right-4 w-2/5"
            id="local-video"
            autoPlay={true}
            muted
          />
        </div>
      </div>

      {/* {CallCard} */}
      {/* {[...Array(5)].map((x, i) => (
          <div
            key={i}
            className="flex-shrink rounded-lg bg-white/70 border-t-8 border-[#E6E0EA] shadow-md p-4"
          >
            <h1>ChatP2P</h1>
          </div>
        ))}
        {[...Array(5)].map((x, i) => (
          <div
            key={i}
            className="flex-shrink rounded-lg bg-white/70 border-t-8 border-[#E2EEDA] shadow-md p-4"
          >
            <h1>ChatP2P</h1>
          </div>
        ))}
        {[...Array(5)].map((x, i) => (
          <div
            key={i}
            className="flex-shrink rounded-lg bg-white/70 border-t-8 border-[#FEE7F9] shadow-md p-4"
          >
            <h1>ChatP2P</h1>
          </div>
        ))} */}
    </div>
  );
}
