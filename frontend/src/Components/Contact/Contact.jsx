import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Contact.css'



function Contact() {
  return (
    <div className='contact'>
      <Container className='section_p1'>
      <h1 className='section_head'>Contact Us</h1>

      <Form>
      <Row>
        <Col>
          <Form.Control placeholder="First name" className='my-3' />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" className='my-3'/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control placeholder="Email" className='my-3'/>
        </Col>
        <Col>
          <Form.Control placeholder="Phone" className='my-3'/>
        </Col>
      </Row>
      <Col>
      <Form.Control placeholder="Message" as="textarea" rows={4} className='my-3'  />

      </Col>
      <Button className='sendbtn' type="submit">
        Send Message
      </Button>
    </Form>
      </Container>
    </div>
  )
}

export default Contact
