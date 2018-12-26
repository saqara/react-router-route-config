import { RouteConfig } from 'route-config'
import { string } from 'prop-types'
import React from 'react'
import TestRenderer from 'react-test-renderer'

import Provider from '../../components/provider'
import withRouteConfig from '../with_route_config'

class HasRouteConfig extends React.Component {
  static displayName = 'HasRouteConfig'
  static propTypes = {
    name: string
  }
  static defaultProps = {
    name: 'routeConfig'
  }
  render () {
    return this.props[this.props.name] && <span>Has Route Config ;)</span>
  }
}
const routeConfig = new RouteConfig({
  routes: {
    home: { path: '/home' }
  }
})
const createComp = name => {
  const Component = withRouteConfig(name)(HasRouteConfig)
  return TestRenderer.create(
    <Provider routeConfig={routeConfig}>
      <Component name={name} />
    </Provider>
  )
}

describe('withRouteConfig hoc', () => {
  test('default prop name', () => {
    const comp = createComp()
    expect(comp.root.findByType(HasRouteConfig).props.routeConfig)
      .toBe(routeConfig)
    expect(comp.toJSON()).toMatchSnapshot()
  })

  test('custom prop name', () => {
    const comp = createComp('map')
    expect(comp.root.findByType(HasRouteConfig).props.map).toBe(routeConfig)
    expect(comp.toJSON()).toMatchSnapshot()
  })
})
