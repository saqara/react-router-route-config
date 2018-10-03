export const routeConfigToReactRouter = (routeConfig, path) => {
  if (typeof path === 'string' && path.charAt(0).match(/[a-z0-9]/)) {
    return {
      route: routeConfig.getRoute(path),
      to: routeConfig.url(path)
    }
  }
  if (typeof path === 'object' && (
    (!path.pathname && path.key) ||
    (path.pathname && path.pathname.charAt(0).match(/[a-z0-9]/))
  )) {
    const { key, params, pathname, ...other } = path
    return {
      route: key
        ? routeConfig.getRoute(key)
        : routeConfig.getRoute(pathname),
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
