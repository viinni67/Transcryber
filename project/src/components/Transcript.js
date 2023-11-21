import React, { useEffect } from 'react'
import { useState } from 'react';
const Transcript = (props) => {
  props.funcnav(true)

  // const[akc,setakc]=useState(true);
  // useEffect(() => {
  //   fetch('/your_flask_endpoint', {
  //     method: 'POST',
  //     // Include any necessary headers
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     // Include your request body
  //     body: JSON.stringify({
  //       key: 'value'
  //       // other key-value pairs
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     setData(data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }, []);





  const Download = () => {
    const imageFileName = 'output_sample.pdf'; // Replace with the actual image file name

    const downloadLink = document.createElement('a');
    downloadLink.href = process.env.PUBLIC_URL + '/' + imageFileName; // Use PUBLIC_URL
    downloadLink.download = imageFileName;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }


  return (
    <>
<div className=' my-5 container '>
<div class="d-flex justify-content-center align-items-center vh-50  p-8 card bg-dark container border border-bg-white pt-10"  style={{width: '50%'}} >
  <img src={process.env.PUBLIC_URL+"image.jpg"}  class="card-img-top" alt="..."/>
  <div class="card-body text-white  ">
    <h1 >Final Output </h1>
    <p class="  card-title text-white my-1">this is the pdf  file of your text content </p>
    <a  onClick={Download}  class="btn btn-primary  container " >Download</a>
  </div>
</div>




</div>














    </>




  )
}

export default Transcript