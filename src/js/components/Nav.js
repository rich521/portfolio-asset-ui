import React from "react";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from "react-bootstrap";

export default class TopNav extends React.Component {
    render() {
        return (
            // Navbar --> header for title & menu items for navigation
            <Navbar inverse collapseOnSelect fixedTop>
            <Navbar.Header>
                <Navbar.Brand>Asset Portfolio</Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav class="side-nav">
                <IndexLinkContainer to="/"><NavItem><i class="glyphicon glyphicon-dashboard"></i> Overview</NavItem></IndexLinkContainer>
                <LinkContainer to="mapView"><NavItem><i class="glyphicon glyphicon-map-marker"></i> Portfolio</NavItem></LinkContainer>
                  <NavDropdown eventKey={3} title="Portfolios" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Portfolio 1</MenuItem>
                    <MenuItem eventKey={3.2}>Portfolio 2</MenuItem>
                    <MenuItem eventKey={3.3}>Portfolio 3</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>
                <LinkContainer to="metricView"><NavItem><i class="glyphicon glyphicon-stats"></i> Metric View</NavItem></LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}
