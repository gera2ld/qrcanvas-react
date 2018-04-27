import React from 'react';
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
    return <canvas ref={this.onBind} />;
  }

  onBind = canvas => {
    this.canvas = canvas;
  }

  update(options) {
    if (this.canvas) {
      qrcanvas({
        ...options,
        canvas: this.canvas,
      });
    }
  }
}
