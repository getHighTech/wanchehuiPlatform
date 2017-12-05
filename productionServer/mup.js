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
      ROOT_URL: 'http://p.10000cars.cn',
      MONGO_URL: "mongodb://wanchehui:Wanchehui112358@139.198.0.131:7017,139.198.0.131:7018,139.198.0.131:7019/wanchehui?replicaSet=foobar&authSource=wanchehui"
    },

    dockerImage: 'abernix/meteord:node-8.4.0-base',
    deployCheckWaitTime: 240
  },


};
