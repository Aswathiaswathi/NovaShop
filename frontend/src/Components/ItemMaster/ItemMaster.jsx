import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';



function ItemMaster() {
    const [formData, setFormData] = useState({
        item_name: "",        // ID of the selected item
        description: "",
        has_expiry: false,
        has_entry_number: false,
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // POST request to create a new GoodsIn entry
          const response = await axios.post("http://localhost:8000/api/items/", formData);
          console.log("Item added:", response.data);
          alert("Item added successfully!");
        //   navigate('/product')
          
        } catch (error) {
          console.error("Error adding item:", error.response.data);
          alert("Error adding item!");
        }
      };
    

  return (
    
    <div>
        <Container className='section_p1'>
            <h1 className='section_head'>Item Master</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Item Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="" name='item_name' value={formData.item_name} onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Description
        </Form.Label>
        <Col sm={10}>
        <Form.Control as="textarea" rows={3} name='description' value={formData.description} onChange={handleChange}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Has Expiry
        </Form.Label>
        <Col sm={10}>
        <Form.Check aria-label="option 1" name='has_expiry' value={formData.has_expiry} onChange={handleChange}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Has Entry Number
        </Form.Label>
        <Col sm={10}>
        <Form.Check aria-label="option 1" name='has_entry_number' value={formData.has_entry_number} onChange={handleChange}/>
        </Col>
      </Form.Group>
      
      <button type="submit" className='sendbtn'>Add Item</button>

    </Form>
        </Container>
      
    </div>
  )
}

export default ItemMaster
