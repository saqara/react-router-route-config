import { Route } from 'react-router-dom'
import { createElement } from 'react'

const renderRoute = (route, { configName }) => {
  const {
    children,
    component,
    render,
    ...routeProps
  } = route.config[configName]
  return createElement(Route, {
    ...routeProps,
    key: route.id,
    path: route.fullPath,
    render: props => {
      if (component) {
        return createElement(component, { ...props, route })
      } else if (render) {
        return render({ ...props, route })
      }
      return children({ ...props, route })
    }
  })
}

export default renderRoute
