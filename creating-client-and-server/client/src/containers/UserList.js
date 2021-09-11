import {Badge, Card, Typography, Icon, Drawer} from "antd";
import React, {useState} from "react";

const {Text} = Typography;


const UserList = (props) => {

    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState({});

    const showDrawer = (user) => {
        return () => {
            setUserData(user);
            setVisible(true);
        }
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <React.Fragment>
            <Card style={{height: "600px"}} title="Users" headStyle={{textAlign: "center"}}>
                <ul style={{listStyleType: "none", padding: "0",}}>
                    {
                        props.users.map((user, index) => {
                            if (user !== null) return <li style={{listStyleType: "none"}} key={index}>
                                <Badge status={(user.isOnline) ? "success" : "default"}/>
                                {(user.userName === props.name) ? <Text code>{props.name}</Text> :
                                    <Text>{user.userName}</Text>}
                                <Icon style={{paddingLeft: "5px", cursor: "pointer"}} type="info-circle"
                                      onClick={showDrawer(user)}/>
                            </li>;
                            else return null;
                        })
                    }
                </ul>
            </Card>
            <Drawer
                title={`Information about user: ${userData.userName}`}
                width={300}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <p>{`IP: ${userData.id}`}</p>
                <p>{`Country: ${userData.country}`}</p>
                <p>{`City: ${userData.city}`}</p>
                <p>{`Country Code: ${userData.countyCode}`}</p>
                <p>{`Online status: ${userData.isOnline}`}</p>
            </Drawer>
        </React.Fragment>
    )
};

export default UserList;