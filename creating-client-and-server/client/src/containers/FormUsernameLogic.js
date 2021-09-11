import React from 'react';
import axios from 'axios';
import {connectToSocketAction, setUsernameAction} from "../actions/ChatActions";
import {connect} from "react-redux";
import io from "socket.io-client";
import FormUsername from "../components/FormUsername";
import { notification } from 'antd';

class FormUsernameLogic extends React.Component {

    componentDidMount() {
        if(this.props.socket !== null) {
            this.props.socket.disconnect();
        }
    }

    connectionToServer = (values) => {
        console.log('Received values of form: ', values.username);
        axios.get('http://www.geoplugin.net/json.gp').then(res => {
            const userInfo = {
                userName: values.username,
                id: res.data.geoplugin_request,
                city: res.data.geoplugin_city,
                country: res.data.geoplugin_countryName,
                countyCode: res.data.geoplugin_countryCode,
            };
            this.props.setUsername(userInfo.userName);
            this.props.setSocket(io("http://localhost:4000"));

            this.props.socket.on('disconnect', () => {
                this.props.history.push("/");
                notification['error']({
                    message: 'Wrong Username!',
                    description:
                        'User in chat already use this Nickname. Please change the name!',
                    placement: 'topLeft'
                });
            });
            this.props.socket.on('login_success', () => {
                notification['success']({
                    message: `Hello, ${this.props.userName} :)`,
                    description:
                        'You successfully join to the chat! Let\'s start chatting',
                    placement: 'topLeft',
                });
            });

            this.props.socket.emit('new_user', userInfo);

            this.props.history.push('/chat');
        });
    };

    render() {
        return (
            <FormUsername successValidation={this.connectionToServer}/>
        )
    }
}

const mapStateToProps = store => {
    return {
        userName: store.chat.userName,
        socket: store.chat.socket,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUsername: username => dispatch(setUsernameAction(username)),
        setSocket: socket => dispatch(connectToSocketAction(socket))
    }

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormUsernameLogic);