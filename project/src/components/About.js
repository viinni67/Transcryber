import React from 'react'
import { useState, useEffect } from 'react'
import '../compCSS/About.css'
const About = (props) => {
  props.funcnav(true)

  useEffect(() => {
    const backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJCFHZMVZoVmpCW0LZliKiQ05RBvUnkKyZ8A&usqp=CAU)';
    document.body.style.backgroundImage = backgroundImage;

    // Clean up the background image when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);





  return (
    <>
    
    <div id='body'>

      <div class="credit-roll">


        <div class="credits">
          <h1 id='about' >
            Transcriber
          </h1>
          <h3 >1.Shourya Tyagi [2101730013] </h3>
          <h3 >2.Vineet Verma [2101730035] </h3>
          <h3 >3.Harshit Chauhan [2101730024] </h3>
          <h3>4.Shivam Sharma [2101730048] </h3>

          <h4>React Lorem Ipsum is a (TypeScript-supported) React library including components and functions to generate placeholder text.

            DEMO & USAGE

            USAGE IN A LOREM IPSUM GENERATOR

            When you develop a mockup page or backend API is not ready for data fetching and you have to make Frontend Development with static data until it comes, react-lorem-ipsum will create your gibberish texts for you.

            In addition to Lorem Ipsum text, you can generate random avatars, names, surnames, full names and usernames to fill the fields about users randomly.

            👍 React Lorem Ipsum is a zero-dependency, easy-to-use package.</h4>

            


        </div>
      </div>

    
   


    // </div>
    </>
  )
}

export default About