export const routeConfigToReactRouter = (routeConfig, path) => {
  if (typeof path === 'string' && path.charAt(0).match(/[a-z0-9]/)) {
    return { to: routeConfig.url(path) }
  }
  if (typeof path === 'object' && (
    (!path.pathname && path.key) ||
    (path.pathname && path.pathname.charAt(0).match(/[a-z0-9]/))
  )) {
    const { key, params, pathname, ...other } = path
    return {
      to: {
        ...other,
        pathname: key
          ? routeConfig.url(key, params)
          : routeConfig.url(pathname)
      }
    }
  }
  return { to: path }
}
