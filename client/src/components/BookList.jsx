import React, { Component } from "react";
import { Card } from "semantic-ui-react";

const items = [
  {
    header: "Smart Contract - April",
    description:
      "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
    meta: "ROI: 30%"
  },
  {
    header: "Smart Contract - May",
    description:
      "Bring to the table win-win survival strategies to ensure proactive domination.",
    meta: "ROI: 34%"
  },
  {
    header: "Smart Contract - June",
    description:
      "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
    meta: "ROI: 27%"
  },
  {
    header: "Smart Contract - June",
    description:
      "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
    meta: "ROI: 27%"
  }
];

const contracts = [
  {
    header: "Smart Contract - April",
    description:
      "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
    meta: "ROI: 30%"
  },
  {
    header: "Smart Contract - May",
    description:
      "Bring to the table win-win survival strategies to ensure proactive domination.",
    meta: "ROI: 34%"
  },
  {
    header: "Smart Contract - June",
    description:
      "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
    meta: "ROI: 27%"
  },
  {
    header: "Smart Contract - June",
    description:
      "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
    meta: "ROI: 27%"
  }
];
const smarts = [
  {
    header: "Smart Contract - April",
    description:
      "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
    meta: "ROI: 30%"
  },
  {
    header: "Smart Contract - May",
    description:
      "Bring to the table win-win survival strategies to ensure proactive domination.",
    meta: "ROI: 34%"
  },
  {
    header: "Smart Contract - June",
    description:
      "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
    meta: "ROI: 27%"
  }
];

const codes = [
  {
    header: "Smart Contract - April",
    description:
      "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
    meta: "ROI: 30%"
  },
  {
    header: "Smart Contract - May",
    description:
      "Bring to the table win-win survival strategies to ensure proactive domination.",
    meta: "ROI: 34%"
  },
  {
    header: "Smart Contract - June",
    description:
      "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
    meta: "ROI: 27%"
  },
  {
    header: "Smart Contract - June",
    description:
      "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
    meta: "ROI: 27%"
  }
];

class BookList extends Component {
  state = {};
  render() {
    var cardWidth = document.body.clientWidth - 170;
    return (
      <Card
        style={{
          margin: "10px 10px 0 0",
          width: cardWidth,
          display: "flex"
        }}
      >
        <Card.Content>
          <Card.Header as="h1">Book List</Card.Header>
          <Card.Meta>
            <span>Recent published books.</span>
          </Card.Meta>
          <Card.Group
            style={{ justifyContent: "flex-start", margin: "10px 0 10px 0" }}
            items={items}
          />
          <Card.Group
            style={{ justifyContent: "flex-start", margin: "10px 0 10px 0" }}
            items={contracts}
          />
          <Card.Group
            style={{ justifyContent: "flex-start", margin: "10px 0 10px 0" }}
            items={codes}
          />
          <Card.Group
            style={{ justifyContent: "flex-start", margin: "10px 0 10px 0" }}
            items={smarts}
          />
        </Card.Content>
      </Card>
    );
  }
}

export default BookList;
