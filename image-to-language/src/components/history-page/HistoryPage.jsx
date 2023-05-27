import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { getCurrentUser } from "../../services/authSerive";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../../API/api-functions";
import "./HistoryPage.css";

const HistoryPage = () => {
    const navigate = useNavigate();

    useEffect(() => doRequest(), []);

    const doRequest = () => {
        const user = getCurrentUser();

        if (user === null) {
            navigate(`/sign-in`);
        }
    };

    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {


        getHistory().then((res) => {

            setHistoryData(res.data.history);

            console.log(historyData);
        }
        );
    }, []);
    
    const language = "en";

    const generatePage = (event, link, labels) => {
        event.preventDefault();
        const data = {
            link: link,
            labels: labels
        };
        
        navigate(`/generated-page-from-history?lang=${language}`, { state: data });
      };

    return (
        <>
            <Navbar />
            <h1 className="titleH1">History</h1>
            <div className="history-page">
                {historyData.map((item, index) => (
                    <div className="image-container" onClick={(event) => generatePage(event, item.link, item.labels)} key={index}>
                        <div className="image-wrapper">
                        <img src={item.link} alt={`Image ${index}`} />
                        </div>
                        <div className="labels-wrapper">
                            <ul className="label-list">
                                {item.labels.split(",").map((label, index) => (
                                  <li key={index}>{label}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

}

export default HistoryPage;