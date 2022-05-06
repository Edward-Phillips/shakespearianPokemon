module.exports = {
  experimental: {
    outputStandalone: true,
  },
  env: {
    POKEAPI_ADDRESS: process.env.POKEAPI_ADDRESS,
    FUNTRANSLATIONS_API_SECRET: process.env.FUNTRANSLATIONS_API_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    
    return config
  },
}
