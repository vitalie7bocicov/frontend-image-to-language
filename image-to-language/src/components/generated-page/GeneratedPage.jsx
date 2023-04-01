import React, { useEffect, useState} from "react";
import Cookies from 'js-cookie';
import "./GeneratedPage.css";


export default function GeneratedPage() {
    const urlLabels = "http://localhost:8081/whatIS";
    const urlPronunciation = "http://localhost:8081/pronunciation";
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        fetch(urlLabels + "?lang=" + Cookies.get('lang'))
        .then(response => response.json())
        .then(data => setLabels(data))
        .catch(error => console.error(error));
    }, []);
    

    const playAudio = (text) => {
        console.log(Cookies.get('lang'));
        fetch(urlPronunciation + "?text=" + text + "&lang=" + Cookies.get('lang')) 
          .then(response => response.blob())
          .then(data => {
            const audio = new Audio(URL.createObjectURL(data));
            audio.play();
          })
          .catch(error => console.error(error));
      }

    return (
        <div className="container">
        <h1>Generated page</h1>
            <div className="divCols">
                <div>
                <h3>Image:</h3>
                <img src="https://www.tutorialspoint.com/assets/questions/media/426142-1668760872.png" alt="uploaded" />
                </div>
                <div>
                    <h3>Found words:</h3>
                    <ul type="none">
                        {labels.map((label) => (
                            <li key={label}>
                                <p></p>
                                <button className="labelButton" onClick={() => playAudio(label)}>{label}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
