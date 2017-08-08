module.exports = {
  servers: {
    one: {
      host: '45.76.54.233',
      username: 'root',
      // pem:
      password: '9Lb_E_8s37%uuBYr'
      // or leave blank for authenticate from ssh-agent
    }
  },


  meteor: {
    name: 'wanchehuiPlatform',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: 80,
      CDN_URL: "http://wanchehui.cosgoal.com",
      ROOT_URL: 'http://platform.cosgoal.com',
      MONGO_URL: "mongodb://simontaosim:7686043104xsq@45.77.20.138:27017/wanchehui"
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 240
  },


};
