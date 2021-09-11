import ChatRooms from '../components/ChatRooms';
import FormUsernameLogic from  '../containers/FormUsernameLogic';

  export default [
      { path: "/", exact: true, Component: FormUsernameLogic },
      { path: "/chat", Component: ChatRooms }
  ];