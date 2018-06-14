import { Route, Switch } from 'react-router-dom'
import { createElement } from 'react'
import { object } from 'prop-types'

import withRouteMap from './hoc/with_route_config'
import { configName } from './constants'

export default ({
  AnimationComponent,
  NotFoundComponent,
  mapConfigName = configName
}) => {
  const renderRoute = (route) => {
    const { children, component, render, ...routeProps } = route.config[mapConfigName]
    return createElement(Route, {
      ...routeProps,
      key: route.id,
      path: route.fullPath,
      render: (props) => {
        if (component) {
          return createElement(component, { ...props, route })
        } else if (render) {
          return render({ ...props, route })
        }
        return children({ ...props, route })
      }
    })
  }

  const renderMap = (namespace) => {
    if (namespace.fullPath) {
      return createElement(Route, {
        key: namespace.key,
        path: namespace.fullPath,
        render: renderNamespace(namespace)
      })
    }
    return createElement(Route, { render: renderNamespace(namespace) })
  }

  const renderNamespace = (namespace) =>
    (routerProps) => {
      const namespaces = Object.keys(namespace.namespaces || {}).map(
        key => namespace.namespaces[key]
      )
      const routes = Object.keys(namespace.routes || {}).map(key => namespace.routes[key])

      let element = null
      if (namespaces.length > 0 || routes.length > 0) {
        element = createElement(
          Switch,
          { location: routerProps.location },
          namespaces.map(renderMap),
          routes.map(renderRoute),
          NotFoundComponent && createElement(Route, {
            render: props => createElement(NotFoundComponent, { ...props })
          })
        )
      }
      if (AnimationComponent) {
        element = createElement(AnimationComponent, {}, element)
      }
      return element
    }

  const SiteMap = ({ routeMap }) => renderMap(routeMap.getMap())
  if (process.env.NODE_ENV === 'development') {
    SiteMap.displayName = 'SiteMap'
    SiteMap.propTypes = {
      routeMap: object.isRequired
    }
  }
  return withRouteMap()(SiteMap)
}
