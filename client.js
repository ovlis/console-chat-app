const readline = require("readline");
const socket = require("socket.io-client")("http://localhost:3000/");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
socket.on("connect", () => {
  rl.question("Please enter your username: ", username => {
    function readMessage() {
      rl.question("you: ", msg => {
        socket.emit("send_group_message", { username, msg });

        return readMessage();
      });
    }

    socket.on("group_message_sent", msg => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      console.log(`${msg.username}: ${msg.content}`);
    });

    readMessage();
  });
});
