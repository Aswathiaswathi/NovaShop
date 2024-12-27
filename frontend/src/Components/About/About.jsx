import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import about from '../../assets/about.jpg'
import './About.css'


function About() {
  return (
   <Container className='section_p1'>
    <h1 className='section_head'>About Us</h1>
    <Row>
    <Col className='about_content'>Welcome to <b>NovaShop</b> – Your One-Stop Destination for Cutting-Edge Electronics!
    Welcome to NovaShop – Your Ultimate Destination for Electronic Gadgets!

At NovaShop, we bring you the latest and most innovative electronic gadgets at unbeatable prices. From cutting-edge smartphones and powerful laptops to smart home devices and premium audio accessories, NovaShop is your trusted partner in tech.

With a commitment to quality, secure shopping, and exceptional customer service, we ensure a seamless and satisfying experience for all your electronic needs. Explore our wide range of products and stay ahead with NovaShop!

Shop Smart. Shop Nova.
</Col>
 <Col><img src={about} alt="" height={350} width={400}/></Col>
    </Row>
   </Container>
  )
}

export default About
