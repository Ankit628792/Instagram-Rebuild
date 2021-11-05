module.exports = {
    images: {
        domains: ['links.papareact.com', 'images.unsplash.com']
    },
    env: {
        mongodbURI: process.env.MONGODB_URI,
        secret_key: process.env.SECRET_KEY
    }
}