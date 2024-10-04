import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-x69l.onrender.com/api",
});

export function fetchArticles(params) {
  return ncNewsApi
    .get("/articles", { params })
    .then((response) => {
      return response.data.articles;
    })

    .catch((err) => {
      return Promise.reject(err.response.data);
    });
}

export function fetchArticleById(article_id) {
  return ncNewsApi
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
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
      return res.data.updatedArticle;
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Failed to update vote");
    });
}

export function postComment(article_id, username, body) {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, { username, body })
    .then((res) => res.data.comment)
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
}

export function deleteCommentByCommentId(comment_id) {
  return ncNewsApi.delete(`/comments/${comment_id}`);
}

export function fetchALlTopics() {
  return ncNewsApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
}

export function fetchUsers() {
  return ncNewsApi
    .get("/users")
    .then(({ data: { users } }) => {
      return users;
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
}

export function verifyUser(username, password) {
  return ncNewsApi
    .post("/users/login", { username, password })
    .then((res) => {
      console.log(res.data);
      const { user, token } = res.data;
      console.log(user, token);
      localStorage.setItem("token", token);
      console.log("User logged in:", user);
      return { user, token };
    })
    .catch((error) => {
      return Promise.reject(error.response.data);
    });
}
