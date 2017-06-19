

export function getEnvironmentSettings(env: string) {
  if (env === 'development') {
    return {
      name: env,
      dev: true,
      port: 5000,
      dir: 'app.client'
    };
  }
  else {
    return {
      name: env,
      dev: false,
      port: 8081,  // elastic beanstalk: the default nginx configuration forwards traffic to an upstream server named nodejs at 127.0.0.1:8081
      dir: 'built/app.client'
    };
  }
}

export function getRealWmsUrl(env, hostHeader: any, protocol: string) {
  if (env === 'development') {
    // no local dev geoserver (yet), so use the live one for convenience
    return "http://deli-live.eu-west-1.elasticbeanstalk.com/geoserver";
  }
  else {
    return protocol + "://" + hostHeader + "/geoserver";
  }
}
