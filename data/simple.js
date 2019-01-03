import { QRCanvas } from 'qrcanvas-react';

export default function SimpleDemo(props) {
  return (
    <QRCanvas
      options={{
        cellSize: 8,
        data: 'hello, world',
      }}
    />
  );
}
