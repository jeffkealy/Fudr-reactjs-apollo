module.exports = {
    //MongoDB configuration
    development: {
        db: 'mongodb://localhost:27017/fudrV2',
        app: {
            name: 'local',
            description: 'mongodb://localhost:27017/fudrV2'
        }
    },
    production: {
        db: 'mongodb://'+process.env.dbuser+':'+process.env.dbpassword+'@ds123259.mlab.com:23259/heroku_v7s1675b',
        app: {
            name: 'mlab',
            description: 'mongodb://'+'dbuser'+':'+'dbpassword'+'@ds123259.mlab.com:23259/heroku_v7s1675b'

        }
    }
};
