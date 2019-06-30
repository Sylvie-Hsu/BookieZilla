import React, { Component } from "react";
import { Form, Card, Image, Grid, Message } from "semantic-ui-react";
import Pic from "../images/matthew.png";
import { connect } from "react-redux";
import axios from "axios";

const options = [
  { key: "a", text: "Art", value: "art" },
  { key: "b", text: "Biographies", value: "biographies" },
  { key: "c", text: "Comics", value: "comics" },
  { key: "e", text: "Education", value: "education" },
  { key: "h", text: "History", value: "history" },
  { key: "l", text: "Literature", value: "literature" },
  { key: "p", text: "Politics", value: "politics" },
  { key: "s", text: "Science", value: "science" },
  { key: "o", text: "Other", value: "other" }
];

class PublishForm extends Component {
  state = {
    BookName: "",
    BookCostPrice: "",
    BookSalePrice: "",
    BookCategory: "",
    BookPhoto: "https://react.semantic-ui.com/images/wireframe/image.png",
    BookContent: "",
    BookISBN: "",
    BookRefs: "",
    TradeParty: "",
    TradeMethod: "",
    success: false,
    fail: false
  };

  publishBook = () => {
    console.log(this.state);
    axios
      .post("/api/publish", {
        UserID: this.props.id,
        BookName: this.state.BookName,
        BookCostPrice: this.state.BookCostPrice,
        BookSalePrice: this.state.BookSalePrice,
        BookCategory: this.state.BookCategory,
        BookPhoto: this.state.BookPhoto,
        BookContent: this.state.BookContent,
        BookISBN: this.state.BookISBN,
        BookRefs: this.state.BookRefs,
        TradeParty: this.state.TradeParty,
        TradeMethod: this.state.TradeMethod
      })
      .then(res => {
        console.log(res.data);
        if (res.data.status == true) {
          this.setState({
            success: true
          });
        } else {
          this.setState({
            fail: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = (e, { value }) => this.setState({ value });
  handleTradePartyChange = (e, { value }) =>
    this.setState({ TradeParty: value });
  handleTradeMethodChange = (e, { value }) =>
    this.setState({ TradeMethod: value });

  render() {
    var cardWidth = document.body.clientWidth - 170;
    var success =
      this.state.success === false ? (
        <div />
      ) : (
        <Message
          success
          icon="check circle outline"
          header="Your book publishment was successful"
          content="Get the best news in your home-tab every day."
        />
      );
    var fail =
      this.state.fail === false ? (
        <div />
      ) : (
        <Message
          error
          icon="meh outline"
          header="Your book publishment failed"
          content="Please wait for some minutes and try again."
        />
      );
    console.log(this.props);
    return (
      <Card
        style={{
          margin: "10px 10px 0 0",
          width: cardWidth,
          display: "flex"
        }}
      >
        <Card.Content>
          <Card.Header as="h1">Publish Book</Card.Header>
          <Card.Meta>
            <span>
              You can publish your book for a potential saler or buyer here.
            </span>
          </Card.Meta>
          <Form style={{ margin: "10px 0 10px 0" }}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={5}>
                  <Image
                    src={this.state.BookPhoto}
                    size="medium"
                    rounded
                    style={{ margin: "10px 0 10px 0" }}
                  />
                </Grid.Column>
                <Grid.Column width={10}>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="Book name"
                      placeholder="Book name"
                      onChange={event => {
                        this.setState({
                          BookName: event.target.value
                        });
                      }}
                    />
                    <Form.Input
                      fluid
                      label="Origin Price"
                      placeholder="Origin Price"
                      onChange={event => {
                        this.setState({
                          BookCostPrice: event.target.value
                        });
                      }}
                    />
                    <Form.Input
                      fluid
                      label="Sale Price"
                      placeholder="Sale Price"
                      onChange={event => {
                        this.setState({
                          BookSalePrice: event.target.value
                        });
                      }}
                    />
                    <Form.Select
                      fluid
                      label="Category"
                      options={options}
                      placeholder="Category"
                      id="category"
                      onChange={event => {
                        this.setState({
                          BookCategory: event.target.innerText
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group inline>
                    <label>Trade Party</label>
                    <Form.Radio
                      label="I want to sale it.    "
                      value="forSale"
                      checked={this.state.TradeParty === "forSale"}
                      onChange={this.handleTradePartyChange}
                    />
                    <Form.Radio
                      label="I want to buy it."
                      value="forBuy"
                      checked={this.state.TradeParty === "forBuy"}
                      onChange={this.handleTradePartyChange}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      width={6}
                      fluid
                      label="ISBN"
                      placeholder="ISBN"
                      onChange={event => {
                        this.setState({
                          BookISBN: event.target.value
                        });
                      }}
                    />
                    <Form.Input
                      width={5}
                      fluid
                      label="Refs"
                      placeholder="Refs"
                      onChange={event => {
                        this.setState({
                          BookRefs: event.target.value
                        });
                      }}
                    />
                    <Form.Input
                      width={5}
                      fluid
                      label="Photo"
                      placeholder="PhotoLink"
                      onChange={event => {
                        this.setState({
                          BookPhoto: event.target.value
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group inline>
                    <label>Trade Method</label>
                    <Form.Radio
                      label="I want to deliver it online.   "
                      value="online"
                      checked={this.state.TradeMethod === "online"}
                      onChange={this.handleTradeMethodChange}
                    />
                    <Form.Radio
                      label="I want to transport it offline."
                      value="offline"
                      checked={this.state.TradeMethod === "offline"}
                      onChange={this.handleTradeMethodChange}
                    />
                  </Form.Group>
                  <Form.TextArea
                    label="About"
                    placeholder="Tell us more about the book..."
                    style={{ height: "135px" }}
                    onChange={event => {
                      this.setState({
                        BookContent: event.target.value
                      });
                    }}
                  />
                  <Form.Checkbox label="I agree to the Terms and Conditions" />
                  <Form.Button onClick={this.publishBook}>Submit</Form.Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
          {success}
          {fail}
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.id,
    token: state.token
  };
};

export default connect(mapStateToProps)(PublishForm);
