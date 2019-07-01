import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import Logo from "../images/logo.png";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateId, updateToken } from "../actions/UpdateActions";
import axios from "axios";

class Signup extends Component {
  state = {
    email: "",
    username: "",
    psw: "",
    pswConfirm: "",
    alert: false,
    load: false,
    list: [
      "Email format must conform to the specification.",
      "Username can not be empty.",
      "Password must be at least six characters."
    ]
  };

  vertifyFormat = () => {
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return (
      pattern.test(this.state.email) &&
      this.state.username != "" &&
      this.state.psw === this.state.pswConfirm &&
      this.state.psw.length >= 6
    );
  };

  sendSignupRequest = () => {
    if (this.vertifyFormat()) {
      this.setState({
        alert: false,
        load: true
      });
      axios
        .post("/auth/signup", {
          email: this.state.email,
          username: this.state.username,
          psw: this.state.psw
        })
        .then(res => {
          if (res.data.status == true) {
            this.props.updateId(res.data.id);
            this.props.updateToken(res.data.token);
            this.props.history.push("/home");
          } else {
            this.setState({
              list: [
                "Email address has already been registered.",
                "Username can not be duplicate."
              ],
              alert: true
            });
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        alert: true
      });
    }
  };

  render() {
    var alert =
      this.state.alert === false ? (
        <div />
      ) : (
        <Message
          error
          header="Could you check something!"
          list={this.state.list}
        />
      );
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh", background: "#f6f6e9" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={Logo} />
            Welcome to B::kzilla
          </Header>
          <Form size="large" error active>
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={event => {
                  this.setState({
                    email: event.target.value
                  });
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Username"
                onChange={event => {
                  this.setState({
                    username: event.target.value
                  });
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={event => {
                  this.setState({
                    psw: event.target.value
                  });
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Comfirm password"
                type="password"
                onChange={event => {
                  this.setState({
                    pswConfirm: event.target.value
                  });
                }}
              />
              {alert}
              <Button
                color="teal"
                fluid
                size="large"
                onClick={this.sendSignupRequest}
              >
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already has account?
            <NavLink to="/">
              <a href="#"> Sign In</a>
            </NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateToken: token => {
      dispatch(updateToken(token));
    },
    updateId: id => {
      dispatch(updateId(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Signup));
