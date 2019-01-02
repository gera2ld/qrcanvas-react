import * as React from 'react';
import { qrcanvas, QRCanvasOptions } from 'qrcanvas';

interface QRCanvasReactProps {
  options: QRCanvasOptions;
}

export default class QRCanvasReact extends React.Component<QRCanvasReactProps, any> {
  private canvas = null;

  public componentDidMount() {
    this.update();
  }

  public componentDidUpdate() {
    this.update();
  }

  public render() {
    return <canvas ref={this.onBind} />;
  }

  public onBind = canvas => {
    this.canvas = canvas;
  }

  public update() {
    const { options } = this.props;
    if (this.canvas) {
      qrcanvas({
        ...options,
        canvas: this.canvas,
      });
    }
  }
}
