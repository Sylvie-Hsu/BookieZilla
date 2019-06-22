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

class Login extends Component {
  state = {};
  render() {
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
          <Form size="large">
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Username"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Comfirm password"
                type="password"
              />
              <Button color="teal" fluid size="large">
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already has account?
            <NavLink to="/">
              <a href="#">Sign In</a>
            </NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
