import { RouteConfig } from 'route-config'
import { oneOfType, shape, string } from 'prop-types'
import React from 'react'
import TestRenderer from 'react-test-renderer'

import Provider from '../../components/provider'
import routeConfigToReactRouter from '../route_config_to_react_router'

class Link extends React.Component {
  static displayName = 'Link'
  static propTypes = {
    to: oneOfType([shape({ pathname: string.isRequired }), string]).isRequired
  }
  render () {
    return (
      <span>
        {
          typeof this.props.to === 'string'
            ? this.props.to
            : this.props.to.pathname
        }
      </span>
    )
  }
}
const routeConfig = new RouteConfig({
  namespaces: {
    posts: {
      namespaces: {
        show: {
          path: '/:postId',
          routes: { index: {} }
        }
      },
      path: '/posts',
      routes: { index: {} }
    }
  },
  routes: {
    home: { path: '/home' }
  }
})
const RouteConfigLink = routeConfigToReactRouter(Link)
const createLink = to => TestRenderer.create(
  <Provider routeConfig={routeConfig}>
    <RouteConfigLink to={to} />
  </Provider>
)

describe('routeConfigToReactRouter hoc', () => {
  test('not change `to` props', () => {
    const link = createLink('/posts')
    expect(link.root.findByType(Link).props.to).toBe('/posts')
    expect(link.toJSON()).toMatchSnapshot()

    const objectLink = createLink({ pathname: '/posts' })
    expect(objectLink.root.findByType(Link).props.to)
      .toEqual({ pathname: '/posts' })
    expect(objectLink.toJSON()).toMatchSnapshot()
  })

  test('change `to` props', () => {
    const link = createLink('posts')
    expect(link.root.findByType(Link).props.to).toBe('/posts')
    expect(link.toJSON()).toMatchSnapshot()

    const objectLink = createLink({ pathname: 'posts' })
    expect(objectLink.root.findByType(Link).props.to)
      .toEqual({ pathname: '/posts' })
    expect(objectLink.toJSON()).toMatchSnapshot()

    const objectLinkWithParams = createLink({
      key: 'posts.show',
      params: { postId: 1 }
    })
    expect(objectLinkWithParams.root.findByType(Link).props.to)
      .toEqual({ pathname: '/posts/1' })
    expect(objectLinkWithParams.toJSON()).toMatchSnapshot()
  })
})
