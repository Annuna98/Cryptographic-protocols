import React from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainLayout from "../containers/MainLayout";

const App = () => {

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path='/' component={MainLayout}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
};


export default App;
