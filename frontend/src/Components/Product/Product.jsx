import React, { useEffect, useState } from "react";
import axios from "axios";
import './Product.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Footer from "../Footer/Footer";


function Product() {
    const [goodsInItems, setGoodsInItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [goodsInData, setGoodsInData] = useState([]);
    const [showEditModal,setShowEditModal]=useState(false);
    const [editFormData,setEditFormData]=useState({
      id:"",item:"",quantity:"",expiry_date:"",entry_number:"",date_added:"",
    });

    useEffect(() => {
      const fetchGoodsIn = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/goodsin/");
          setGoodsInItems(response.data);
        } catch (err) {
          setError("Error fetching data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchGoodsIn();
    }, []);
  

    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8000/api/goodsin/${id}/`);
          console.log(response.data); // Log the success message
          alert("Item deleted successfully!");
    
          // Update the state to reflect the item deletion
          setGoodsInItems(goodsInItems.filter(item => item.id !== id));
        } catch (error) {
          console.error("Error deleting item:", error.response.data);
        }
      };

const handleEditClick=(item)=>{
  setEditFormData(item);
  setShowEditModal(true);
};

const handleEditFormChange=(e)=>{
  setEditFormData({...editFormData,[e.target.name]:e.target.value})
}


const handleEditSubmit=async(e)=>{
  e.preventDefault();

  try{
    const{id,...updatedData}=editFormData;
    await axios.put(`http://localhost:8000/api/goodsin/${id}/`,updatedData);
    alert("Item updated Successfully!");
    setGoodsInItems(goodsInItems.map(item=>
    item.id===id?{...item, ...updatedData}:item
    ));
    setShowEditModal(false);
  }catch(error){
  
      console.error("Error updating item:",error.response?.data||error.message);

    }
  }





    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div>
    <Container className="section_p1">
      <h1 className="section_head">Products</h1>
     <Row>
            {
        goodsInItems.map((item)=>(
          <Col lg={3} md={4} sm={6}>
          <Card style={{ width: '17rem',border:'1px solid #104c70' }} key={item.id} className="mb-3">
          <Card.Body>
            <Card.Title>{item.item_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Quantity : {item.quantity}</Card.Subtitle>
            <Card.Text> Expiry Date : {item.expiry_date} </Card.Text>
            <Card.Text> Entry Number : {item.entry_number} </Card.Text>
            <Card.Text>Date Added :{new Date(item.date_added).toISOString().split('T')[0]}  </Card.Text>

            <Card.Link href="#"><Button className="editbtn" onClick={() => handleEditClick(item)}>Edit</Button></Card.Link>
            <Card.Link href="#"><Button variant="danger" onClick={()=>handleDelete(item.id)}>Delete</Button></Card.Link>
          </Card.Body>
        </Card>
        </Col>
        ))
      }
      </Row>


{/* Edit Modal */}
<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group controlId="item">
                            <Form.Label>Item</Form.Label>
                            <Form.Control
                                type="text"
                                name="item"
                                value={editFormData.item_name}
                                onChange={handleEditFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={editFormData.quantity}
                                onChange={handleEditFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="expiry_date">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="expiry_date"
                                value={editFormData.expiry_date}
                                onChange={handleEditFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="entry_number">
                            <Form.Label>Entry Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="entry_number"
                                value={editFormData.entry_number}
                                onChange={handleEditFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="date_added">
                            <Form.Label>Date Added</Form.Label>
                            <Form.Control
                                type="date"
                                name="date_added"
                                value={editFormData.date_added}
                                onChange={handleEditFormChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

    </Container>
    <Footer/>

    </div>
  )
}

export default Product
