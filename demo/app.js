const menu = $('#menu');
const content = $('#content');
const LOADER = '<div class="loading loading-lg"></div>';
const demos = [
  { name: 'Simple', path: 'simple' },
  { name: 'Input', path: 'input' },
  { name: 'Logo', path: 'logo' },
];
let active;
demos.forEach(item => {
  menu.append(createElement('li', {
    className: 'menu-item',
  }, [
    item.el = createElement('a', {
      href: `#${item.path}`,
      textContent: item.name,
    }),
  ]));
});
const modules = {
  react: {
    exports: React,
  },
  'react-dom': {
    exports: ReactDOM,
  },
  qrcanvas: {
    exports: qrcanvas,
  },
};

const preparing = initialize();
window.addEventListener('hashchange', handleHashChange, false);
handleHashChange();

// FallbackJs.ok();

function initialize() {
  return loadModule('qrcanvas-react', 'https://unpkg.com/qrcanvas-react');
}

function requireModule(name) {
  const module = modules[name];
  if (!module) throw new Error(`Module not found: ${name}`);
  return module.exports;
}

function loadModule(name, url) {
  return fetch(url)
  .then(res => res.text())
  .then(code => {
    const fn = new Function('require', 'module', 'exports', code);
    const module = {
      exports: {},
    };
    fn(requireModule, module, module.exports);
    modules[name] = module;
  });
}

function handleHashChange() {
  const path = window.location.hash.slice(1);
  const item = demos.find(item => item.path === path) || demos[0];
  showDemo(item);
}

function showDemo(item) {
  if (active) active.el.classList.remove('active');
  active = item;
  active.el.classList.add('active');
  content.innerHTML = LOADER;
  Promise.all([
    loadResource(item),
    preparing,
  ])
  .then(([item]) => {
    content.innerHTML = '';
    let container;
    content.append(
      createElement('h3', { textContent: item.name }),
      container = createElement('div', {
        className: 'my-2 text-center',
      }),
      createElement('pre', {
        className: 'language-js',
      }, [
        createElement('code', {
          className: 'language-js',
          innerHTML: Prism.highlight(item.source, Prism.languages.javascript),
        }),
      ]),
    );
    const fn = new Function('require', 'module', 'exports', item.code);
    const module = {
      exports: {},
    };
    fn(requireModule, module, module.exports);
    ReactDOM.render(React.createElement(module.exports.default || module.exports), container);
  });
}

function loadResource(item) {
  if (item.code) return Promise.resolve(item);
  return fetch(`data/${item.path}.js`).then(res => res.text())
  .then(source => {
    item.source = source;
    item.code = Babel.transform(source, {
      presets: [
        'es2015',
        'react',
        ['stage-2', { decoratorsLegacy: true }],
      ],
    }).code;
    return item;
  });
}

function $(selector) {
  return document.querySelector(selector);
}

function createElement(tagName, props, children) {
  const el = document.createElement(tagName);
  if (props) {
    Object.keys(props).forEach(key => {
      const value = props[key];
      if (key === 'on') {
        bindEvents(el, value);
      } else {
        el[key] = value;
      }
    });
  }
  if (children) {
    children.forEach(child => {
      el.append(child);
    });
  }
  return el;
}

function bindEvents(el, events) {
  if (events) {
    Object.keys(events).forEach(type => {
      const handle = events[type];
      if (handle) el.addEventListener(type, handle);
    });
  }
  return el;
}
