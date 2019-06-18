import React, { Component } from "react";
import { Statistic, Card, Icon } from "semantic-ui-react";

class StatisticData extends Component {
  state = {};
  render() {
    var cardWidth = document.body.clientWidth - 170;
    return (
      <div>
        <Card style={{ width: cardWidth, display: "flex" }}>
          <Card.Content>
            <Statistic.Group style={{ justifyContent: "space-around" }}>
              <Statistic>
                <Statistic.Value>
                  <Icon name="heartbeat" />
                  2,970
                </Statistic.Value>
                <Statistic.Label>Faves</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  <Icon name="eye" />
                  31,200
                </Statistic.Value>
                <Statistic.Label>Views</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  <Icon name="users" />
                  236
                </Statistic.Value>
                <Statistic.Label>Members</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  <Icon name="download" />
                  41,342
                </Statistic.Value>
                <Statistic.Label>Downloads</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default StatisticData;
