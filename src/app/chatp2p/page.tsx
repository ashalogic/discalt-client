/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { TbSend2 } from "react-icons/tb";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import Image from "next/image";
import eye from "../../../public/bg_p2p_chat.svg";
import cryptoAPI from "@/app/util/cryptoAPI";

export default function Chatp2p() {
  const [QRCodeDataURL, setQRCodeDataURL] = useState("");
  // const [localOffer, setLocalOffer] = useState<RTCSessionDescriptionInit>();
  // const [localOfferEncrypted, setLocalOfferEncrypted] = useState<string>();
  // // const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
  // const [localAnswer, setLocalAnswer] = useState<RTCSessionDescriptionInit>();
  // const [localAnswerEncrypted, setLocalAnswerEncrypted] = useState<string>();

  let peerConnection: RTCPeerConnection;
  let localStream: MediaStream;
  let remoteStream: MediaStream;

  const Init = async () => {
    QRCode.toDataURL("Venus")
      .then((url: string) => {
        setQRCodeDataURL(url);
      })
      .catch((err: string) => {
        console.error(err);
      });
    remoteStream = new MediaStream();
    peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    peerConnection.addEventListener("connectionstatechange", () => {
      console.log("connection-state:", peerConnection.connectionState);
      if (peerConnection.connectionState === "connected") {
        alert("connected");
      }
    });
    // Camera
    localStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
      },
    });
    (document.getElementById("local-video") as HTMLVideoElement).srcObject =
      localStream;
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
    peerConnection.ontrack = (e) => {
      e.streams[0].getTracks().forEach((track) => {
        // remoteStream.addTrack(track, remoteStream);
        remoteStream.addTrack(track);
      });
      console.log("remote-stream-available");
    };
  };
  const CreateOffer = () => {};
  const AcceptOffer = () => {};
  const AcceptAnswer = () => {};

  useEffect(() => {
    Init();
  }, []);

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
    <main
      className="h-dvh bg-neutral-200 p-4 bg-no-repeat bg-right-bottom bg-[length:400px_300px]"
      style={{ backgroundImage: `url('/backgrounds/1.svg')` }}
    >
      {/* <button onClick={initializePeerConnection}>Create Offer</button> */}

      <div className="flex flex-col gap-4">
        <div className="w-full md:w-8/12 lg:w-8/12 xl:6/12 flex flex-row mx-auto gap-4">
          <div className="flex flex-row flex-grow rounded-md backdrop-blur-md bg-white/70 text-black shadow-md">
            <div className="flex flex-col flex-shrink items-center bg-[#FEE7F9] p-4">
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
            <div className="flex flex-row flex-grow items-center gap-2 p-4">
              <img className="min-w-fit w-fit border-2" alt="" height={64} width={64} src={QRCodeDataURL} />
              <div className="min-w-fit w-fit flex flex-col gap-1">
                <button className="shadow-inner hover:shadow-md bg-white p-2 rounded-md">
                  Create Offer
                </button>
                <button className="shadow-inner hover:shadow-md bg-white p-2 rounded-md">
                  Create Offer
                </button>
                <button className="shadow-inner hover:shadow-md bg-white p-2 rounded-md">
                  Create Offer
                </button>
              </div>
              <textarea className="w-full h-full" />
            </div>
          </div>
          <div className="flex flex-row-reverse flex-shrink rounded-md backdrop-blur-md bg-white/70 text-black shadow-md">
            <div className="flex flex-col items-center justify-around bg-[#E2EEDA] p-4">
              <img
                alt=""
                className="border-2 border-black rounded-full"
                height={64}
                width={64}
                src="https://avatar.iran.liara.run/public/girl?username=Maria"
              />
              <span>...</span>
              <span>......</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-8/12 lg:w-8/12 mx-auto rounded-md backdrop-blur-md bg-white/70 border-t-8 border-[#F7E6D4] text-black shadow-md p-4">
          <video
            className="w-full"
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
        {/* <Image height={128} width={128} alt="" src={"/backgrounds/1.svg"} /> */}
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
    </main>
  );
}
