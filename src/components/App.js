import React, { Component } from "react";
import Weather from './Weather'
import Clothes from './Clothes'
import Example from './Example'

class App extends Component {
  render() {
    return (
    <>
        <h1> logo </h1>
        <Weather />
        <Clothes />
        <Example />
    </>
    );
  }
}

export default App;
