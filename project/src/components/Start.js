import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../compCSS/Start.css'
const Start = (props) => {
    const [currentLine, setCurrentLine] = useState(0);


    const lines = [
        'Text-to-handwritten AI models are AI-powered tools that can convert digital',
        'text into a handwritten or cursive style. These models employ machine learning.',
        'techniques to analyze and replicate various handwriting styles, offering users',
        'preferences. They have versatile applications in graphic design, marketing,',
        'style. Despite their convenience, these models face challenges in creating convincing',
        'convenience, these models face challenges in creating convincing and natural-looking ',
        'handwriting. It is crucial to use text-to-handwritten AI responsibly to avoid misuse, such as ',
        'creating forged content. These models can accommodate various languages and scripts, ',
        'making them suitable for a global audience, but users should also be mindful of privacy and '

    ];
    useEffect(() => {
        const lineCount = lines.length;
        if (currentLine < lineCount) {
            const timeout = setTimeout(() => {
                setCurrentLine(currentLine + 1);
            }, 2000); // Change the delay time as needed
            return () => clearTimeout(timeout);
        }
    }, [currentLine]);



    props.funcnav(false)
    const Navigate = useNavigate();
    const url="C:\Users\User\Downloads\wallpaperflare.com_wallpaper-2.jpg"
    useEffect(() => {

        document.body.style.backgroundImage = 'url(https://pub-static.fotor.com/assets/bg/83ff74b6-f4cd-4efc-8bee-0c652905e265.png)';
        // Clean up the background image when the component unmounts
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);


    const start = () => {
        Navigate('/home')

    }

    return (
        <>
            <div  id='headline' className='my-3'>
                <h1>Text to handwritten </h1>

            </div>
            <div className='centered-content'>
            <div className="typing-effect">
                {lines.slice(0, currentLine).map((line, index) => (
                    <p key={index} className="typed-text">
                        {line}
                    </p>
                ))}
            </div>
            <div className='button'>
            <a   href="/home" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md ">
                <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                <span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                    <span class="relative text-white">lets get started ➔  </span>
                </span>
            </a>
        </div>
        </div>
        </>
    )
}

export default Start