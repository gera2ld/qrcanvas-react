const React = require('react');
const ReactDOM = require('react-dom');
const qrgen = require('jsqrgen');

module.exports = React.createClass({
  propTypes: {
    options: React.PropTypes.object.isRequired,
  },
  componentDidMount() {
    this.renderQR(this.props);
  },
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  },
  componentWillUpdate(nextProps, nextState) {
    this.renderQR(nextProps);
  },
  render() {
    return React.createElement('canvas');
  },
  renderQR(props) {
    const canvas = ReactDOM.findDOMNode(this);
    qrgen.canvas(Object.assign({}, props.options, {
      reuseCanvas: canvas,
    }));
  },
});