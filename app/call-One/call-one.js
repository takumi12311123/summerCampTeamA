const Peer = window.Peer;
(async function main() {
  const remoteVideo = document.getElementById("js-remote-stream");
  const localVideo = document.getElementById("js-local-stream");
  const remoteId = document.getElementById("js-remote-id");
  const localId = document.getElementById("js-local-id");
  const callTrigger = document.getElementById("js-call-trigger");
  const closeTrigger = document.getElementById("js-close-trigger");
  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .catch(console.error);

  localVideo.muted = true;
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);

  const peer = (window.peer = new Peer({
    key: window.__SKYWAY_KEY__,
    debug: 3,
  }));

  callTrigger.addEventListener("click", () => {
    const mediaConnection = peer.call(remoteId.value, localStream);
    mediaConnection.on("stream", async (stream) => {
      // Render remote stream for caller
      remoteVideo.srcObject = stream;
      remoteVideo.playsInline = true;
      await remoteVideo.play().catch(console.error);
    });
  });

  closeTrigger.addEventListener("click", () => {
    localVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
    alert("通信を切断しました");
  });

  // callされたときの処理
  peer.on("call", (mediaConnection) => {
    if (!peer.on) {
      return;
    }

    mediaConnection.answer(localStream);

    mediaConnection.on("stream", async (stream) => {
      remoteVideo.srcObject = stream;
      remoteVideo.playsInline = true;
      await remoteVideo.play().catch(console.error);
    });

    mediaConnection.once("close", () => {
      remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideo.srcObject = null;
      alert("通信が切断しました。");
    });

    closeTrigger.addEventListener("click", () => mediaConnection.close(true));
  });

  peer.once("open", (id) => (localId.textContent = id));
  peer.on("error", (err) => console.log(err.massage));
  const muteButton = document.getElementById("mute-Button");

  muteButton.addEventListener("click", () => {
    if (localVideo.muted == true) {
      muteOn();
    }
    if (localVideo.muted == false) {
      muteOff();
    }
  });

  const videoButton = document.getElementById("camera-button");

  videoButton.addEventListener("click", () => {
    if (localVideo.srcObject == localStream) {
      videoOff();
    }
    if (localVideo.srcObject == null) {
      videoOn();
    }
  });
})();
