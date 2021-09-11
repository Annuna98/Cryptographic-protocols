import {ADD_USERS_TO_ROOM, ADD_ROOM, ADD_MSG_TO_ROOM, SET_USERNAME, CONNECT_SOCKET, CLEAR_ROOMS} from "../actions/ChatActions";

const initialState = {
    userName: '',
    socket: null,
    rooms: {}
};

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state, userName: action.payload
            };
        case ADD_MSG_TO_ROOM:
            console.log(action.payload);
            return {
                ...state, rooms: {...state.rooms,
                [action.payload.roomName]:
                    {
                     ...state.rooms[action.payload.roomName],
                        messages: action.payload.msg
                    }
                }
            };
        case ADD_ROOM:
            return {
                ...state, rooms: {...state.rooms, ...action.payload}
            };
        case ADD_USERS_TO_ROOM:
            return {
                ...state, rooms: {...state.rooms,
                    [action.payload.roomName]:
                        {
                         ...state.rooms[action.payload.roomName],
                            users: action.payload.users
                        }
                }
            };
        case CLEAR_ROOMS:
            return {
                ...state, rooms: []
            };
        case CONNECT_SOCKET:
            return {
                ...state, socket: action.payload
            };
        default:
            return state;
    }
}