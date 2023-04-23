import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://photospeack-backend-swzv55iwsq-lm.a.run.app",
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
    .get(url, { responseType: "blob" })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};
