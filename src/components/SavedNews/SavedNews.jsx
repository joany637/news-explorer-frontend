import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";

function SavedNews({ savedArticles = [], onRemove, currentUser }) {
  return (
    <section className="saved-news">
      <SavedNewsHeader savedArticles={savedArticles} currentUser={currentUser} />
      <NewsCardList
        articles={savedArticles.map((a) => ({
          url: a.link,
          title: a.title,
          description: a.text,
          publishedAt: a.date,
          urlToImage: a.image,
          source: { name: a.source },
          keyword: a.keyword,
          _id: a._id,
        }))}
        savedArticles={savedArticles}
        isLoggedIn={true}
        onSave={() => {}}
        onRemove={onRemove}
      />
    </section>
  );
}

export default SavedNews;
