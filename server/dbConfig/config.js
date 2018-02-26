module.exports = {
    //MongoDB configuration
    development: {
        db: 'mongodb://localhost:27017/fudr',
        app: {
            name: 'local'
        }
    },
    production: {
        db: 'mongodb://'+process.env.username+':'+process.env.password +'@ds133428.mlab.com:33428/heroku_h099xt12',
        app: {
            name: 'mlab'
        }
    }
};
