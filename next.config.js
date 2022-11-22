const withPWA = require('next-pwa')({
    dest: 'public',
    skipWaiting: true,
    register: true,
    disable: process.env.NODE_ENV === 'development'
  })
  
  module.exports = withPWA({
    // next.js config
    reactStrictMode: true,
    i18n: {
      locales: ['en-US', 'fr', 'nl-NL'],
      defaultLocale: 'en-US',
    },
    images: {
        domains: ['links.papareact.com', 'images.unsplash.com']
    },
    env: {
        mongodbURI: process.env.MONGODB_URI,
        secret_key: process.env.SECRET_KEY
    }
  })
