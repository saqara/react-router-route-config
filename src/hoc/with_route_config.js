import { createElement } from 'react'

import { Consumer } from '../components/context'
import { propKey } from '../constants'

export default (key = propKey) => {
  const WithRouteConfig = BaseComp => props =>
    createElement(
      Consumer,
      null,
      value => createElement(BaseComp, { ...props, [key]: value })
    )
  if (process.env.NODE_ENV === 'development') {
    WithRouteConfig.displayName = 'WithRouteConfig'
  }
  return WithRouteConfig
}
