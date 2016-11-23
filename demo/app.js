const React = require('react');
const ReactDOM = require('react-dom');
const QRCanvas = require('qrcanvas-react');

const Demo = React.createClass({
  getInitialState() {
    return {
      data: 'Hello world',
    };
  },
  render() {
    const {data} = this.state;
    return React.createElement('div', null, [
      React.createElement('div', {key: 'input'}, React.createElement('input', {
        type: 'text',
        value: data,
        onChange: e => this.setState({data: e.target.value}),
      })),
      React.createElement(QRCanvas, {
        key: 'canvas',
        options: {data: data},
      }),
    ]);
  },
});

ReactDOM.render(React.createElement(Demo), document.getElementById('app'));