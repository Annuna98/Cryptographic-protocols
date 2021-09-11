import React, { useEffect, useState } from 'react';
import {connect} from "react-redux";
import Room from "./Room";
import { notification, Tabs } from "antd";
import {
    addMsgToRoomAction,
    addRoomAction,
    addUsersToRoomAction, clearRooms,
} from "../actions/ChatActions";
import TabModalAction from "../containers/TabModalAction";
const { TabPane } = Tabs;

const ChatRooms = (props) => {


    const [activeKey, setActiveKey] = useState(Object.keys(props.rooms)[0]);


    useEffect(() => {
        console.log(`UseEffect --- 1`);

        if (props.socket === null) {
            props.history.push("/");
            return
        }

        props.socket.on('get_new_msg', msgDate => {
            if(msgDate != null){
                console.log(msgDate);
                props.addMessageToRoom(msgDate.messages, msgDate.room);
            }
        });

        props.socket.on('rooms', rooms => {
            if(rooms != null) {
                props.clearRooms();
                rooms.forEach((room) =>{
                    props.addRoom(room);
                });
                setActiveKey('public');
            }
        });

        props.socket.emit('get_rooms', props.userName);

        props.socket.on('get_users_in_room', roomData => {
            props.addUsersToRoom(roomData.users, roomData.room)
        });

    },[]);

    const sendMsg = (values, roomName) => {
        props.socket.emit('send_new_msg', {msg: values.inputMsg, roomName: roomName});
    };

    const onChange = activeKey => {
        setActiveKey(activeKey)
    };

    const onEdit = (targetKey, action) => {
        if(action === 'remove') {
            props.socket.emit('close_room', targetKey);
        }
    };



  return (
      <div>
          <Tabs
              hideAdd
              tabBarExtraContent={<TabModalAction socket={props.socket}/>}
              onChange={onChange}
              activeKey={activeKey}
              type="editable-card"
              onEdit={onEdit}
          >

              {Object.keys(props.rooms).map(key => (
                  <TabPane tab={key} key={key} closable={key !=='public'} >
                      <Room messages={props.rooms[key].messages} users={props.rooms[key].users} sendMsg={sendMsg} name={key}/>
                  </TabPane>
              ))}
          </Tabs>

      </div>


  )
};

const mapStateToProps = store => {
    return {
        userName: store.chat.userName,
        socket: store.chat.socket,
        rooms: store.chat.rooms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addRoom: room => dispatch(addRoomAction(room)),
        addUsersToRoom: (users, roomName) => dispatch(addUsersToRoomAction(users, roomName)),
        addMessageToRoom: (msg, roomName) => dispatch(addMsgToRoomAction(msg, roomName)),
        clearRooms: () => dispatch(clearRooms())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatRooms);