const Peer = window.Peer;
async function main() {
  const localVideo = getElementById("js-local-stream");
  const roomMode = getElementById("js-room-mode");
  const roomId = getElementById("js-room-id");
  const joinTrigger = getElementById("js-join-trigger");
  const leaveTrigger = getElementById("js-leave-trigger");
  const remoteVideos = getElementById("js-remote-streams");
  const messages = getElementById("js-messages");
  const localText = getElementById("js-local-text");
  const sendTrigger = getElementById("js-send-trigger");
  const meta = getElementById("js-meta");

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

  peer.once("open", (id) => (localId.textContent = id));
  peer.on("error", console.error);
}
