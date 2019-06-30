import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import BookMarket from "../components/BookMarket";

class Market extends Component {
  state = {};
  render() {
    return (
      <div>
        <SearchBar />
        <BookMarket />
      </div>
    );
  }
}

export default Market;
