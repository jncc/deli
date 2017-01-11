

export function getEnvironmentSettings(env: string) {
  if (env === 'development') {
    return {
      name: env,
      port: 5000,
      dir: 'app.client'
    };
  }
  else {
    return {
      name: env,
      port: 8081,
      dir: 'built/app.client'
    };
  }
}
