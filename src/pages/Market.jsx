import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import BookMarket from "../components/BookMarket";
import FeedBack from "../components/FeedBack";

class Market extends Component {
  state = {};
  render() {
    return (
      <div>
        <SearchBar />
        <BookMarket />
        <FeedBack />
      </div>
    );
  }
}

export default Market;
