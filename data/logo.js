import React from 'react';
import { QRCanvas } from 'qrcanvas-react';

export default class InputDemo extends React.Component {
  state = {
    cellSize: 8,
    data: 'hello, world',
  };

  componentWillMount() {
    const image = new Image();
    image.src = 'https://user-images.githubusercontent.com/3139113/38300650-ed2c25c4-382f-11e8-9792-d46987eb17d1.png';
    image.onload = () => {
      this.setState({
        logo: {
          image,
        },
      });
    };
  }

  render() {
    return (
      <QRCanvas options={this.state} />
    );
  }
}
