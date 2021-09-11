import React, {useState} from "react";
import {Button, Modal, Input} from "antd";

const TabModalAction = (props) => {

    const [visible, setVisible] = useState(false);
    const [values, setValues] = useState({
        inputNewRoom: ''
    });

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        if (values.inputNewRoom === '') return;
        props.socket.emit('create_new_room', values.inputNewRoom);
        setValues({
            inputNewRoom: ''
        });
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
        setValues({
            inputNewRoom: ''
        });
    };

    const handleInputChange = (event) => {
        const {id, value} = event.target;
        setValues({...value, [id]:value})
    };

    return (
        <React.Fragment>
            <Button onClick={showModal}>
                Add/Join to room
            </Button>
            <Modal
                title="Add/Join to room"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
               <Input id="inputNewRoom" onChange={handleInputChange} value={values.inputNewRoom} placeholder="Please, Enter name your future room"/>
            </Modal>
        </React.Fragment>
    )

};

export default TabModalAction;