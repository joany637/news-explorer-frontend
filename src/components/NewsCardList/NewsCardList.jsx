import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

const CARDS_PER_PAGE = 3;

function NewsCardList({ articles, savedArticles, isLoggedIn, onSave, onRemove }) {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  function handleShowMore() {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  }

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <section className="news-card-list">
      <ul className="news-card-list__items">
        {visibleArticles.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSave={onSave}
            onRemove={onRemove}
          />
        ))}
      </ul>

      {visibleCount < articles.length && (
        <button className="news-card-list__show-more" onClick={handleShowMore}>
          Mostrar más
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
