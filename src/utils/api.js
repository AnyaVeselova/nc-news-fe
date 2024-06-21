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

    .catch((error) => {});
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
      throw new Error("Failed to post comment");
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
