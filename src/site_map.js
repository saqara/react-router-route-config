import { func, object, oneOfType, string } from 'prop-types'

import { configName as defaultConfigName } from './constants'
import renderNamespace from './render_namespace'
import withRouteConfig from './hoc/with_route_config'

const RouteConfigSiteMap = ({ routeConfig, ...options }) =>
  renderNamespace(routeConfig.getMap(), options)

if (process.env.NODE_ENV === 'development') {
  const componentType = oneOfType([func, object])
  RouteConfigSiteMap.displayName = 'SiteMap'
  RouteConfigSiteMap.propTypes = {
    AnimationComponent: componentType,
    NotFoundComponent: componentType,
    configName: string,
    routeConfig: object.isRequired
  }
}
RouteConfigSiteMap.defaultProps = {
  configName: defaultConfigName
}

export default withRouteConfig()(RouteConfigSiteMap)
