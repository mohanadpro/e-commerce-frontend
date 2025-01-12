import React from "react";
import { Navbar, Container, Nav} from "react-bootstrap";
import logo from "../../../assets/images/ebuy_logo.WebP";
import styles from "./NavBar.module.css";
import {  NavLink } from "react-router-dom";
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

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
    <div>
      <NavLink
        className={styles.NavLink}
        to="/"
      >
        {currentUser?.username}
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to="/" onClick={handleSignOut}
      >
        Sign Out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profile/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} height={40} />
      </NavLink>
      </div>
    </>
  );
  const loggedOutIcons = (
    <>
    <div>
      <NavLink
        className={styles.NavLink}
        to="/signin"
      >
         Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
      >
        <i className="fas fa-user-plus"></i>Sign up
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
              className={styles.NavLink}
              to="/"
            >
              Home
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