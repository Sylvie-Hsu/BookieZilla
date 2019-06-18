import React, { Component } from "react";
import StatisticData from "../components/StatisticData";
import BookList from "../components/BookList";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <StatisticData />
        <div class="row">
          <BookList />
        </div>
      </div>
    );
  }
}

export default Home;
