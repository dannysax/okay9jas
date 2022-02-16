import React from "react";
 import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
 import userLoginReducer from "../reducers/userReducers";
 import {useSelector, useDispatch} from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";


 function Header(){
   const loginReducer = useSelector(state=>state.userLogin)
   const {userInfo} = loginReducer
   const dispatch = useDispatch()
   const handleLogout = (e) => {
     e.preventDefault()
     dispatch(logout())
   }
   return(
     <header>
  <Navbar bg="dark" variant="dark" color="blue">
    <Container>
    <Navbar.Brand href="/">9jaOk</Navbar.Brand>
    <SearchBox />
    <Nav className="me-auto">
      <Nav.Link href="/cart/"><i className="fas fa-cart-plus mr-1"></i>Cart</Nav.Link>
    {
      userInfo ? (  
        <Nav>    
          <Nav.Link>
            {userInfo.name}
          </Nav.Link>
          <Nav.Link href="" type = "submit" onClick = {handleLogout}>Logout</Nav.Link>
          <Nav.Link href="/profile/"><i className="fas fa-user"></i>Profile</Nav.Link>
          <Nav.Link href="/shipping/"><i className="fas fa-use"></i>Shipping</Nav.Link>
          </Nav>
        
      ) : (
        <Nav>
          <Nav.Link href="/login/"><i className="fas fa-user"></i>Login</Nav.Link> 
          <Nav.Link href="/register/"><i className="fas fa-user"></i>Register</Nav.Link>
          </Nav> 
      )
    }
    </Nav>
    </Container>
  </Navbar>
     </header>
   )
 }
 export default Header;