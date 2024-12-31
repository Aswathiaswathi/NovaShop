import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './StockReport.css';


function StockReport() {
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedItems,setSelectedItems]=useState(null);
    const [goodsInData,setGoodsInData]=useState()

    const handleClose = () => {
        setShow(false)
        setSelectedItems(null)
    };
    const handleShow = (item) => {
        setSelectedItems(item)
        setShow(true)};

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/stock/") // Adjust URL to match your API
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
      });
  }, []);
  return (
    <div id='stockreport'>
        <Container className='section_p1'>
        <h1 className='section_head'>Stock Details</h1>

       <Table striped bordered hover>
      <thead>
        <tr style={{backgroundColor:'#104c70',color:'#fff'}}>
          <th>Item Name</th>
          <th>Description</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {
            items.map((item=>(
                <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>{item.description}</td>
                <td> <a href="#" className='tablelink' onClick={(e)=>{e.preventDefault();handleShow(item)}}>{Math.max(item.stock, 0)} </a> </td>
        </tr>
            )))
        }
      </tbody>
    </Table>

{selectedItems && (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='modalTitle'>Item Details : {selectedItems.item_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>GoodsIn : {selectedItems.goods_in||"Not available"}
            
            <br/>GoodsOut : {selectedItems.goods_out||"Not available"}<br/>
        Stock : {selectedItems.stock}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
)}
    
    </Container>
    </div>
  )
}

export default StockReport
