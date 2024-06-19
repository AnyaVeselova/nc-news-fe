import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-x69l.onrender.com/api",
});

export function fetchArticles() {
  return ncNewsApi
    .get("/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchArticleById(article_id) {
  return ncNewsApi
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchCommentsByArticleId(article_id) {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data;
  });
}

export function patchArticle(article_id, inc_votes) {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes })
    .then((res) => {
      console.log(res);
      return res.data.updatedArticle;
    })
    .catch((error) => {
      throw new Error("Failed to update vote");
    });
}
