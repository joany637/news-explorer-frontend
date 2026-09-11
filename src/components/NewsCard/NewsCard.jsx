import { useState } from "react";
import "./NewsCard.css";

function NewsCard({ article, isLoggedIn, savedArticles = [], onSave, onRemove }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { urlToImage, publishedAt, title, description, source, url } = article;

  const isSaved = savedArticles.some(
    (saved) => saved.link === url || saved.url === url
  );

  function handleClick() {
    if (!isLoggedIn) return;
    if (isSaved) {
      onRemove(article);
    } else {
      onSave(article);
    }
  }

  return (
    <li className="news-card">
      <img className="news-card__image" src={urlToImage} alt={title} />
      <div className="news-card__info">
        <p className="news-card__date">{publishedAt}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source?.name}</p>
      </div>

      <div className="news-card__save-wrapper">
        <button
          className={`news-card__save-button ${
            isSaved ? "news-card__save-button_active" : ""
          } ${!isLoggedIn ? "news-card__save-button_disabled" : ""}`}
          type="button"
          aria-label="Guardar artículo"
          onClick={handleClick}
          onMouseEnter={() => !isLoggedIn && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        ></button>
        {showTooltip && (
          <span className="news-card__tooltip">
            Inicia sesión para guardar artículos
          </span>
        )}
      </div>
    </li>
  );
}

export default NewsCard;
