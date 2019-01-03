import { QRCanvas } from 'qrcanvas-react';

export default class InputDemo extends React.Component {
  state = {
    cellSize: 8,
    data: 'hello, world',
  };

  render() {
    return (
      <div>
        <QRCanvas options={this.state} />
        <br />
        <input type="text" value={this.state.data} onChange={e => this.setState({ data: e.target.value })} />
      </div>
    );
  }
}
