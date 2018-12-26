import { MemoryRouter } from 'react-router-dom'
import { RouteConfig } from 'route-config'
import React from 'react'
import TestRenderer from 'react-test-renderer'

import { configName as defaultConfigName } from '../constants'
import reactRouterConfig from '../config'
import renderNamespace from '../render_namespace'

const createConfig = (configName = defaultConfigName) => new RouteConfig({
  namespaces: {
    posts: {
      namespaces: {
        show: {
          config: {
            [configName]: {
              // eslint-disable-next-line
              namespaceComponent: ({ children }) =>
                <div>
                  <p>Posts namespace</p>
                  {children}
                </div>
            }
          },
          path: '/:postId',
          routes: {
            index: {
              config: {
                [configName]: {
                  // eslint-disable-next-line
                  render: ({ match: { params: { postId } } }) =>
                    <div>{`Post ${postId}`}</div>
                }
              }
            }
          }
        }
      },
      path: '/posts',
      routes: {
        index: {
          config: {
            [configName]: {
              // eslint-disable-next-line
              render: () => <div>Posts</div>
            }
          }
        }
      }
    }
  },
  routes: {
    home: {
      config: {
        // eslint-disable-next-line
        [configName]: { render: () => <div>Home</div> }
      },
      path: '/home'
    }
  }
}, {
  configs: [reactRouterConfig({
    defaultValue: { exact: true },
    name: configName
  })]
})

describe('renderNamespace', () => {
  const customConfigName = 'customConfigName'
  const createNamespace = (path, children) =>
    TestRenderer.create(
      <MemoryRouter initialEntries={[path]}>
        {children}
      </MemoryRouter>
    )
  const testByConfigName = (path, toEqual, configName = defaultConfigName) => {
    const routeConfig = createConfig(configName)
    const namespace = routeConfig.getMap()
    const renderedNamespace = createNamespace(
      path,
      renderNamespace(namespace, { configName })
    )
    const resJSON = renderedNamespace.toJSON()
    expect(resJSON).toEqual(TestRenderer.create(toEqual).toJSON())
    expect(resJSON).toMatchSnapshot()
  }

  test('render component using default config name', () => {
    testByConfigName('/posts', <div>Posts</div>)
  })

  test('render component using custom config name', () => {
    testByConfigName('/posts', <div>Posts</div>, customConfigName)
  })

  test(
    'render posts.show with namespace layout using default config name',
    () => {
      testByConfigName('/posts/1', (
        <div>
          <p>Posts namespace</p>
          <div>Post 1</div>
        </div>
      ))
    }
  )

  test(
    'render posts.show with namespace layout using custom config name',
    () => {
      testByConfigName('/posts/1', (
        <div>
          <p>Posts namespace</p>
          <div>Post 1</div>
        </div>
      ), customConfigName)
    }
  )
})
