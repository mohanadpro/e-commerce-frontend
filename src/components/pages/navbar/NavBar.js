import React, { useEffect, useRef, useState } from "react";
import { Navbar, Container, Nav, Dropdown} from "react-bootstrap";
import logo from "../../../assets/images/ebuy_logo.WebP";
import styles from "./NavBar.module.css";
import {  NavLink, useNavigate } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../../contexts/CurrentUserContext';
import Avatar from "../../pages/avatar/Avatar";
import { Search } from "./Search";
import { useCart, useSetCart } from "../../../contexts/CartContext";
import toast from "react-hot-toast";
import { useSetAddress } from "../../../contexts/AddressContext";
import { Badge } from "@mui/material";
import { axiosRes } from "../../../api/axiosDefault";

const NavBar = () => {
  const Cart = useCart()
  const setCart = useSetCart()
  const currentUser = useCurrentUser();
  const setAddress = useSetAddress();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false)
  const ref = useRef();

  useEffect(()=>{
    const handleClickOutSide = e =>  {
      if(ref.current && !ref.current.contains(e.target)){
        setExpanded(false)
      }
    }
    document.addEventListener('mouseup', handleClickOutSide)
    return ()=>{
      document.removeEventListener("mouseup", handleClickOutSide)
    }
  },[ref])
  const moveToProfilePage = (profile_id)=>{
    navigate('/profile/'+profile_id);
  }
  const moveToOrdersPage = () =>{
    navigate('/orders/');
  }
  const moveToCartPage = (e) =>{
    e.preventDefault();
    if(Cart.length>0)
      if(currentUser!=null)
        navigate('/checkout');
      else
        navigate('/signin', {state:{ fromCart:'true' }});
    else{
      toast.error('You have put anything in the cart',{duration:2500})
    }
  }
  const handleSignOut = async () => {
    try {
      await axiosRes.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      setCart([])
      setAddress({})
      navigate('/products')
    } catch (err) {
    }
  };
  const cartIcon = (
    <>
    <NavLink className={` d-flex align-items-center`} onClick={moveToCartPage} aria-label="shopping cart">
      <Badge badgeContent={Cart.length} color="primary">
        <i className={`${styles.ShoppingCart} fa-solid fa-cart-shopping`} color="red"></i>
      </Badge>
    </NavLink>
  </>
  )
  const loggedInIcons = (
    <>
    <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
        <Avatar src={currentUser?.profile_image} height={50} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>moveToProfilePage(currentUser?.profile_id)} className={styles.NavLink}>
          {currentUser?.username}
        </Dropdown.Item>
        {currentUser && !currentUser.is_admin && <Dropdown.Item onClick={()=>moveToOrdersPage()} className={styles.NavLink}>
            Orders
        </Dropdown.Item> }
        <Dropdown.Item onClick={handleSignOut} className={styles.NavLink}>  
              Signout
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
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/products">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" aria-label="homepage"/>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" ref={ref} onClick={()=>setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              className={`${styles.NavLink}   d-flex align-items-center`}
              to="/products"
              aria-label="home"
            >
              <i className={`${styles.Home} fas fa-home`}></i>
              
            </NavLink>
            { (!currentUser || !currentUser.is_admin) && cartIcon  }
          </Nav>
        </Navbar.Collapse>
        {currentUser ? loggedInIcons : loggedOutIcons}
        { (!currentUser || !currentUser.is_admin) && <Search/> }
      </Container>

    </Navbar>
  );
};

export default NavBar;