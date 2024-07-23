import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Navbar>
            <NavbarBrand href="#">
                <i className="bi bi-person-vcard"></i>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        {/* <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink> */}
                    </NavItem>
                    <NavItem>
                        {/* <NavLink to="/customers" className="nav-link" activeClassName="active">Customers</NavLink> */}
                    </NavItem>
                    <NavItem>
                        {/* <NavLink to="https://github.com/kevinmanavalan/CRM_APP" className="nav-link">
                            <i className="bi bi-github"></i>
                            GitHub
                        </NavLink> */}
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavBar;
