const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 4000;
server.listen(port);
console.log('App is listening on port ' + port);

const users={};
const rooms={};
rooms['public'] = {
    messages: [],
    users: []
};


const getTimeNow = () => {
    let time = new Date(Date.now());
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
};

const addMessageToRoom = (roomName, msg, userName) => {
    rooms[roomName].messages = [...rooms[roomName].messages, {text: msg, userName: userName, formatTime: getTimeNow()}];
    io.to(roomName).emit('get_new_msg', {
        room: roomName,
        messages: rooms[roomName].messages
    })
};

const getRooms = (userName) => {
    return Object.keys(rooms).map((key) => {
        if (rooms[key].users.includes(userName)) {
            return {
                [key]: {...rooms[key], users: rooms[key].users.map((userName) => users[userName])}
            }
        }
    });
};

const getUsersInRoom = (roomName) => {
    io.to(roomName).emit('get_users_in_room', {
        room: roomName,
        users: rooms[roomName].users.map((userName) => users[userName])
})
};

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('new_user', user => {
        if(user.userName in users) {
            if (users[user.userName].isOnline)
            {
                socket.disconnect();
            } else {
                socket.emit('login_success');
                users[user.userName].isOnline = true;
                socket.user = users[user.userName];
                Object.keys(rooms).forEach((key) => {
                    if(rooms[key].users.includes(user.userName)) {
                        socket.join(key, () => {
                            addMessageToRoom(key, `User ${user.userName} now is Online!`, 'ChatBot');
                            getUsersInRoom(key);
                        })
                    }
                });
            }
        } else {
            socket.emit('login_success');
            user.isOnline = true;
            users[user.userName] = user;
            socket.user = user;
            rooms['public'].users.push(user.userName);
            socket.join('public', () => {
                addMessageToRoom('public', `User ${user.userName} join to chat!`, 'ChatBot');
                getUsersInRoom('public');
            });
        }
    });

    socket.on('create_new_room', roomName => {
        if (roomName in rooms) {
            if (!rooms[roomName].users.includes(socket.user.userName)) {
                rooms[roomName].users.push(socket.user.userName);
            } else return;
        } else {
            rooms[roomName] = {
                messages: [],
                users: [socket.user.userName]
            };
        }
        socket.join(roomName, () => {
            addMessageToRoom(roomName, `User ${socket.user.userName} join to chat!`, 'ChatBot');
            getUsersInRoom(roomName);
        });
    });

    socket.on('close_room', roomName => {
        if (roomName in rooms) {
            rooms[roomName].users = rooms[roomName].users.filter((userName) => {
                return (userName !== socket.user.userName);
            });
            socket.leave(roomName);
            socket.emit('rooms', getRooms(socket.user.userName));
            addMessageToRoom(roomName, `User ${socket.user.userName} left the room!`, 'ChatBot');
            getUsersInRoom(roomName);
            if(rooms[roomName].users.length === 0) {
                delete rooms[roomName]
            }
        }
    });

    socket.on('get_rooms', userName => {
        socket.emit('rooms', getRooms(userName))
    });

    socket.on('send_new_msg', (msgData) => {
        addMessageToRoom(msgData.roomName, msgData.msg, socket.user.userName);
    });

    socket.on('disconnect', function(){
        if (socket.user !== undefined)
        {
            users[socket.user.userName].isOnline = false;
            Object.keys(rooms).forEach((key) => {
                if(rooms[key].users.includes(socket.user.userName)) {
                    addMessageToRoom(key, `User ${socket.user.userName} go offline!`, 'ChatBot');
                    getUsersInRoom(key);
                }
            });
        }
        console.log('user disconnected');
    });
});
