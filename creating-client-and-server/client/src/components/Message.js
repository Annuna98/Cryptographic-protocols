import React from 'react';
import { Card, Comment } from 'antd';
import "antd/dist/antd.css";

function Message(props) {
    return (
        <Card size="small" bodyStyle={{padding: 5}}>
            <Comment {...props}/>
        </Card>
    );
}

export default Message;