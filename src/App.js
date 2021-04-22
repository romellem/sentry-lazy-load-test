import React from "react";
import logo from "./logo.svg";
import "./App.css";

export const SENTRY_CAUGHT_ERROR_EVENT_TYPE = "caughterror.sentry";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentryCaughtError: false,
    };
  }

  triggerSentryError = () => {
    this.setState({ sentryCaughtError: true });
  };

  componentDidMount() {
    document.addEventListener(
      SENTRY_CAUGHT_ERROR_EVENT_TYPE,
      this.triggerSentryError
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      SENTRY_CAUGHT_ERROR_EVENT_TYPE,
      this.triggerSentryError
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.sentryCaughtError && (
            <h2 style={{ color: "red" }}>An error was caught!</h2>
          )}
          <button
            onClick={() => {
              throw new Error("Clicked the Button");
            }}
          >Click me to trigger an error</button>
        </header>
      </div>
    );
  }
}

export default App;
