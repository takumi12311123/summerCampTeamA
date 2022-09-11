const Peer = window.Peer;

async function main() {
  const localVideo = document.getElementById("js-local-stream");
  const roomMode = document.getElementById("js-room-mode");
  const roomId = document.getElementById("js-room-id");
  const joinTrigger = document.getElementById("js-join-trigger");
  const leaveTrigger = document.getElementById("js-leave-trigger");
  const remoteVideos = document.getElementById("js-remote-streams");
  const messages = document.getElementById("js-messages");
  const localText = document.getElementById("js-local-text");
  const sendTrigger = document.getElementById("js-send-trigger");
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

  peer.once("open", (id) => (localId.textContent = id));
  peer.on("error", console.error);
}
