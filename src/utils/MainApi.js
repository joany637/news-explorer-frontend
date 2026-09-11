import { getToken } from "./token";

const BASE_URL = "https://news-explorer-joany.duckdns.org";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err.message || "Error"));
}

function request(endpoint, options = {}) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

export function register({ email, password, name }) {
  return request("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
}

export function login({ email, password }) {
  return request("/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser() {
  return request("/users/me", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}

export function getSavedArticles() {
  return request("/articles", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}

export function saveArticle(article) {
  return request("/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(article),
  });
}

export function removeArticle(articleId) {
  return request(`/articles/${articleId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}