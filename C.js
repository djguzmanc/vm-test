// This is a react component that is technically functional,
// but would be very hard to maintain because of it's size.

// It's easier to write tests for smaller components that pass
// data between them. Rewrite this component so that it could be
// rendered from somewhere else by using these lines.

// const checkboxes = [0, 1, 2];

// <Form>
// 	checkboxes.map(id =>
// 		<Checkbox key={id} id={id}/>
// 	)
// </Form>

// or (easier but less impresive)

// <Form checkboxes={checkboxes} />

// If you decide to do the second option you MUST STILL create and
// render a Checkbox Component inside the Form Component

class Form extends React.Component {
  constructor(props) {
    super(props);
    const length = React.Children.count(this.props.children);
    this.state = {
      checked: Array.from({ length }, () => false),
    };
  }

  checkboxOnCheck(id) {
    const checked = this.state.checked.map((value, index) => {
      if (id === index) {
        return !value;
      }
      return value;
    });

    this.setState({ checked });
  }

  render() {
    const checked = this.state.checked;
    return (
      <div className="form">
        <span>Checked boxes: {checked}</span>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            onCheckChange: id => this.checkboxOnCheck(id),
            checked: checked[child.id]
          }))}
      </div>
    )
  }
}

const Checkbox = ({ checked, onCheckChange, key, id }) => {
  return (
    <div className="checkbox-wrapper" key={key}>
      <span>checkbox {id}</span>
      <input
        id={id}
        value={checked}
        onChange={() => onCheckChange(id)}
        type="checkbox" />
    </div>
  );
}

const checkboxes = [0, 1, 2];

ReactDOM.render(
  (
    <Form>
      {checkboxes.map(id =>
        <Checkbox key={id} id={id} />
      )}
    </Form>
  ),
  document.getElementById('container')
);