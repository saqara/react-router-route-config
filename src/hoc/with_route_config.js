import { createElement } from 'react'

import { Consumer } from '../components/context'
import { propKey } from '../constants'

export default (key = propKey) =>
  Comp => {
    const WithRouteConfig = props =>
      createElement(
        Consumer,
        null,
        value => createElement(Comp, { ...props, [key]: value })
      )
    if (process.env.NODE_ENV === 'development') {
      WithRouteConfig.displayName = `withRouteConfig(${Comp.displayName || Comp.name})`
    }
    return WithRouteConfig
  }
