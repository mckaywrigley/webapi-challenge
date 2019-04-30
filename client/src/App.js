import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/api/projects")
      .then(res => {
        this.setState({
          projects: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        {this.state.projects.map(project => {
          return (
            <div key={project.id}>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
