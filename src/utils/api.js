import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-x69l.onrender.com/",
});

export default function fetchArticles() {
  return ncNewsApi
    .get("/api/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.error(error);
    });
}
