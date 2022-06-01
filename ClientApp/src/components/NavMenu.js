import React from 'react';
// import {NavLink} from 'react-router-dom'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem,NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu=()=> {

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">SpaReactDotNet</NavbarBrand>
            <NavbarToggler  className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse"  navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link}   to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link}  to="/Users">Users</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link}   to="/Posts">Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link}   to="/Todos">Todos</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  
}

export default NavMenu;
