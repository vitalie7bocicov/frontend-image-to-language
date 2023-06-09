import React, { useEffect, useState } from "react";
import "./GeneratedPageFromHistory.css";
import {
  checkPronunciation,
  getTranslation,
  getSpeech,
} from "../../API/api-functions";
import { useLocation } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { BsMicFill } from "react-icons/bs";
import Navbar from "../navbar/navbar";

export default function GeneratedPage() {
  const [photo, setPhoto] = useState();
  const [leftLabels, setLeftLabels] = useState([]);
  const [rightLabels, setRightLabels] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(
    new URLSearchParams(location.search).get("lang")
  );
  const [leftLanguage, setLeftLanguage] = useState("en");
  const [rightLanguage, setRightLanguage] = useState(
    new URLSearchParams(location.search).get("lang")
  );
  const [pronunciationResults, setPronunciationResults] = useState({});

  useEffect(() => {
    setPronunciationResults({});
    if (location.state) {
      setPhoto(location.state.link);
      console.log(location.state.labels);
      getTranslation(location.state.labels, leftLanguage).then((res) => {
        setLeftLabels(res.data);
        setIsLoading(false);
      });
      getTranslation(location.state.labels, rightLanguage).then((res) => {
        setRightLabels(res.data);
        setIsLoading(false);
      });
    }
  }, [location, leftLanguage, rightLanguage]);

  useEffect(() => {
    const handlePermission = async () => {
      try {
        const permissionResult = await navigator.permissions.query({
          name: "microphone",
        });
        if (permissionResult.state === "granted") {
          console.log("Microphone permission granted");
        } else if (permissionResult.state === "prompt") {
          console.log("Microphone permission prompt");
        } else if (permissionResult.state === "denied") {
          console.log("Microphone permission denied");
        }
      } catch (error) {
        console.error("Error requesting microphone permission:", error);
      }
    };

    handlePermission();
  }, []);

  const playAudio = (text, language) => {
    getSpeech(text, language)
      .then((audioData) => {
        const blob = new Blob([audioData], { type: "audio/mpeg" });
        const audio = new Audio(URL.createObjectURL(blob));
        audio.play();
      })
      .catch((error) => console.error(error));
  };

  const _checkPronuntiation = (text, language, speech, label) => {
    checkPronunciation(text, language, speech)
      .then((response) => {
        let pronunciationOK = false;
        if (response.data === "OK") pronunciationOK = true;
        setPronunciationResults((prevResults) => ({
          ...prevResults,
          [label]: pronunciationOK,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const recordAudio = (text, language, label) => {
    const audioChunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start();

        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Data = reader.result.split(",")[1];
            _checkPronuntiation(text, language, base64Data, label);
          };
          reader.readAsDataURL(audioBlob);
        });

        setTimeout(() => {
          mediaRecorder.stop();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error recording audio:", error);
      });
  };

  return (
    <>
    <Navbar />
    <div className="container generated-container col-12">
      <div className="divCols col-12 d-flex flex-lg-row flex-column justify-content-around">
        <div className="d-flex flex-column align-items-center justify-content-center image-container">
          {photo ? (
            <img
              src={photo}
              alt="uploaded"
              className="searched-image"
            />
          ) : (
            <div>Loading photo...</div>
          )}
        </div>

        <div>
          <div className="d-flex mt-2">
            <div className="labels-container">
              <div>
                <Formik
                  initialValues={{ language: leftLanguage }}
                  onSubmit={null}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {(props) => (
                    <Form>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <fieldset className="form-group col-10 my-4">
                          <div className="d-flex align-items-center">
                            <Field
                              name="languageField"
                              as="select"
                              className="form-control"
                              onChange={(e) => {
                                setLeftLanguage(e.target.value);
                                setIsLoading(true);
                              }}
                              value={leftLanguage}
                            >
                              <option value="en">English</option>
                              <option value="ro">Romanian</option>
                              <option value="zh">Chinese</option>
                              <option value="es">Spanish</option>
                              <option value="hi">Hindi</option>
                              <option value="ar">Arabic</option>
                              <option value="pt">Portuguese</option>
                              <option value="bn">Bengali</option>
                              <option value="ru">Russian</option>
                              <option value="ja">Japanese</option>
                              <option value="de">German</option>
                              <option value="fr">French</option>
                            </Field>
                          </div>
                        </fieldset>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="labels d-flex flex-column">
                {leftLabels.map((label) => (
                  <div key={label}>
                    <button
                      className="labelButton my-1"
                      onClick={() => playAudio(label, leftLanguage)}
                    >
                      {label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="labels-container">
              <div className="row">
                <div className="col-10">
                  <Formik
                    initialValues={{ language: rightLabels }}
                    onSubmit={null}
                    validateOnBlur={false}
                    validateOnChange={false}
                  >
                    {(props) => (
                      <Form>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <fieldset className="form-group col-12 my-4">
                            <div className="d-flex align-items-center">
                              <Field
                                name="languageField"
                                as="select"
                                className="form-control"
                                onChange={(e) => {
                                  setRightLanguage(e.target.value);
                                  setIsLoading(true);
                                }}
                                value={rightLanguage}
                              >
                                <option value="en">English</option>
                                <option value="ro">Romanian</option>
                                <option value="zh">Chinese</option>
                                <option value="es">Spanish</option>
                                <option value="hi">Hindi</option>
                                <option value="ar">Arabic</option>
                                <option value="pt">Portuguese</option>
                                <option value="bn">Bengali</option>
                                <option value="ru">Russian</option>
                                <option value="ja">Japanese</option>
                                <option value="de">German</option>
                                <option value="fr">French</option>
                              </Field>
                            </div>
                          </fieldset>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="col-2">
                  {isLoading && (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="labels d-flex flex-column">
                {rightLabels.map((label) => (
                  <div key={label} className="d-flex">
                    <button
                      className={`labelButton my-1 ${
                        pronunciationResults[label] === true
                          ? "green"
                          : pronunciationResults[label] === false
                          ? "red"
                          : ""
                      }`}
                      onClick={() => playAudio(label, rightLanguage)}
                    >
                      {label}
                    </button>
                    <button
                      className="btn speechButton"
                      onClick={() => recordAudio(label, rightLanguage, label)}
                    >
                      <BsMicFill className="mic-icon" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
