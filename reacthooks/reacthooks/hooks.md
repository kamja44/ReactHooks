# useState

- 항상 2개의 값을 return한다.
- 초깃값을 지정할 수 있다.

함수형 컴포넌트 방식(hooks)

```js
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
```

- useState는 Array를 반환해야 한다.
  - Array의 첫 번째 요소는 item
  - Array의 두 번째 요소는 setItem이 된다.

클래스 컴포넌트 방식

```js
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
```

- 클래스 컴포넌트는 this와 set을 사용해야 한다.
