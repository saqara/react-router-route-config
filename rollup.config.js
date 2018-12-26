import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

import pkg from './package.json'

const commonJsConfig = {
  namedExports: {
    'node_modules/prop-types/index.js': [
      'func',
      'object',
      'oneOfType',
      'string'
    ],
    'node_modules/react/index.js': ['createElement']
  }
}

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: {
      file: 'lib/react-router-route-config.js',
      format: 'cjs',
      indent: false
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel({ exclude: 'node_modules/**' }),
      commonjs(commonJsConfig)
    ]
  },

  // ES
  {
    input: 'src/index.js',
    output: {
      file: 'es/react-router-route-config.js',
      format: 'es',
      indent: false
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel({ exclude: 'node_modules/**' }),
      commonjs(commonJsConfig)
    ]
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: {
      file: 'es/react-router-route-config.mjs',
      format: 'es',
      indent: false
    },
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel(),
      commonjs(commonJsConfig),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-router-route-config.js',
      format: 'umd',
      name: 'ReactRouterRouteConfig',
      indent: false
    },
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel(),
      commonjs(commonJsConfig),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') })
    ]
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-router-route-config.min.js',
      format: 'umd',
      name: 'ReactRouterRouteConfig',
      indent: false
    },
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel(),
      commonjs(commonJsConfig),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
]
