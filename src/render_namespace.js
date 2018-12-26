import { Route, Switch } from 'react-router-dom'
import { createElement } from 'react'

import renderRoute from './render_route'

const renderNamespace = (namespace, options) => {
  const { config, fullPath, key, namespaces = {}, routes = {} } = namespace
  const { AnimationComponent, NotFoundComponent, configName } = options

  const render = (routerProps) => {
    const subNamespaces = Object.keys(namespaces).map(key => namespaces[key])
    const subRoutes = Object.keys(routes).map(key => routes[key])

    let element = null
    if (subNamespaces.length > 0 || subRoutes.length > 0) {
      element = createElement(
        Switch,
        { location: routerProps.location },
        subNamespaces.map(n => renderNamespace(n, options)),
        subRoutes.map(r => renderRoute(r, options)),
        NotFoundComponent && createElement(Route, {
          render: props => createElement(NotFoundComponent, { ...props })
        })
      )
    }
    if (AnimationComponent) {
      element = createElement(AnimationComponent, {}, element)
    }
    if (config && config[configName].namespaceComponent) {
      element = createElement(
        config[configName].namespaceComponent,
        { ...routerProps, namespace },
        element
      )
    }
    return element
  }

  if (fullPath) {
    return createElement(Route, { key, path: fullPath, render })
  }
  return createElement(Route, { render })
}

export default renderNamespace
