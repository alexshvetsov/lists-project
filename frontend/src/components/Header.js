import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

import {
    Navbar, Nav, Container, NavDropdown,
} from 'react-bootstrap'

const Header = ({history}) => {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        history.push('/')
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >Lister</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/shoppingList'>
                                <Nav.Link ><i className='fas fa-shopping-cart mr-1'></i>shopping List</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/lists'>
                                <Nav.Link ><i className='fas fa-list mr-1'></i>Lists</Nav.Link> 
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                             
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link ><i className='fas fa-user pr-2'></i>Sign in</Nav.Link>
                                    </LinkContainer>
                                        <Navbar.Text >|</Navbar.Text>
                                    <LinkContainer to='/register'>
                                        <Nav.Link ><i className='fas fa-user pr-2'></i>Sign up</Nav.Link>
                                    </LinkContainer>
                                </>
                            }

                        </Nav>

                    </Navbar.Collapse>
                </Container>

            </Navbar >
        </header >
    )
}

export default Header
