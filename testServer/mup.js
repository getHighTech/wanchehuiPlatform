module.exports = {
  servers: {
    one: {
      host: '139.198.3.158',
      username: 'simon',
      // pem:
      password: 'wanchehui112358'
      // or leave blank for authenticate from ssh-agent
    }
  },


  meteor: {
    name: 'wanchehui_platform_test',
    path: '../../',
    // "setupMongo": true,
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: 8080,
      // CDN_URL: "http://wanchehui.cosgoal.com",
      ROOT_URL: 'http://p.10000cars.cn',
      MONGO_URL: "mongodb://wanchehui:Wanchehui112358@139.198.3.158:27017/wanchehui"
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 240
  },


};