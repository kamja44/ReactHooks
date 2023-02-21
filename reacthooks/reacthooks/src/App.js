import React, { useState } from "react";
import { ReactDOM } from "react";
const App = () => {
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);
  return (
    <div>
      <h1>Hello {item}</h1>
      <button onClick={incrementItem}>incrementItem</button>
      <button onClick={decrementItem}>decrementItem</button>
    </div>
  );
};
class AppUgle extends React.Component {
  state = {
    item: 1,
  };
  render() {
    const { item } = this.state;
    return (
      <div>
        <h1>Hello {item}</h1>
        <button onClick={this.incrementItem}>incrementItem</button>
        <button onClick={this.decrementItem}>decrementItem</button>
      </div>
    );
  }
  incrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item + 1,
      };
    });
  };
  decrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item - 1,
      };
    });
  };
}

export default App;
