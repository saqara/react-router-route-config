import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import TestRenderer from 'react-test-renderer'

import { configName as defaultConfigName } from '../constants'
import renderRoute from '../render_route'

describe('renderRoute', () => {
  const customConfigName = 'customConfigName'
  const config = {
    exact: true,
    // eslint-disable-next-line
    render: () => <div>Hello World!!!</div>
  }
  const route = {
    config: {
      [customConfigName]: config,
      [defaultConfigName]: config
    },
    id: 'home',
    key: 'home',
    fullPath: '/home'
  }
  const createRoute = children => TestRenderer.create(
    <MemoryRouter initialEntries={['/home']}>
      {children}
    </MemoryRouter>
  )
  const testByConfigName = (configName = defaultConfigName) => {
    const routeElement = renderRoute(route, { configName })
    expect(routeElement.props).toMatchObject({
      exact: true,
      path: route.fullPath
    })
    const renderedRoute = createRoute(routeElement)
    const resJSON = renderedRoute.toJSON()
    expect(resJSON).toEqual(TestRenderer.create(config.render()).toJSON())
    expect(resJSON).toMatchSnapshot()
  }

  test('render component using default config name', () => {
    testByConfigName()
  })

  test('render component using custom config name', () => {
    testByConfigName(customConfigName)
  })
})
