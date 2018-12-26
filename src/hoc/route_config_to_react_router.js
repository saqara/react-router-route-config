import { createElement } from 'react'
import { object, oneOfType, string } from 'prop-types'

import { routeConfigToReactRouter } from '../utils'

import withRouteConfig from './with_route_config'

export default (Comp) => {
  const RouteConfigToReactRouter = ({ routeConfig, to, ...other }) =>
    createElement(Comp, {
      ...other,
      to: routeConfigToReactRouter(routeConfig, to)
    })
  if (process.env.NODE_ENV === 'development') {
    RouteConfigToReactRouter.displayName = `routeConfigToReactRouter(${Comp.displayName || Comp.name})`
    RouteConfigToReactRouter.propTypes = {
      routeConfig: object.isRequired,
      to: oneOfType([object, string]).isRequired
    }
  }
  return withRouteConfig()(RouteConfigToReactRouter)
}
