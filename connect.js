if ("WebSocket" in window) {
  var ws = new WebSocket("ws://danielhmoore.com:8180");
  ws.onopen = function() {
    // Web Socket is connected. You can send data by send() method.
    ws.send("message to send");
  };
  ws.onmessage = function (evt) { var received_msg = evt.data; };
  console.log(received_msg);
  ws.onclose = function() { console.log("WS Closed") };
} else {
  // the browser doesn't support WebSocket.
}