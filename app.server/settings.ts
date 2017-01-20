

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
      port: 80, //81,  // elastic beanstalk: the default nginx configuration forwards traffic to an upstream server named nodejs at 127.0.0.1:8081
      dir: 'built/app.client'
    };
  }
}
