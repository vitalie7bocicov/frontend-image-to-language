import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const findWords = (photo, lang) => {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("language", lang);
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
  console.log(formData);
  return apiClient.post("/speech", formData);
};
