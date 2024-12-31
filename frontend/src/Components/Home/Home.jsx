import React from 'react'
import './Home.css'
import home from '../../assets/home.jfif'
import About from '../About/About';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';
import {Link} from 'react-router-dom';


function Home() {
  return (
    <div>
        
    
 <div id='home'>
    <h1>Your One-Stop Shop for Everything You Need</h1>
    <h3>Explore Top Products at Unbeatable Prices</h3>
    <button><Link to="/product" className='navitem'>Get Started</Link>  
    </button>
 </div>
 <About/>
 <Contact/>
 </div>
  )
}

export default Home
