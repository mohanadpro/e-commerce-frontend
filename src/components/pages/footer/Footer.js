import React, { useEffect } from 'react'
import './Footer.css'
import { Nav } from 'react-bootstrap';

export const Footer = () => {
    const today = new Date();
    useEffect(()=>{
        
    },[])
  return (
    <div className="footer d-flex align-items-center justify-content-center">
     <span className='copy-right'> &copy; {today.getFullYear()}</span>
    <Nav>
      <Nav.Item>
        <Nav.Link eventKey="1" href="https://www.youtube.com/" target='blank' aria-label='youtube'>
          <i className='fa-brands fa-youtube youtube'></i>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="2" href='https://x.com/' target='blank' aria-label='twitter'>
          <i className="fa-brands fa-twitter twitter" color='#1DA1F2'></i>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="3" href='https://www.instagram.com/' target='blank' aria-label='instagram'>
          <i className="fa-brands fa-square-instagram instagram" color='#E4405F'></i>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="4" href='https://www.instagram.com/' target='blank' aria-label='facebook'>
          <i className="fa-brands fa-facebook facebook" color='#1877F2'></i>
        </Nav.Link>
      </Nav.Item>
    </Nav>
    </div>
  )
}
