const
    {Server} = require("socket.io"),
    server = new Server(7000);

let sequenceNumberByClient = new Map();

server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

    socket.on("message", (msg) => {
        console.log(`Client sent a message: `, msg);
        socket.emit("msgRecieved", msg);
    })
});