import axios from "axios";
import { getCurrentUser } from "../services/authSerive";

const apiClient = axios.create({
  baseURL: "https://photospeak-be-nujzl345ka-lm.a.run.app",
});

export const getTranslation = (text, lang) => {
  const url = "/translate";
  return apiClient.post(url, {
    text: text,
    language: lang,
  });
};

export const findWords = (photo, lang) => {
  const formData = new FormData();

  const user = getCurrentUser();

  formData.append("photo", photo);
  formData.append("language", lang);
  formData.append("username", user.email);
  return apiClient.post("/what-is", formData);
};

export const getSpeech = (text, lang) => {
  const url = `/speech?text=${text}&lang=${lang}`;
  return apiClient
    .get(url, { responseType: "arraybuffer" })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};

export const checkPronunciation = (text, lang, speech) => {
  const formData = new FormData();
  formData.append("text", text);
  formData.append("language", lang);
  formData.append("speech", speech);
  return apiClient.post("/speech", formData);
};

export const getHistory = () => {
  const user = getCurrentUser();
  const url = `/getUserPhoto`;

  return apiClient(url, {
    params: {
      username: user.email,
    },
  });
};
