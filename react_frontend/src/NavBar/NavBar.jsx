import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Navbar  container="fluid" expand="md">
            <NavbarBrand href="#">
                CRM_APP
            </NavbarBrand>
            <NavbarToggler onClick={toggle} className="me-2"/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <NavLink to="/" className="nav-link" activeclassname="active">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/customerslisting" className="nav-link" activeclasscame="active">Customers</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="https://github.com/kevinmanavalan/CRM_APP" className="nav-link">
                            <i className="bi bi-github"></i>
                            GitHub
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        </div>
    );
};

export default NavBar;
