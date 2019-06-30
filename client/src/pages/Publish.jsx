import React, { Component } from "react";
import PublishForm from "../components/PublishForm";
import StepFlow from "../components/StepFlow";

class Publish extends Component {
  state = {};
  render() {
    return (
      <div>
        <StepFlow />
        <PublishForm />
      </div>
    );
  }
}

export default Publish;
