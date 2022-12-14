const Peer = window.Peer;
(async function main() {
  let remoteVideo = document.getElementById("js-remote-stream");
  let localVideo = document.getElementById("js-local-stream");
  const localText = document.getElementById("js-local-text");
  const remoteId = document.getElementById("js-remote-id");
  const localId = document.getElementById("js-local-id");
  const callTrigger = document.getElementById("js-call-trigger");
  const closeTrigger = document.getElementById("js-close-trigger");
  const sendTrigger = document.getElementById("js-send-trigger");
  const messages = document.getElementById("js-messages");
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
    const dataConnection = peer.connect(remoteId.value);

    dataConnection.once("open", async () => {
      messages.textContent += `=== DataConnection has been opened ===\n`;

      sendTrigger.addEventListener("click", onClickSend);
    });

    dataConnection.on("data", (data) => {
      messages.textContent += `Remote: ${data}\n`;
    });

    dataConnection.once("close", () => {
      messages.textContent += `=== DataConnection has been closed ===\n`;
      sendTrigger.removeEventListener("click", onClickSend);
    });

    // Register closing handler
    closeTrigger.addEventListener("click", () => dataConnection.close(true), {
      once: true,
    });

    function onClickSend() {
      const data = localText.value;
      dataConnection.send(data);

      messages.textContent += `You: ${data}\n`;
      localText.value = "";
    }
  });

  peer.on("connection", (dataConnection) => {
    dataConnection.once("open", async () => {
      messages.textContent += `=== DataConnection has been opened ===\n`;

      sendTrigger.addEventListener("click", onClickSend);
    });

    dataConnection.on("data", (data) => {
      messages.textContent += `Remote: ${data}\n`;
    });

    dataConnection.once("close", () => {
      messages.textContent += `=== DataConnection has been closed ===\n`;
      sendTrigger.removeEventListener("click", onClickSend);
    });

    // Register closing handler
    closeTrigger.addEventListener("click", () => dataConnection.close(true), {
      once: true,
    });

    function onClickSend() {
      const data = localText.value;
      dataConnection.send(data);

      messages.textContent += `You: ${data}\n`;
      localText.value = "";
    }
  });

  closeTrigger.addEventListener("click", () => {
    localVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
    alert("?????????????????????");
  });

  // call????????????????????????
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
      // localVideo.srcObject = localStream;
      alert("?????????????????????");
    });

    closeTrigger.addEventListener("click", () => {
      mediaConnection.close(true);
      // localVideo.srcObject = localStream;
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

  peer.once("open", (id) => (localId.textContent = id));
  peer.on("error", (err) => console.log(err.massage));
})();
