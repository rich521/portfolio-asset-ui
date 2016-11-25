import React from "react";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from "react-bootstrap";

import { connect } from "react-redux";
import * as socketActions from "../actions/socketActions";

@connect((store) => {
    return {
        fetchedCurrency: store.socket.fetchedCurrency,
        fetchedAssets: store.socket.fetchedAssets,
        assets: store.socket.assets,
    };
})


export default class TopNav extends React.Component {
    componentDidMount() {
        const { dispatch, fetchedAssets, fetchedCurrency } = this.props;
        if (!fetchedAssets) dispatch(socketActions.fetchAssets());
        if (!fetchedCurrency) dispatch(socketActions.fetchCurrency());
    }

    render() {
        const portFo = this.props.assets,
            keyObj = Object.keys(portFo);
        
        return (
            // Navbar --> header for title & menu items for navigation
            <Navbar inverse collapseOnSelect fixedTop>
            <Navbar.Header>
                <Navbar.Brand>Asset Portfolio</Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav class="side-nav">
                <IndexLinkContainer to="/"><NavItem><i class="glyphicon glyphicon-dashboard"></i> Overview DashBoard</NavItem></IndexLinkContainer>
                {keyObj.map((item, i) => {
                  const keyObjIn = Object.keys(portFo[item].assets);
                    return (
                    <NavDropdown title={item} id="basic-nav-dropdown" key={i}>
                        <MenuItem>Overview</MenuItem>
                        <MenuItem divider />
                      {keyObjIn.map((item2, i) => {
                        return (
                        <MenuItem key={i}>{item2}</MenuItem>
                        );
                      })}
                    </NavDropdown>
                    );
                })}
                <LinkContainer to="metricView"><NavItem><i class="glyphicon glyphicon-stats"></i> All Transactions</NavItem></LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}
