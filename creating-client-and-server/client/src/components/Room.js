import React, { useState } from 'react';
import {connect} from "react-redux";
import { Row, Col, Input} from 'antd';
import MessagesTimeline from "../containers/MessagesTimeline";
import UserList from "../containers/UserList";

const {Search} = Input;



const Room = (props) => {

    const [values, setValues] = useState({
        inputMsg: ''
    });

    const handleInputChange = (event) => {
        const {id, value} = event.target;
        setValues({...value, [id]:value})
    };

    const handleSubmit = () => {
        if (values.inputMsg === '') return;
        setValues({
            inputMsg: ''
        });
        props.sendMsg(values, props.name);
    };

    return (
        <React.Fragment>
            <Row type="flex">
                <Col span={19}>
                    <div className="left-right-space">
                        <MessagesTimeline {...props}/>
                    </div>
                </Col>
                <Col span={5} className="left-right-space">
                    <div  className="left-right-space">
                        <UserList users={props.users} name={props.userName}/>
                    </div>
                </Col>
            </Row>
            <Row type="flex">
                <Col span={24}>
                    <div className="small-all-space">
                        <Search style={{width: "800px"}} onSearch={handleSubmit} enterButton="Send" size={"large"} id="inputMsg" value={values.inputMsg} onChange={handleInputChange}/>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = store => {
    return {
        userName: store.chat.userName,
    };
};

export default connect(
    mapStateToProps
)(Room);