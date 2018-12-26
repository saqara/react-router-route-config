import { RouteConfig } from 'route-config'

import { routeConfigToReactRouter } from '../utils'

describe('utils', () => {
  describe('routeConfigToReactRouter', () => {
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
    test('path', () => {
      expect(routeConfigToReactRouter(routeConfig, '/posts')).toBe('/posts')
    })

    test('convert route config key to path', () => {
      expect(
        routeConfigToReactRouter(routeConfig, 'posts')
      ).toEqual('/posts')
    })

    test('object path', () => {
      expect(
        routeConfigToReactRouter(routeConfig, { pathname: '/posts/1' })
      ).toEqual({ pathname: '/posts/1' })
    })

    test('convert route config object to object path', () => {
      const toEqual = { pathname: '/posts/1' }
      expect(
        routeConfigToReactRouter(routeConfig, { pathname: 'posts' })
      ).toEqual({ pathname: '/posts' })
      expect(
        routeConfigToReactRouter(routeConfig, {
          params: { postId: 1 },
          pathname: 'posts.show'
        })
      ).toEqual(toEqual)
      expect(
        routeConfigToReactRouter(routeConfig, {
          key: 'posts.show',
          params: { postId: 1 }
        })
      ).toEqual(toEqual)
    })
  })
})
