import React, { Component } from "react";
import { Card, Button, Comment, Form, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";

const Avatar = [
  {
    src: "https://react.semantic-ui.com/images/avatar/small/matthew.png"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/small/helen.jpg"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/small/joe.jpg"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/small/laura.jpg"
  }
];

class FeedBack extends Component {
  state = {
    Content: "",
    ReplyID: null,
    comments: []
  };

  componentDidMount() {
    axios
      .get("/msg/getcomments")
      .then(res => {
        console.log(res.data);
        this.setState({
          comments: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  publishComment = () => {
    var date = new Date();
    var data = {
      UserID: this.props.id,
      ReplyID: this.state.ReplyID,
      Content: this.state.Content,
      Time: date.toLocaleString("chinese", { hour12: false })
    };
    axios
      .post("/msg/newcomment", data)
      .then(res => {
        console.log(res.data);
        this.setState({
          comments: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  chooseAvatar = id => {
    var index = id % 6;
    return Avatar[index].src;
  };

  render() {
    var cardWidth = document.body.clientWidth - 170;
    const commentList = this.state.comments.length ? (
      this.state.comments.map(comment => {
        return (
          <Comment>
            <Comment.Avatar src={this.chooseAvatar(comment.UserID)} />
            <Comment.Content>
              <Comment.Author as="a">{comment.UserName}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.Time}</div>
              </Comment.Metadata>
              <Comment.Text>
                <p>{comment.Content}</p>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        );
      })
    ) : (
      <div>No comments yet</div>
    );
    return (
      <Card style={{ width: cardWidth, display: "flex" }}>
        <Card.Content>
          <Comment.Group>
            <Header as="h3">Comments</Header>
            {commentList}
            <Form reply>
              <Form.TextArea
                onChange={event => {
                  this.setState({
                    Content: event.target.value
                  });
                }}
              />
              <Button
                content="Add Comment"
                labelPosition="left"
                icon="edit"
                primary
                onClick={this.publishComment}
              />
            </Form>
          </Comment.Group>
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

export default connect(mapStateToProps)(FeedBack);
