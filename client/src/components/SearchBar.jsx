import React, { Component } from "react";
import { Card, Input, Icon, Search, Button } from "semantic-ui-react";

class SearchBar extends Component {
  state = {};
  render() {
    var cardWidth = document.body.clientWidth - 170;
    return (
      <Card style={{ width: cardWidth, display: "flex" }}>
        <Card.Content>
          <Input
            rounded
            placeholder="Search..."
            style={{ width: cardWidth - 100 }}
          />
          <Button icon style={{ margin: "0 0 0 10px" }}>
            <Icon name="search" />
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default SearchBar;
