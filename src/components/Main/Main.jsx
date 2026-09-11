import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import "./Main.css";

function Main({
  articles,
  savedArticles,
  isLoading,
  hasSearched,
  errorMessage,
  isLoggedIn,
  onSearch,
  onSave,
  onRemove,
}) {
  return (
    <main className="main">
      <SearchForm onSearch={onSearch} />

      {errorMessage && <p className="main__error">{errorMessage}</p>}

      {isLoading && <Preloader />}

      {!isLoading && !errorMessage && hasSearched && articles.length === 0 && (
        <p className="main__not-found">No se ha encontrado nada</p>
      )}

      {!isLoading && !errorMessage && articles.length > 0 && (
        <NewsCardList
          articles={articles}
          savedArticles={savedArticles}
          isLoggedIn={isLoggedIn}
          onSave={onSave}
          onRemove={onRemove}
        />
      )}

      <About />
    </main>
  );
}

export default Main;