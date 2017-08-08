module.exports = {
  servers: {
    one: {
      host: '107.191.61.140',
      username: 'root',
      // pem:
      password: 'x.C6SThUT#6v4WR_'
      // or leave blank for authenticate from ssh-agent
    }
  },


  meteor: {
    name: 'wanchehui',
    path: '../',
    // "setupMongo": true,
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: 80,
      // CDN_URL: "http://wanchehui.cosgoal.com",
      ROOT_URL: 'http://testwanchehui.cosgoal.com',
      MONGO_URL: "mongodb://myTester:xyz123@45.77.20.138:27017/test"
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 240
  },


};
