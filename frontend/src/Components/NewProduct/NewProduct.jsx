import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Footer from '../Footer/Footer';
import './NewProduct.css';
import { useNavigate } from 'react-router-dom';

function NewProduct() {
  const [formData, setFormData] = useState({
    item: "",        // ID of the selected item
    quantity: "",
    expiry_date: "",
    entry_number: "",
    date_added: "",
  });

  const [items, setItems] = useState([]);
  const navigate=useNavigate();


  // Fetch available items from the backend (GET request)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/items/");
        setItems(response.data); // Set the items state with fetched data
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to create a new GoodsIn entry
      const response = await axios.post("http://localhost:8000/api/goodsin/", formData);
      console.log("Item added:", response.data);
      alert("Item added successfully!");
      navigate('/product')
      
    } catch (error) {
      console.error("Error adding item:", error.response.data);
      alert("Error adding item!");
    }
  };

  return (
    <div className='addpro'>
    <Container className='section_p1'>
      <h1 className='section_head'>New Product</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupItem">
          <Form.Label>Item</Form.Label>
          <Form.Control as="select" value={formData.item} name="item" onChange={handleChange} required>
            <option value="">Select Item</option>
            {items.length > 0 ? (
              items.map(item => (
                <option key={item.id} value={item.id}>
                  {item.item_name}
                </option>
              ))
            ) : (
              <option value="">No items available</option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" value={formData.quantity} name="quantity" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupExpiryDate">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control type="date" value={formData.expiry_date} name="expiry_date" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEntryNumber">
          <Form.Label>Entry Number</Form.Label>
          <Form.Control type="text" value={formData.entry_number} name="entry_number" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupDateAdded">
          <Form.Label>Date Added</Form.Label>
          <Form.Control type="date" value={formData.date_added} name="date_added" onChange={handleChange} required />
        </Form.Group>

        <button type="submit" className='sendbtn'>Add Item</button>
      </Form>
    </Container>
    <Footer/>
    </div>
  );
}

export default NewProduct;
