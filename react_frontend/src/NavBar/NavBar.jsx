import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem } from "reactstrap";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-3">
            <Navbar  container="fluid" expand="md" color="dark" dark rounded>
                <NavbarBrand>
                    <NavLink to="/" className="nav-link" activeclassname="active">
                        CRM_APP
                    </NavLink>
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
                    <NavbarText>
                        <button class="btn btn-secondary">
                            v1.0.1
                        </button>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;
