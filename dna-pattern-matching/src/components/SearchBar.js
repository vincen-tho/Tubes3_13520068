import React from "react";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <div className="search-bar-input">
          <input type="text" placeholder="Search" />
        </div>
        <div className="search-bar-button">
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
