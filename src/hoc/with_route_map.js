import { createElement } from 'react'

import { Consumer } from '../components/context'
import { propKey } from '../constants'

export default (key = propKey) =>
  BaseComp =>
    (props) =>
      createElement(
        Consumer,
        null,
        value => createElement(BaseComp, { ...props, [key]: value })
      )
