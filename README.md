qrcanvas-react
===

![NPM](https://img.shields.io/npm/v/qrcanvas-react.svg)
![License](https://img.shields.io/npm/l/qrcanvas-react.svg)
![Downloads](https://img.shields.io/npm/dt/qrcanvas-react.svg)

This a QRCode component for use with ReactJS, based on [qrcanvas](https://github.com/gera2ld/qrcanvas).

Install
---

``` sh
$ npm i qrcanvas-react
```

Usage
---

``` javascript
import QRCanvas from 'qrcanvas-react';
import ReactDOM from 'react-dom';

const options = {data: 'hello, world'};
ReactDOM.render(<QRCanvas options={options} />, document.getElementById('app'));
```

`options` is passed to [qrcanvas](https://github.com/gera2ld/qrcanvas).
For more details, see [qrcanvas docs](https://github.com/gera2ld/qrcanvas/wiki).