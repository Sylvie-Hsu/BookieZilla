import React, { Component } from "react";
import { Header, Icon, Image, Menu, Sidebar } from "semantic-ui-react";
import Logo from "../images/matthew.png";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

const Avatar = [
  {
    src: "https://react.semantic-ui.com/images/avatar/large/matthew.png"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/large/helen.jpg"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/large/joe.jpg"
  },
  {
    src: "https://react.semantic-ui.com/images/avatar/large/laura.jpg"
  }
];

class SideMenu extends Component {
  state = {};

  chooseAvatar = id => {
    var index = id % 6;
    return Avatar[index].src;
  };

  render() {
    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
      >
        <div style={{ margin: "40px 20px 80px 20px" }}>
          <Image src={this.chooseAvatar(this.props.id)} circular small />
          <Header as="h2" style={{ color: "white" }}>
            B::kieZilla
          </Header>
        </div>
        <NavLink to="/home">
          <Menu.Item as="a">
            <Icon name="home" />
            Home
          </Menu.Item>
        </NavLink>
        <NavLink to="/market">
          <Menu.Item as="a">
            <Icon name="shopping cart" />
            Market
          </Menu.Item>
        </NavLink>
        <NavLink to="/publish">
          <Menu.Item as="a">
            <Icon name="paw" />
            Publish
          </Menu.Item>
        </NavLink>
        <NavLink to="/message">
          <Menu.Item as="a">
            <Icon name="paper plane" />
            Message
          </Menu.Item>
        </NavLink>
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.id,
    token: state.token
  };
};

export default connect(mapStateToProps)(withRouter(SideMenu));
