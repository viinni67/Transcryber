import React ,{useState,useEffect} from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Start from './components/Start';
import Transcript from './components/Transcript';
import './compCSS/main.css'

function App() {
  const[show,setshow]=useState(true)
  
 
  
  return (
    <div className='main'>
      

      <BrowserRouter>
      
        {show && 
         <Navbar/>}
        <Routes>
         <Route exact path="/" element={<Start funcnav={setshow}/> }/>
          <Route exact path="/home" element={<Home  funcnav={setshow}/>}/>
          <Route exact path="/about" element={<About  funcnav={setshow}/>} />
          <Route exact path="/trans" element={<Transcript funcnav={setshow}/>}/>

        </Routes>

      </BrowserRouter>
      
  </div>
  );
}

export default App;
