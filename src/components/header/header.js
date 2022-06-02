import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import './headerCSS.css';
import { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import Logo from '../../assets/Logo.png'
import Basket from '../../assets/add-to-basket.png'
import User from '../../assets/user.png'




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
        <div className='header-body'>
            <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top">
                <Container className='header-container'>
                    {isDesktop ? (
                        <Link to='/'>
                            <Navbar.Brand>
                                <img src={Logo} className="Header-logo" alt="logo" />
                            </Navbar.Brand>
                        </Link>
                    ) : (
                        <Link className='rbLink' to='/'>
                            <Navbar.Brand className='headerLink' href="#home">
                                Roosterboards
                            </Navbar.Brand>
                        </Link>
                    )}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-lg-between'>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/AboutUs">
                                <div className='eggLink'>
                                    <div className='egg'></div>
                                    <div className='link-class'>About Us</div>
                                </div>
                            </Nav.Link>
                            <Nav.Link className='navEgg' as={Link} to="/Catalog">
                                <div className='eggLink'>
                                    <div className='egg'></div>
                                    <div className='link-class'>Products</div>
                                </div>
                            </Nav.Link>
                            <Nav.Link className='navEgg' as={Link} to="/TestKeeb">
                                <div className='eggLink'>
                                    <div className='egg'></div>
                                    <div className='link-class'>Test</div>
                                </div>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/Profile">
                                {isDesktop ? (
                                    <img src={User} alt='Basket' className='icon-class' />
                                ) : (
                                    <div className='link-class'>Profile</div>
                                )}
                            </Nav.Link>
                            <Nav.Link as={Link} to="/Cart">
                                {isDesktop ? (
                                    <img src={Basket} alt='Basket' className='icon-class' />
                                ) : (
                                    <div className='link-class'>Cart</div>
                                )}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Header;