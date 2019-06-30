import React, { Component } from "react";
import {
  Form,
  Card,
  Image,
  Grid,
  Message,
  Item,
  Statistic,
  List,
  Button,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import StepFlow from "./StepFlow";
import Pic from "../images/matthew.png";
import axios from "axios";

class OrderInfo extends Component {
  state = {
    bookInfo: [],
    orderInfo: [],
    success: false,
    fail: false
  };

  componentDidMount() {
    console.log(this.props);
    let bookid = this.props.match.params.book_id;
    axios
      .get("/api/getorder/" + bookid)
      .then(res => {
        this.setState({
          bookInfo: res.data.bookInfo,
          orderInfo: res.data.orderInfo
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  confirmOrder = () => {
    axios
      .post("/api/confirmorder", {
        UserID: this.props.id,
        OrderID: this.state.orderInfo.OrderID
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

  render() {
    var cardWidth = document.body.clientWidth - 170;
    var success =
      this.state.success === false ? (
        <div />
      ) : (
        <Message
          success
          icon="check circle outline"
          header="Your order confirmation was successful"
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
          header="Your order confirmation failed"
          content="Please wait for some minutes and try again."
        />
      );
    return (
      <div>
        <StepFlow />
        <Card
          style={{
            margin: "10px 10px 0 0",
            width: cardWidth,
            display: "flex"
          }}
        >
          <Card.Content>
            <Item style={{ margin: "10px 0 10px 0" }}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={5}>
                    <Image
                      src={this.state.bookInfo.BookPhoto}
                      size="medium"
                      rounded
                      style={{ margin: "10px 0 10px 0" }}
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Item.Header as="h1">
                      {this.state.bookInfo.BookName}
                    </Item.Header>
                    <Statistic.Group
                      size="tiny"
                      style={{
                        justifyContent: "space-between",
                        margin: "20px 0 10px 0"
                      }}
                    >
                      <Statistic>
                        <Statistic.Value>
                          ${this.state.bookInfo.BookCostPrice}
                        </Statistic.Value>
                        <Statistic.Label>OriginPrice</Statistic.Label>
                      </Statistic>
                      <Statistic>
                        <Statistic.Value>
                          ${this.state.bookInfo.BookSalePrice}
                        </Statistic.Value>
                        <Statistic.Label>SalePrice</Statistic.Label>
                      </Statistic>
                      <Statistic>
                        <Statistic.Value>
                          {this.state.bookInfo.BookISBN}
                        </Statistic.Value>
                        <Statistic.Label>BookISBN</Statistic.Label>
                      </Statistic>
                    </Statistic.Group>
                    <List size="large">
                      <List.Item>
                        <List.Icon name="book" />
                        <List.Content>
                          BookID:{this.state.bookInfo.BookID}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="file alternate" />
                        <List.Content>
                          OrderID:{this.state.orderInfo.OrderID}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="fax" />
                        <List.Content>
                          TradeMethod:{this.state.orderInfo.TradeMethod}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="suitcase" />
                        <List.Content>
                          TradeParty:{this.state.orderInfo.TradeParty}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="linkify" />
                        <List.Content>
                          <a href={this.state.bookInfo.BookRefs}>
                            See it in Amazon
                          </a>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon name="bookmark" />
                        <List.Content>
                          BookCategory:{this.state.bookInfo.BookCategory}
                        </List.Content>
                      </List.Item>
                    </List>
                    <List size="large">
                      <List.Item style={{ margin: "20px 0 0 0" }}>
                        <List.Header style={{ margin: "20px 0 10px 0" }}>
                          BookContent
                        </List.Header>
                        <List.Content style={{ height: "80px" }}>
                          {this.state.bookInfo.BookContent}
                        </List.Content>
                      </List.Item>
                    </List>
                    <Button primary floated="right" onClick={this.confirmOrder}>
                      Click to trade
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Item>
            {success}
            {fail}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.id,
    token: state.token
  };
};

export default connect(mapStateToProps)(OrderInfo);
