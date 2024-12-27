import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import './Footer.css'



function Footer() {
  return (
    <div className='footer'>
      <Container className='section_p1' style={{'border-bottom': '2px solid #c2c2c2'}}
> 
        <Row>
            <Col><h3>NovaShop</h3>
            <p>At <b>NovaShop</b>, we are passionate about bringing the latest and greatest in electronic gadgets right to your doorstep. 
            Explore our wide range of products and stay ahead with NovaShop!
            </p>
            </Col>
            <Col><h3>Quick Links</h3>
                <ul className='links'>
                    <li>
                        <Link to="/" className='listitem' >Home</Link>  
                    </li>
                    <li>
                        <Link to="/about" className='listitem'>About</Link>
                    </li>
                    <li>
                        <Link to="/product" className='listitem'>Product</Link>
                    </li>
                    <li>
                        <Link to="/newproduct" className='listitem'>Add Product</Link>
                    </li>
                    <li>
                        <Link to="/contact" className='listitem'>Contact</Link>
                    </li>
                </ul>
             </Col>
            <Col><h3>Get In Touch</h3>
            <ul className='links'>
          <li>
            <p><i class="fa-solid fa-location-dot"></i> House of XYZ, Calicut, Kerala, India,ABCD Street, Calicut, Kerala  </p>
          </li>
          <li>
            <i class="fa-solid fa-envelope"></i>
            <a href="">userc@gmail.com</a>
          </li>
          <li>
            <i class="fa-solid fa-phone"></i>
            <a href="">9876543210</a>
          </li>
        </ul>
      
            </Col>


        </Row>
      </Container>
      <p className='copyright'>Copyright &copy; 2024 NovaShop. All Rights Reserved</p> 

    </div>
  )
}

export default Footer
