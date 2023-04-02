import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./GeneratedPage.css";
import { findWords, getSpeech } from "../../API/findWordsApi";
import { useLocation } from "react-router-dom";

export default function GeneratedPage() {
  const [photo, setPhoto] = useState();
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setPhoto(location.state.image);
      console.log(photo);
      findWords(location.state.image, Cookies.get("lang"))
        .then((response) => {
          setLabels(response.data);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [location]);

  const playAudio = (text) => {
    getSpeech(text, Cookies.get("lang"))
      .then((audioData) => {
        const audio = new Audio(URL.createObjectURL(audioData));
        audio.play();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container generated-container">
      <div className="divCols col-12 d-flex flex-lg-row flex-column justify-content-around">
        <div className="d-flex align-items-center justify-content-center image-container">
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt="uploaded"
              className="searched-image"
            />
          ) : (
            <div>Loading photo...</div>
          )}
        </div>
        <div>
          <h3 className="my-4">Click these words:</h3>
          {isLoading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          <div className="labels-container">
            <div className="labels d-flex flex-column">
              {labels.map((label) => (
                <div key={label}>
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
    </div>
  );
}
