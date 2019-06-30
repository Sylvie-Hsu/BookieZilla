import React, { Component } from "react";
import { Icon, Step, Card } from "semantic-ui-react";

class StepFlow extends Component {
  render() {
    var cardWidth = document.body.clientWidth - 170;
    return (
      <Card
        style={{
          margin: "20px 10px 20px 0",
          width: cardWidth,
          display: "flex"
        }}
      >
        <Step.Group>
          <Step>
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>Finding</Step.Title>
              <Step.Description>Choose your finding options</Step.Description>
            </Step.Content>
          </Step>
          <Step>
            <Icon name="payment" />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
              <Step.Description>Enter billing information</Step.Description>
            </Step.Content>
          </Step>
          <Step>
            <Icon name="info" />
            <Step.Content>
              <Step.Title>Confirm Order</Step.Title>
              <Step.Description>
                Confirm basic confirm information
              </Step.Description>
            </Step.Content>
          </Step>
          <Step>
            <Icon name="dollar sign" />
            <Step.Content>
              <Step.Title>Check Income</Step.Title>
              <Step.Description>Check income of transfer</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </Card>
    );
  }
}

export default StepFlow;
