export const SET_USERNAME = 'SET_USERNAME';
export const ADD_ROOM = 'ADD_ROOM';
export const ADD_MSG_TO_ROOM = 'ADD_MSG_TO_ROOM';
export const ADD_USERS_TO_ROOM = 'ADD_USER_TO_ROOM';
export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const CLEAR_ROOMS = 'CLEAR_ROOMS';

export function setUsernameAction(username) {
    return {
        type: SET_USERNAME,
        payload: username
    }
}

export function addRoomAction(room) {
    return {
        type: ADD_ROOM,
        payload: room
    }
}

export function addMsgToRoomAction(msg, roomName) {
    return {
        type: ADD_MSG_TO_ROOM,
        payload: {msg, roomName}
    }
}

export function addUsersToRoomAction(users, roomName) {
    return {
        type: ADD_USERS_TO_ROOM,
        payload: {users, roomName}
    }
}

export function clearRooms() {
    return {
        type: CLEAR_ROOMS
    }
}

export function connectToSocketAction(socket) {
    return {
        type: CONNECT_SOCKET,
        payload: socket
    }
}

