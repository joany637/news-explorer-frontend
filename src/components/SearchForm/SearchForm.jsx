import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch && onSearch(query);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Introduce un tema"
        value={query}
        onChange={handleChange}
      />
      <button className="search-form__button" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;