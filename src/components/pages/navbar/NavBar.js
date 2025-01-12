import React from "react";
import { Navbar, Container, Nav, Dropdown} from "react-bootstrap";
import logo from "../../../assets/images/ebuy_logo.WebP";
import styles from "./NavBar.module.css";
import {  NavLink, useNavigate } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../../contexts/CurrentUserContext';
import Avatar from "../../pages/avatar/Avatar";
import axios from "axios";
import { Search } from "./Search";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const moveToProfilePage = (profile_id)=>{
    navigate('/profile/'+profile_id);
  }
  const moveToOrdersPage = (profile_id) =>{
    navigate('/orders/'+profile_id);
  }
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
    <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
        <Avatar src={currentUser?.profile_image} height={50} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
          <Dropdown.Item onClick={()=>moveToProfilePage(currentUser?.profile_id)}>
            <NavLink
              className={styles.NavLink}>
                {currentUser?.username}
            </NavLink>
          </Dropdown.Item>

        <Dropdown.Item onClick={()=>moveToOrdersPage(currentUser?.profile_id)}>
          <NavLink 
            className={styles.NavLink}
            >
            Orders
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSignOut}>  
          <NavLink
            className={styles.NavLink}
            >
              Signout
          </NavLink>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
  const loggedOutIcons = (
    <>
    <div className="d-flex justify-content-between">
      <NavLink style={{display:'inline-block'}}
        className={`${styles.NavLink} d-flex align-items-center`}
        to="/signin"
      >
       <div>  Sign in</div>
      </NavLink>
      <NavLink
        to="/signup" style={{display:'inline-block'}}
        className={`${styles.NavLink} d-flex align-items-center`}
      >
       <div> Sign up</div>
      </NavLink>
      </div>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">


      <Container>

        <NavLink to="/profile">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              className={`${styles.NavLink}   d-flex align-items-center`}
              to="/"
            >
              <i className={`${styles.Home} fas fa-home`}></i>
              
            </NavLink>
            <NavLink className={` d-flex align-items-center`} to='/cart'>
              <i className={`${styles.ShoppingCart} fa-solid fa-cart-shopping`} color="red"></i>
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>

        </Navbar.Collapse>
      <Search/>
      </Container>

    </Navbar>
  );
};

export default NavBar;