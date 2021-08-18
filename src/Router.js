import { Menu } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Config from "./components/Config";

const MenuRouter = () => {
    return (

        <Switch>
            <Route path='/config' component={Config}></Route>
            <Route path='/monitor' component={Config}></Route>
        </Switch>
    );
}

export default MenuRouter;