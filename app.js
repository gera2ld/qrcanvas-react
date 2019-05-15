const menu = $('#menu');
const content = $('#content');
const LOADER = '<div class="loading loading-lg"></div>';
const demos = [
  { name: 'Simple', path: 'simple' },
  { name: 'Input', path: 'input' },
  { name: 'Logo', path: 'logo' },
  { name: 'Unicode', path: 'unicode' },
];
const { createElement } = JSX;
let active;
demos.forEach(item => {
  menu.append(createElement('li', {
    className: 'menu-item',
  }, item.el = createElement('a', {
    href: `#${item.path}`,
    textContent: item.name,
  })));
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
  'qrcanvas-react': {
    exports: qrcanvas.react,
  },
};

window.addEventListener('hashchange', handleHashChange, false);
handleHashChange();

FallbackJs.ok();

function requireModule(name) {
  const module = modules[name];
  if (!module) throw new Error(`Module not found: ${name}`);
  return module.exports;
}

async function downloadUrl(url) {
  const res = await fetch(url);
  return res.text();
}

async function loadModule(name, url) {
  const code = await downloadUrl(url);
  const fn = new Function('require', 'module', 'exports', code);
  const module = {
    exports: {},
  };
  fn(requireModule, module, module.exports);
  modules[name] = module;
}

function handleHashChange() {
  const path = window.location.hash.slice(1);
  const item = demos.find(item => item.path === path) || demos[0];
  showDemo(item);
}

async function showDemo(demo) {
  if (active) active.el.classList.remove('active');
  active = demo;
  active.el.classList.add('active');
  content.innerHTML = LOADER;
  const item = await loadResource(demo);
  content.innerHTML = '';
  let container;
  content.append(
    createElement('h3', { textContent: item.name }),
    container = createElement('div', {
      className: 'my-2 text-center',
    }),
    createElement('pre', {
      className: 'code',
    }, createElement('code', {
      innerHTML: Prism.highlight(item.source, Prism.languages.javascript),
    })),
  );
  const fn = new Function('require', 'module', 'exports', item.code);
  const module = {
    exports: {},
  };
  fn(requireModule, module, module.exports);
  ReactDOM.render(React.createElement(module.exports.default || module.exports), container);
}

async function loadResource(item) {
  if (item.code) return item;
  const source = await downloadUrl(`data/${item.path}.js`);
  item.source = source;
  item.code = Babel.transform(source, {
    presets: [
      'es2015',
      'react',
      ['stage-2', { decoratorsLegacy: true }],
    ],
  }).code;
  return item;
}

function $(selector) {
  return document.querySelector(selector);
}
