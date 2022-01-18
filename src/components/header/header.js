import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import './headerCSS.css';
import { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import Logo from '../../assets/Logo.png'




function Header() {

    const [isDesktop, setDesktop] = useState(window.innerWidth > 992);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 992);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });
    return(
        <>
            <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">
                <Container className='header-container'>
                    {isDesktop ? (
                        <Link to='/'>
                            <Navbar.Brand href="#home">
                                <img src={Logo} className="Header-logo" alt="logo" />
                            </Navbar.Brand>
                        </Link>
                    ) : (
                        <Link to='/'>
                            <Navbar.Brand className='headerLink' href="#home">
                                Roosterboards
                            </Navbar.Brand>
                        </Link>
                    )}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-lg-between'>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/AboutUs">
                                <div className='egg'></div>
                                About Us
                            </Nav.Link>
                            <Nav.Link as={Link} to="/Catalog">Products</Nav.Link>
                            <Nav.Link as={Link} to="/Test">Test</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
                            <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default Header;