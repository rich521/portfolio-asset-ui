import React from "react";
import { IndexLink, Link } from "react-router";

import Nav from "../components/Nav";

export default class Layout extends React.Component {
    render() {
        return (
            <div class="wrapper">
                <Nav/>
                {this.props.children}
            </div>
        );
    }
}
