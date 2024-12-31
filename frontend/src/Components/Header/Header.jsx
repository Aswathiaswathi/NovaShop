import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import novashop_logo from '../../assets/novashop_logo.png';
import './Header.css'



function Header() {
  return (
    <div>
      <Navbar expand="lg" className="navbar">
   <Container>
     <Navbar.Brand href="/" className='navbrands' style={{'color':'#104c70','fontWeight':'500'}}> <img src={novashop_logo} alt="" width={80} /> NovaShop</Navbar.Brand>
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
     <Navbar.Collapse id="basic-navbar-nav">
       <Nav className="me-auto">
         <Nav.Link href="#home">
           <Link to="/" className='navitem'>Home</Link>  
         </Nav.Link>
         <Nav.Link href="#home">
           <Link to="/about" className='navitem'>About</Link>  
         </Nav.Link>
         <Nav.Link href="#home">
           <Link to="/product" className='navitem'>Products</Link>  
         </Nav.Link>
         <Nav.Link href="#home">
           <Link to="/newproduct" className='navitem'>Add Product</Link>  
         </Nav.Link>
         <Nav.Link href="#home">
           <Link to="/itemmaster" className='navitem'>Item Master</Link>  
         </Nav.Link>
         <Nav.Link href="#home">
           <Link to="/stockreport" className='navitem'>Stock Report</Link>  
         </Nav.Link>
         <Nav.Link href="#home">
           <Link to="/goodsout" className='navitem'>Goods Out</Link>  
         </Nav.Link>
         <Nav.Link href="#home">
           <Link to="/contact" className='navitem'>Contact</Link>  
         </Nav.Link>
       </Nav>
     </Navbar.Collapse>
   </Container>
 </Navbar>
    </div>
  )
}

export default Header
