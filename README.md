jsqrgen-react
===

![NPM](https://img.shields.io/npm/v/jsqrgen-react.svg)
![Licence](https://img.shields.io/npm/l/jsqrgen-react.svg)
![Downloads](https://img.shields.io/npm/dt/jsqrgen-react.svg)

This a QRCode component for use with ReactJS, based on [jsqrgen](https://github.com/gera2ld/jsqrgen).

Install
---

``` sh
$ npm i jsqrgen-react
```

Usage
---

``` javascript
import QRCanvas from 'jsqrgen-react';
import ReactDOM from 'react-dom';

// Qrcanvas is a component with only one props: `options`
ReactDOM.render(<QRCanvas options={options} />, document.getElementById('app'));
```

`options` is passed to [jsqrgen](https://github.com/gera2ld/jsqrgen).
For more details, see [jsqrgen docs](https://github.com/gera2ld/jsqrgen/wiki).