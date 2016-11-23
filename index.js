var React = require('react');
var findDOMNode = require('react-dom').findDOMNode;
var qrcanvas = require('qrcanvas');

module.exports = React.createClass({
  propTypes: {
    options: React.PropTypes.object.isRequired,
  },
  componentDidMount() {
    this.renderQR(this.props.options);
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.renderQR(nextProps.options);
    }
  },
  render() {
    return React.createElement('canvas');
  },
  renderQR(options) {
    var qroptions = {};
    Object.keys(options).forEach(function (key) {qroptions[key] = options[key];});
    qroptions.reuseCanvas = findDOMNode(this);
    qrcanvas(qroptions);
  },
});