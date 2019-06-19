import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SideMenu from "./components/SideMenu";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Publish from "./pages/Publish";
import Message from "./pages/Message";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <div>
              <SideMenu />
            </div>
            <div style={{ margin: "10px 10px 10px 160px" }}>
              <Switch>
                {/* Only match one */}
                <Route exact path="/" component={Home} />
                <Route path="/market" component={Market} />
                <Route path="/publish" component={Publish} />
                <Route path="/message" component={Message} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
