// SearchPost component
import React from "react";
import "../CSS/SearchPost.css"

const SearchPost = ({ setSearchQuery }) => {
  function onChangeHandler(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="search-container">
      <form >
        <input
          placeholder="Search post"
          onChange={onChangeHandler}
          type="search"
          name="searchQuery"
          className="search-input"
        />
      </form>
    </div>
  );
};

export default SearchPost;
