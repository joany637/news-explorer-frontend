import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { searchNews } from "../../utils/NewsApi";
import { saveSearchResults, getSearchResults } from "../../utils/localStorage";
import * as MainApi from "../../utils/MainApi";
import { setToken, getToken, removeToken } from "../../utils/token";
import { EMPTY_QUERY_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [articles, setArticles] = useState(() => {
    const { articles: storedArticles } = getSearchResults();
    return storedArticles;
  });
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(() => {
    const { articles: storedArticles } = getSearchResults();
    return storedArticles.length > 0;
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tooltip, setTooltip] = useState({ isOpen: false, isSuccess: false });

  // Al montar: recupera la sesión activa (si hay token guardado)
  useEffect(() => {
    const token = getToken();
    if (token) {
      MainApi.getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          return MainApi.getSavedArticles();
        })
        .then((saved) => setSavedArticles(saved || []))
        .catch(() => {
          removeToken();
        });
    }
  }, []);

  function handleSearch(query) {
    if (!query.trim()) {
      setErrorMessage(EMPTY_QUERY_MESSAGE);
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    setHasSearched(true);

    searchNews(query)
      .then((data) => {
        const results = data.articles || [];
        setArticles(results);
        saveSearchResults(results, query);
      })
      .catch(() => {
        setErrorMessage(ERROR_MESSAGE);
        setArticles([]);
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister({ email, password, name }) {
    setAuthError("");
    MainApi.register({ email, password, name })
      .then(() => {
        setIsRegisterOpen(false);
        setTooltip({ isOpen: true, isSuccess: true });
      })
      .catch((err) => setAuthError(err));
  }

  function handleLogin({ email, password }) {
    setAuthError("");
    MainApi.login({ email, password })
      .then((data) => {
        setToken(data.token);
        return MainApi.getCurrentUser();
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setIsLoginOpen(false);
        return MainApi.getSavedArticles();
      })
      .then((saved) => setSavedArticles(saved || []))
      .catch(() => setAuthError("Correo o contraseña incorrectos"));
  }

  function handleLogout() {
    removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSavedArticles([]);
    navigate("/");
  }

  function handleSaveArticle(article) {
    if (!isLoggedIn) return;

    const payload = {
      keyword: article.keyword || "General",
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source?.name || "Desconocida",
      link: article.url,
      image: article.urlToImage,
    };

    MainApi.saveArticle(payload).then((savedArticle) => {
      setSavedArticles((prev) => [...prev, savedArticle]);
    });
  }

  function handleRemoveArticle(article) {
    const target = savedArticles.find(
      (saved) => saved.link === article.url || saved._id === article._id
    );
    if (!target) return;

    MainApi.removeArticle(target._id).then(() => {
      setSavedArticles((prev) => prev.filter((a) => a._id !== target._id));
    });
  }

  function closeAllPopups() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setTooltip({ isOpen: false, isSuccess: false });
    setAuthError("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLoginClick={() => setIsLoginOpen(true)}
          onLogout={handleLogout}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                articles={articles}
                savedArticles={savedArticles}
                isLoading={isLoading}
                hasSearched={hasSearched}
                errorMessage={errorMessage}
                isLoggedIn={isLoggedIn}
                onSearch={handleSearch}
                onSave={handleSaveArticle}
                onRemove={handleRemoveArticle}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  savedArticles={savedArticles}
                  onRemove={handleRemoveArticle}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        <Login
          isOpen={isLoginOpen}
          onClose={closeAllPopups}
          onLogin={handleLogin}
          errorMessage={authError}
          onSwitchToRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />

        <Register
          isOpen={isRegisterOpen}
          onClose={closeAllPopups}
          onRegister={handleRegister}
          errorMessage={authError}
          onSwitchToLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />

        <InfoTooltip
          isOpen={tooltip.isOpen}
          isSuccess={tooltip.isSuccess}
          onClose={closeAllPopups}
          onLoginClick={() => {
            setTooltip({ isOpen: false, isSuccess: false });
            setIsLoginOpen(true);
          }}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;