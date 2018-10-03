import { createElement } from 'react'
import { object, oneOfType, string } from 'prop-types'

import { routeConfigToReactRouter } from '../utils'

import withRouteConfig from './with_route_config'

export default (Comp) => {
  const Wrapper = ({ routeConfig, to, ...other }) => createElement(Comp, {
    ...other,
    ...routeConfigToReactRouter(routeConfig, to)
  })
  if (process.env.NODE_ENV === 'development') {
    Wrapper.displayName = 'RouteConfigToReactRouter'
    Wrapper.propTypes = {
      routeConfig: object.isRequired,
      to: oneOfType([object, string]).isRequired
    }
  }
  return withRouteConfig()(Wrapper)
}
