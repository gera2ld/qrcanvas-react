import React from 'react';
import { findDOMNode } from 'react-dom';
import qrcanvas from 'qrcanvas';

export default class App extends React.Component {
  componentDidMount() {
    this.update(this.props.options);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.update(nextProps.options);
    }
  }

  render() {
    return <canvas />;
  }

  update(options) {
    const qrOptions = {
      ...options,
      canvas: findDOMNode(this),
    };
    qrcanvas(qrOptions);
  }
}
