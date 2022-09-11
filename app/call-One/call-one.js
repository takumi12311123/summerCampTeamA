const Peer = window.Peer;
const remoteStream = getElementById("js-remote-stream");
const localStream = getElementById("js-local-stream");
const remoteId = getElementById("js-remote-id");
const localId = document.getElementById("js-local-id");
const callTrigger = getElementById("js-call-trigger");
const closeTrigger = getElementById("js-close-trigger");
const meta = getElementById("js-meta");

const peer = (window.peer = new Peer({
  key: window.__SKYWAY_KEY__,
  debug: 3,
}));

callTrigger.addEventListener("click", () => {
  if (!peer.open) {
    return;
  }
  const localId = getElementById("js-local-id");
  const call = peer.call(localId.value, localStream);
  closeTrigger.addEventListener("click", () => mediaConnection.close(true));
});

peer.on("error", (error) => {
  console.log(`${error.type}: ${error.message}`);
  // => room-error: Room name must be defined.
});
