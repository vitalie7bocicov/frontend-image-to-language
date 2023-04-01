import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./GeneratedPage.css";

export default function GeneratedPage() {
  const urlLabels = "http://localhost:8081/whatIS";
  const urlPronunciation = "http://localhost:8081/pronunciation";
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetch(urlLabels + "?lang=" + Cookies.get("lang"))
      .then((response) => response.json())
      .then((data) => setLabels(data))
      .catch((error) => console.error(error));
  }, []);

  const playAudio = (text) => {
    console.log(Cookies.get("lang"));
    fetch(urlPronunciation + "?text=" + text + "&lang=" + Cookies.get("lang"))
      .then((response) => response.blob())
      .then((data) => {
        const audio = new Audio(URL.createObjectURL(data));
        audio.play();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container generated-container">
      <div className="divCols col-12 d-flex flex-lg-row flex-column justify-content-around">
        <div>
          <img
            src="https://www.tutorialspoint.com/assets/questions/media/426142-1668760872.png"
            alt="uploaded"
          />
        </div>
        <div>
          <h3>Click this words:</h3>
          <div className="labels d-flex flex-column">
            {labels.map((label) => (
              <div>
                <button
                  className="labelButton my-1"
                  onClick={() => playAudio(label)}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
