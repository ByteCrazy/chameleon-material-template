import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// 开发模式默认读取 index.html 作为开发模式入口
// entry 作为打包库入口
const LIB_NAME = process.env.LIB_NAME;
let buildConfig: any = {
  entry: './src/index.tsx',
  vite: {
    publicDir: 'public-dev',
    define: {
      __PACKAGE_VERSION__: JSON.stringify(require('./package.json').version),
      __PACKAGE_NAME__: JSON.stringify(require('./package.json').name),
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    },
    plugins: [
      monacoEditorPlugin({}),
      {
        name: 'hot-reload-component-lib',
        configureServer(server) {
          server.watcher
            .add(['./public-dev/**/*'])
            .on('change', (path, stats) => {
              server.ws.send('materialComponent:change', {
                msg: 'hello232323',
                path,
                stats,
              });
            });
        },
      },
    ],
  },
};

if (LIB_NAME) {
  const libConfig = {
    entry: './src/index.tsx',
    libName: 'ChameleonMaterialDemo',
    formats: process.env.DEV ? ['umd'] : ['es', 'cjs', 'umd'],
    fileName: 'index',
    external: ['react'],
    global: {
      react: 'React',
    },
    // 额外的 vite 配置
    vite: {
      build: {
        copyPublicDir: false,
        emptyOutDir: process.env.DEV ? false : true,
        outDir: process.env.DEV ? 'public-dev' : 'dist',
      },
      define: {
        __PACKAGE_VERSION__: JSON.stringify(require('./package.json').version),
        __PACKAGE_NAME__: JSON.stringify(require('./package.json').name),
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      },
    },
  };

  const metaConfig = {
    entry: './src/meta.tsx',
    libName: 'ChameleonMaterialDemoMeta',
    formats: ['es', 'cjs'],
    fileName: 'meta',
    external: ['react'],
    global: {
      react: 'React',
    },
    // 额外的 vite 配置
    vite: {
      build: {
        outDir: process.env.DEV ? 'public-dev' : 'dist',
        copyPublicDir: false,
        emptyOutDir: false,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css' && LIB_NAME !== 'index')
            return `${LIB_NAME}.css`;
          return assetInfo.name;
        },
        lib: {
          fileName: (format) => {
            if (format === 'es') {
              return 'meta.js';
            } else {
              return `meta.${format}.js`;
            }
          },
        },
      },
      define: {
        __PACKAGE_VERSION__: JSON.stringify(require('./package.json').version),
        __PACKAGE_NAME__: JSON.stringify(require('./package.json').name),
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      },
    },
  };

  buildConfig = libConfig;
  if (process.env.LIB_NAME === 'meta') {
    buildConfig = metaConfig;
  }
}

module.exports = buildConfig;
