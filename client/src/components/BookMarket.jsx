import React, { Component } from "react";
import { Button, Card, Image } from "semantic-ui-react";

class BookMarket extends Component {
  state = {};
  render() {
    var cardWidth = document.body.clientWidth - 170;
    return (
      <Card style={{ width: cardWidth, display: "flex" }}>
        <Card.Content>
          <Card.Header as="h1">New Contract</Card.Header>
          <Card.Group style={{ justifyContent: "center" }}>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
                <Card.Header>Dispatch Contract</Card.Header>
                <Card.Meta>Contract of dispatch actions.</Card.Meta>
                <Card.Description>
                  This contract is used to dispatch action in{" "}
                  <strong>different ways</strong>.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>Transfer Contract</Card.Header>
                <Card.Meta>Contract of assets transfer.</Card.Meta>
                <Card.Description>
                  This contract is used to transfer assets which assure{" "}
                  <strong>security</strong>.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                />
                <Card.Header>New Contract</Card.Header>
                <Card.Meta>Contract of dispatch actions.</Card.Meta>
                <Card.Description>
                  This contract is used to dispatch action in{" "}
                  <strong>different ways</strong>.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
                <Card.Header>Transfer Contract</Card.Header>
                <Card.Meta>Contract of assets transfer.</Card.Meta>
                <Card.Description>
                  This contract is used to transfer assets which assure{" "}
                  <strong>security</strong>.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>Center Contract</Card.Header>
                <Card.Meta>Contract of dispatch actions.</Card.Meta>
                <Card.Description>
                  This contract is used to dispatch action in{" "}
                  <strong>different ways</strong>.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                />
                <Card.Header>Transfer Contract</Card.Header>
                <Card.Meta>Contract of assets transfer.</Card.Meta>
                <Card.Description>
                  This contract is used to transfer assets which assure{" "}
                  <strong>security</strong>.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
                <Card.Header>Token Contract</Card.Header>
                <Card.Meta>Contract of dispatch actions.</Card.Meta>
                <Card.Description>
                  This contract is used to dispatch action in{" "}
                  <strong>different ways</strong>.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>Transfer Contract</Card.Header>
                <Card.Meta>Contract of assets transfer.</Card.Meta>
                <Card.Description>
                  This contract is used to transfer assets which assure{" "}
                  <strong>security</strong>.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </Card.Content>
      </Card>
    );
  }
}

export default BookMarket;
