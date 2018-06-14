import { createElement } from 'react'
import { object, oneOfType, string } from 'prop-types'

import withRouteMap from './with_route_config'

export default (Comp) => {
  const Wrapper = ({ routeMap, to, ...other }) => {
    const compProps = { to, ...other }
    let route

    if (typeof to === 'string' && to.charAt(0).match(/[a-z0-9]/)) {
      compProps.to = routeMap.url(to)
      route = routeMap.getRoute(to)
    } else if (typeof to === 'object' && (
      (!to.pathname && to.key) ||
      (to.pathname && to.pathname.charAt(0).match(/[a-z0-9]/))
    )) {
      compProps.to = {
        ...to,
        pathname:
          (to.key)
            ? routeMap.url(to.key, to.params)
            : routeMap.url(to.pathname)
      }
      route = (to.key) ? routeMap.getRoute(to.key) : routeMap.getRoute(to.pathname)

      if (to.key) {
        delete compProps.to.key
        delete compProps.to.params
      }
    }
    return createElement(Comp, { ...compProps, route })
  }
  if (process.env.NODE_ENV === 'development') {
    Wrapper.displayName = 'ReactRouterMap'
    Wrapper.propTypes = {
      routeMap: object.isRequired,
      to: oneOfType([object, string]).isRequired
    }
  }
  return withRouteMap()(Wrapper)
}
