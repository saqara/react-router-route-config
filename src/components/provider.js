import { createElement } from 'react'

import { Provider as ProviderComponent } from './context'

const Provider = ({ children, routeMap }) => createElement(
  ProviderComponent,
  { value: routeMap },
  children
)

export default Provider
