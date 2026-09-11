import { NEWS_API_BASE_URL, NEWS_API_KEY, SEARCH_DAYS_RANGE, MAX_ARTICLES } from "./constants";

function getDateRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - SEARCH_DAYS_RANGE);

  const formatDate = (date) => date.toISOString().split("T")[0];

  return {
    from: formatDate(from),
    to: formatDate(to),
  };
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function searchNews(query) {
  const { from, to } = getDateRange();

  const url = `${NEWS_API_BASE_URL}?q=${encodeURIComponent(
    query
  )}&from=${from}&to=${to}&pageSize=${MAX_ARTICLES}&apiKey=${NEWS_API_KEY}`;

  return fetch(url).then(checkResponse);
}