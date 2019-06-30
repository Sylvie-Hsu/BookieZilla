import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SideMenu from "./components/SideMenu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Publish from "./pages/Publish";
import Message from "./pages/Message";
import OrderInfo from "./components/OrderInfo";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <div>
              <div>
                <SideMenu />
              </div>
              <div style={{ margin: "10px 10px 10px 160px" }}>
                {/* Only match one */}
                <Route path="/home" component={Home} />
                <Route path="/market" component={Market} />
                <Route path="/publish" component={Publish} />
                <Route path="/message" component={Message} />
                <Route path="/books/:book_id" component={OrderInfo} />
              </div>
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
