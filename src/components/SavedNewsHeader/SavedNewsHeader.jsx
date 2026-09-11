import "./SavedNewsHeader.css";

function getKeywordsText(sortedKeywords) {
  if (sortedKeywords.length <= 3) {
    return sortedKeywords.map(([keyword]) => keyword).join(", ");
  }
  const [first, second] = sortedKeywords;
  const remaining = sortedKeywords.length - 2;
  return `${first[0]}, ${second[0]} y ${remaining} más`;
}

function SavedNewsHeader({ savedArticles = [], currentUser }) {
  const keywordCounts = savedArticles.reduce((acc, article) => {
    const key = article.keyword || "General";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const sortedKeywords = Object.entries(keywordCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const keywordsText = getKeywordsText(sortedKeywords);

  return (
    <div className="saved-news-header">
      <p className="saved-news-header__label">Artículos guardados</p>
      <h2 className="saved-news-header__greeting">
        {currentUser ? `${currentUser.name}, has guardado` : "Has guardado"}
      </h2>
      <p className="saved-news-header__count">
        {savedArticles.length} artículos
      </p>
      {keywordsText && (
        <p className="saved-news-header__keywords">{keywordsText}</p>
      )}
    </div>
  );
}

export default SavedNewsHeader;