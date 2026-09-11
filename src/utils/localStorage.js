const SEARCH_RESULTS_KEY = "newsExplorerSearchResults";
const SEARCH_QUERY_KEY = "newsExplorerSearchQuery";

export function saveSearchResults(articles, query) {
  localStorage.setItem(SEARCH_RESULTS_KEY, JSON.stringify(articles));
  localStorage.setItem(SEARCH_QUERY_KEY, query);
}

export function getSearchResults() {
  const articles = localStorage.getItem(SEARCH_RESULTS_KEY);
  const query = localStorage.getItem(SEARCH_QUERY_KEY);
  return {
    articles: articles ? JSON.parse(articles) : [],
    query: query || "",
  };
}

export function clearSearchResults() {
  localStorage.removeItem(SEARCH_RESULTS_KEY);
  localStorage.removeItem(SEARCH_QUERY_KEY);
}