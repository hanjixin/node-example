/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584520158283_933';

  // add your middleware config here
  config.middleware = [];

  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: ['connect'],
        packetMiddleware: [],
      },
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  userConfig.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/hank',
      options: {
        useUnifiedTopology: true,
      },
    },
  };
  userConfig.jwt = {
    secret: 'zfpx',
  };
  userConfig.security = {
    csrf: false,
    domainWhiteList: [ '*' ],
  };
  return {
    ...config,
    ...userConfig,
  };
};
