const Peer = window.Peer;
(async function main() {
  const remoteVideo = document.getElementById("js-remote-stream");
  const localVideo = document.getElementById("js-local-stream");
  const remoteId = document.getElementById("js-remote-id");
  const localId = document.getElementById("js-local-id");
  const callTrigger = document.getElementById("js-call-trigger");
  const closeTrigger = document.getElementById("js-close-trigger");
  const meta = document.getElementById("js-meta");

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
    });

    closeTrigger.addEventListener("click", () => mediaConnection.close(true));
  });

  peer.once("open", (id) => (localId.textContent = id));
  peer.on("error", console.error);
  const muteButton = document.getElementById("~");

  muteButton.addEventListener("click", () => {});
})();
