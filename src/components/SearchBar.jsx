import React, { Component } from "react";
import { Card, Input, Icon, Search } from "semantic-ui-react";

class SearchBar extends Component {
  state = {};
  render() {
    var cardWidth = document.body.clientWidth - 170;
    return (
      <Card style={{ width: cardWidth, display: "flex" }}>
        <Card.Content>
          <Input
            focus
            placeholder="Search..."
            style={{ width: cardWidth - 100 }}
          >
            <Icon name="search" />
          </Input>
        </Card.Content>
      </Card>
    );
  }
}

export default SearchBar;
