// eslint-disable-next-line
import React from 'react';
import { qrcanvas } from 'qrcanvas';

export default class App extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  render() {
    return <canvas ref={this.onBind} />;
  }

  onBind = canvas => {
    this.canvas = canvas;
  }

  update() {
    const { options } = this.props;
    if (this.canvas) {
      qrcanvas({
        ...options,
        canvas: this.canvas,
      });
    }
  }
}
