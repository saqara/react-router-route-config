# ReactRouterRouteConfig

Use `route-config` with `react-router`

## Installation
[NPM](https://www.npmjs.com/):
```
$ npm install --save react-router-route-config
```

[Yarn](https://yarnpkg.com/lang/en/):
```
yarn add react-router-route-config
```

## Import
In ES6:
`import { Provider, createReactRouterConfig, createSiteMap, routeConfigToReactRouter, withRouteConfig } from 'react-router-route-config'`

## Use
```js
import { BrowserRouter } from 'react-router-dom'
import { Provider, RouteConfigSiteMap, createReactRouterConfig } from 'react-router-route-config'
import { RouteConfig } from 'route-config'

const Home = () => <div>Home</div>

const routeConfig = new RouteConfig({
  routes: {
    home: {
      config: { reactRouter: { exact: true, render: Home } }
      path: '/home'
    }
  }
}, { configs: [createReactRouterConfig()] })

const App = () => (
  <Provider routeConfig={routeConfig}>
    <BrowserRouter>
      <RouteConfigSiteMap />
    </BrowserRouter>
  </Provider>
```

## API
#### `Provider` (Component)
`Provider` use `React.createContext()` API.

__Props__:
  - `routeConfig` (RouteConfig): instance of `RouteConfig`.

#### `createReactRouterConfig` (Function)
Returns a reactRouter config manager for `RouteConfig`

__Arguments__:
  - [__options={}__] (Object): options passed to `ReactRouterConfig` constructor
    - [`defaultValue={}`] (Object): if you want to have defaultValue when config is set
    - [`name='reactRouter'`] (String): config name

_Ex_:
```js
import { createReactRouterConfig } from 'react-router-route-config'
import { RouteConfig } from 'route-config'

const Home = () => <div>Home</div>

const routeConfig = new RouteConfig({
  routes: {
    home: {
      config: {
        reactRouter: { render: Home }
      },
      path: '/home'
    }
  }
}, { configs: [reactRouterConfig({ defaultValue: { exact: true } })] })
//=> <Route component={Home} exact={true} />
```

#### `RouteConfigSiteMap` (Component)
`React.Component` that generate router tree according to your `routeConfig`

__Props__:
  - [`AnimationComponent`] (React.Component): wrap each `Switch`
  - [`NotFoundComponent`] (React.Component): component to render when no `Route` match in `Switch`
  - [`configName='reactRouter'`] (String): react router config name in routeConfig.

#### `routeConfigToReactRouter` (HOC)
Enable you to use route key rather than path for ReactRouter components.

_Ex_:
```js
import { Link } from 'react-router-dom'
import { routeConfigToReactRouter } from 'react-router-route-config'

const RouteConfigLink = routeConfigToReactRouter(Link)

// Basic
<RouteConfigLink to="home">Home</RouteConfigLink>
//=> <Link to="/home">Home</Link>

// Advanced
/*
  posts: {
    path: '/posts'
    routes: {
      show: { path: '/:postId' }
    }
  }
*/
<RouteConfigLink
  to={{
    key: 'posts.show',
    params: { postId: 1 }
  }}
>Post 1</RouteConfigLink>
//=> <Link to="/posts/1">Home</Link>
```

#### `withRouteConfig` (HOC)
Returns a HOC that inject `routeConfig` in `key` props. By default `routeConfig`

__Arguments__:
  - [__key='routeConfig'__] (String): prop `name` to pass to wrapper component

_Ex_:
```js
import { withRouteConfig } from 'react-router-route-config'

const Button = withRouteConfig()({ routeConfig, to }) => (
  <button onClick={() => window.location.href = routeConfig.url(to)}>
    Button with routeConfig
  </button>
)
```
