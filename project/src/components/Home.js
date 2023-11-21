import React, { useEffect, useState, setOut } from 'react'
import '../compCSS/textarea.css'
import '../compCSS/main.css'
import { useNavigate } from 'react-router-dom';
const Home = (props) => {





  //dropdown method

  const languages = [
    'hindi',
    'tamil',
    'gujrati',
    'bengali',
    'kannada',
    'odiya'
  ]
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || "english");
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const lang = selectedLanguage;


  const filteredLanguages = languages.filter(language =>
    language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowDropdown(false);
  };

  const [text, setText] = useState(localStorage.getItem('content') || "")

  //storage unit 

  useEffect(() => {
    localStorage.setItem('language', selectedLanguage)

  }, [selectedLanguage]);



  const data = text

  useEffect(() => {
    localStorage.setItem("content", data)

  }, [data]);











  const navigate = useNavigate();


  const Change = (e) => {
    setText(e.target.value)
  }


  ///







  const handleSubmit = async (e) => {
    if (text === "") {
      alert("text area is emty plz fill it ");
    }
    e.preventDefault();
    try {
      navigate("/trans")
      const res = await fetch("http://127.0.0.1:5000/members", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, lang }),
      });
      if (res) {
        const data = await res.json();
        console.log(data)
        setOut(data.text, data.lang);

      } else {
        console.error("Request failed");
      }





    } catch (error) {
      console.error('Error:', error);
    }






  };








  //navbar hider

  props.funcnav(true)




  return (
    <div>

      <form className=' '  >

        <div id='box' class="form-group shadow-textarea container ">
          <h1 className=" container  text-center my-1  ">
            Transcriber
          </h1>



          <textarea value={text} onChange={Change} className="form-control z-depth-1 shadow-lg" id="exampleFormControlTextarea6" rows="20" placeholder="Write something here..." required > </textarea>


          <div className='button-container my-6' id='submit1'>

            <button id='submission' onClick={handleSubmit} className='btn btn-success btn-lg '>Submit</button>
            {/* dropdown */}
            {showDropdown && (<div class=" dropdown-container input-group rounded mx-1"  >
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} class="form-control rounded custom-input  " id='input01' placeholder="Select your language " aria-label="Search" aria-describedby="search-addon" />
              <ul className="language-list">
                {filteredLanguages.map((language) => (
                  <li key={language} onClick={() => handleLanguageSelect(language)}>
                    <button > {language}  </button>
                  </li>
                ))}
              </ul>
            </div>)}
            <button onClick={() => setShowDropdown(!showDropdown)} type="button" id='select' className="btn btn-outline-light mx-2 btn-lg">
              {selectedLanguage || 'english'}
            </button>
            <button className="btn btn-outline-light btn-lg " id='clear'
              onClick={(e) => {
                e.preventDefault();
                setSelectedLanguage('');
                setSearchTerm('');
                setShowDropdown(false);
              }}
            >
              Clear
            </button>



          </div>


        </div>


      </form>



    </div>




  )
}

export default Home