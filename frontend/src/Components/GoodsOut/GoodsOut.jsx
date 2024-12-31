import React,{useState,useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Container } from 'react-bootstrap';


function GoodsOut() {
          const [item,setItem]=useState("");
          const [quantity,setQuantity]=useState("");
          const [dateRemoved,setDateRemoved]=useState("");

          const [items, setItems] = useState([]);


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


          const handleGoodsOut = async (e) => {
            e.preventDefault(); 
            if (!quantity || quantity <= 0) {
              alert("Quantity must be a positive number.");
              return;
            }
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/goodsout/", {
                    item,
                    quantity:parseInt(quantity),
                    date_removed: dateRemoved,
                });
                alert(response.data.message || "Goods removed successfully!");
                setItem("");
                setQuantity("");
                setDateRemoved("");

            } catch (error) {
                console.error("Error removing goods:", error.response?.data || error.message);
                alert(error.response?.data?.error || "Failed to remove goods. Please try again.");
            }
        };
          return (
    <div>
           <Container className='section_p1'>
            <h1 className='section_head'>Goods Out</h1>
            <Form onSubmit={handleGoodsOut}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Item Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="select" value={item} name="item" onChange={(e)=>setItem(e.target.value)} required>
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

        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Quantity
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="number" placeholder="" name='quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Date Removed
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="date" placeholder="" name='dateRemoved' value={dateRemoved} onChange={(e)=>setDateRemoved(e.target.value)} />
        </Col>
      </Form.Group>

      
      <button type="submit" className='sendbtn'>GoodsOut</button>

    </Form>
        </Container>
      
      
    </div>
  )
}

export default GoodsOut
