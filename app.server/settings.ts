

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
      port: 8081,  // elastic beanstalk: the default nginx configuration forwards traffic to an upstream server named nodejs at 127.0.0.1:8081
      dir: 'built/app.client'
    };
  }
}

export function getWmsUrl(hostHeader: string, protocol: string) {
    //let noTrailingSlashes = hostHeader.replace(/\/+$/, "");
    return protocol + "://" + hostHeader + "/geoserver";
}
