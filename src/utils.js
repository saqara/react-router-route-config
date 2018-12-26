export const routeConfigToReactRouter = (routeConfig, path) => {
  if (typeof path === 'string' && path.charAt(0) !== '/') {
    return routeConfig.url(path)
  }
  if (path && (
    path.key || (path.pathname && path.pathname.charAt(0) !== '/')
  )) {
    const { key, params, pathname, ...other } = path
    return {
      ...other,
      pathname: key
        ? routeConfig.url(key, params)
        : routeConfig.url(pathname, params)
    }
  }
  return path
}
