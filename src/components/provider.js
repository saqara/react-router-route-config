import { createElement } from 'react'

import { Provider as ProviderComponent } from './context'

const Provider = ({ children, routeConfig }) => createElement(
  ProviderComponent,
  { value: routeConfig },
  children
)

export default Provider
