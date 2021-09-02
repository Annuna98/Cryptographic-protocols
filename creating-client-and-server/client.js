const
    io = require("socket.io-client"),
    socket = io.connect("http://localhost:7000");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Type a text to send to server: ', (msg) => {
    socket.emit("message", msg)
});

socket.on("msgRecieved", (msg) => console.log('Сообщение ', msg, ' получено сервером'));