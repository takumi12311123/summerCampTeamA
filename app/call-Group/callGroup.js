const Peer = window.Peer;

(async function main() {
  const localVideo = document.getElementById("js-local-stream");
  const joinTrigger = document.getElementById("js-join-trigger");
  const leaveTrigger = document.getElementById("js-leave-trigger");
  const remoteVideos = document.getElementById("js-remote-streams");
  const roomId = document.getElementById("js-room-id");
  const roomMode = document.getElementById("js-room-mode");
  const localText = document.getElementById("js-local-text");
  const sendTrigger = document.getElementById("js-send-trigger");
  const messages = document.getElementById("js-messages");

  const getRoomModeByHash = () => (location.hash === "#sfu" ? "sfu" : "mesh");

  // roomMode.textContent = getRoomModeByHash();
  // window.addEventListener(
  //   "hashchange",
  //   () => (roomMode.textContent = getRoomModeByHash())
  // );

  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .catch(console.error);

  // Render local stream
  localVideo.muted = true;
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);

  const peer = (window.peer = new Peer({
    key: window.__SKYWAY_KEY__,
    debug: 3,
  }));

  joinTrigger.addEventListener("click", () => {
    if (!peer.open) {
      return;
    }

    const room = peer.joinRoom(roomId.value, {
      mode: getRoomModeByHash(),
      stream: localStream,
    });

    room.once("open", () => {
      messages.textContent += "=== You joined ===\n";
    });
    room.on("peerJoin", () => {
      messages.textContent += `=== ${peerId} joined ===\n`;
    });

    room.on("stream", async (stream) => {
      const newVideo = document.createElement("video");
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      newVideo.setAttribute("data-peer-id", stream.peerId);
      remoteVideos.append(newVideo);
      await newVideo.play().catch(console.error);
    });

    room.on("data", ({ data, src }) => {
      messages.textContent += `${src}: ${data}\n`;
    });

    room.on("peerLeave", (peerId) => {
      const remoteVideo = remoteVideos.querySelector(
        `[data-peer-id="${peerId}"]`
      );
      remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();

      messages.textContent += `=== ${peerId} left ===\n`;
    });

    room.once("close", () => {
      sendTrigger.removeEventListener("click", onClickSend);
      messages.textContent += "== You left ===\n";
      Array.from(remoteVideos.children).forEach((remoteVideo) => {
        remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
        remoteVideo.srcObject = null;
        remoteVideo.remove();
      });
    });

    async function muteOff() {
      localStream = await navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .catch(console.error);
    }

    async function muteOn() {
      const tracks = document
        .getElementById("js-local-stream")
        .srcObject.getTracks();
      tracks.forEach((track) => {
        track.start();
      });

      document.getElementById("js-local-stream").srcObject = localStream;
    }

    async function videoOff() {
      const tracks = document
        .getElementById("js-local-stream")
        .srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });

      document.getElementById("js-local-stream").srcObject = null;
    }

    async function videoOn() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((media) => {
          localVideo = media;
          localVideo.srcObject = localStream;
        });
    }

    const muteButton = document.getElementById("mute-button");

    muteButton.addEventListener("click", () => {
      if (localVideo.muted == true) {
        muteOn();
      } else {
        muteOff();
      }
    });

    const videoButton = document.getElementById("camera-button");

    videoButton.addEventListener("click", () => {
      if (localVideo.srcObject == localStream) {
        videoOff();
      } else {
        videoOn();
      }
    });

    sendTrigger.addEventListener("click", onClickSend);
    leaveTrigger.addEventListener("click", () => room.close(), { once: true });

    function onClickSend() {
      // Send message to all of the peers in the room via websocket
      room.send(localText.value);
      const name = document.getElementById("js-your-name");

      messages.textContent += `${peer.id}: ${localText.value}\n`;
      localText.value = "";
    }
  });

  peer.on("error", console.error);
})();
