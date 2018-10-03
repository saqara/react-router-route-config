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
import { Provider, createSiteMap } from 'react-router-route-config'
import { RouteConfig } from 'route-config'

const routeConfig = new RouteConfig({
  routes: {
    home: { path: '/home' }
  }
})
const SiteMap = createSiteMap()

const App = () => (
  <Provider routeConfig={routeConfig}>
    <BrowserRouter>
      <SiteMap />
    </BrowserRouter>
  </Provider>
```

## API
#### `Provider` (Component)
`Provider` use `React.createContext()` API.

__Props__:
  - `routeConfig` (RouteConfig): instance of `RouteConfig`.

#### `createReactRouterConfig` (Function)
Returns an extended `Config` of `route-config` that you can pass to `RouteConfg` constructor to use reactRouter in namespaces or routes config.

__Arguments__:
  - [__options={}__] (Object): options passed to `ReactRouterConfig` constructor
    - [`defaultValue={}`] (Object): if you want to have defaultValue when config is set
    - [`name='reactRouter'`] (String): config name

_Ex_:
```js
import { createReactRouterConfig } from 'react-router-route-config'
import { RouteConfig } from 'route-config'

import Home from './home'

const routeConfig = new RouteConfig({
  routes: {
    home: {
      config: {
        reactRouter: { component: Home }
      },
      path: '/home'
    }
  }
}, {
  configs: [reactRouterConfig({ defaultValue: { exact: true } })]
})
//=> <Route component={Home} exact={true} />
```

#### `createSiteMap` (Function)
Returns `React.Component` that generate router tree according to `routeConfig` object

__Arguments__:
  - [__options={}__] (Object):
    - [`AnimationComponent`] (React.Component): wrap each `Switch`
    - [`NotFoundComponent`] (React.Component): component to render when no `Route` match in `Switch`
    - [`mapConfigName='reactRouter'`] (String): react router config name in routeConfig.

#### `routeConfigToReactRouter` (Function)
HOC that transform props to `react-router` props format.

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

#### `withRouteConfig` (Function)
HOC that pass `Provider` routeConfig to wrapper component

__Arguments__:
  - [__key='routeConfig'__] (String): prop `name` to pass to wrapper component
