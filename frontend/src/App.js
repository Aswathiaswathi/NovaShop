import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Product from './Components/Product/Product';
import NewProduct from './Components/NewProduct/NewProduct';
import Contact from './Components/Contact/Contact';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import About from './Components/About/About';
import Footer from './Components/Footer/Footer';
import ItemMaster from './Components/ItemMaster/ItemMaster';
import StockReport from './Components/StockReport/StockReport';
import GoodsOut from './Components/GoodsOut/GoodsOut';


function App() {
  return (
    <div>
      <Router>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/product' element={<Product/>}></Route>
            <Route path='/newproduct' element={<NewProduct/>}></Route>
            <Route path='/itemmaster' element={<ItemMaster/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/stockreport' element={<StockReport/>}></Route>
            <Route path='/goodsout' element={<GoodsOut/>}></Route>
          </Routes>
         <Footer/>
      </Router>
    </div>
  );
}

export default App;
