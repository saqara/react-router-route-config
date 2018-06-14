import { Config } from 'route-config'

import { configName } from './constants'

class ReactRouterConfig extends Config {
  constructor (name = configName, defaultValue = {}) {
    super(name)
    this.defaultValue = defaultValue
  }

  merge (...values) {
    return values.reduce((acc, value) => ({ ...acc, ...this.set(value) }), {})
  }
  set (value = {}) {
    return Object.assign({}, this.defaultValue, value)
  }
}

export default ({ defaultValue, name }) => new ReactRouterConfig(name, defaultValue)
