import React from "react";
// import {NavLink} from 'react-router-dom'
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import Cart from "./Cart/Cart";

const NavMenu = () => {

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            SpaReduxDotNet
          </NavbarBrand>
          <NavbarToggler className="mr-2" />
          <NavItem className="navbar-nav flex-grow align-items-center">
            <NavLink tag={Link} to="/Products">
              Products
            </NavLink>
          </NavItem>
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
            <ul className="navbar-nav flex-grow align-items-center">
              <NavItem>
                <NavLink tag={Link} to="/Cart">
                  <Cart />
                  <i className="bi bi-basket-fill fs-4"></i>
                </NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;
