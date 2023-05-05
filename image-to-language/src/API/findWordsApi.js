import axios from "axios";

const apiClient = axios.create({
  baseURL: "20.218.207.237",
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
