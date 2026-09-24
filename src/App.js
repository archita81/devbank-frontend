import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backendStatus: "Checking...",
      accounts: []
    };
  }

  componentDidMount() {
    fetch(process.env.APIURL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          backendStatus: data.status
        });
      })
      .catch(() => {
        this.setState({
          backendStatus: "Backend unavailable"
        });
      });

    fetch("http://localhost:5000/api/accounts")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          accounts: data
        });
      })
      .catch(() => {
        this.setState({
          accounts: []
        });
      });
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>DevBank</h1>
          <p>Digital Banking Platform</p>
        </header>

        <main>
          <div className="card">
            <h2>Welcome to DevBank</h2>

            <p>Secure Digital Banking Platform</p>

            <div className="status">
              Backend Status:
              <strong> {this.state.backendStatus}</strong>
            </div>

            <h3>Customer Accounts</h3>

            {this.state.accounts.map((account) => (
              <div className="account" key={account.id}>
                <strong>{account.name}</strong>
                <br />
                Account Type: {account.accountType}
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
