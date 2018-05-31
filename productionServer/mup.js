module.exports = {
  servers: {
    one: {
      host: '139.198.3.158',
      username: 'simon',
      password: 'wanchehui112358'
    }
  },
  app: {
    // TODO: change app name and path
    name: 'wanchehui',
    path: '../',
    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://p.10000cars.cn',
      MONGO_URL: "mongodb://wanchehui:Wanchehui112358@139.198.0.131:7017,139.198.0.131:7018,139.198.0.131:7019/wanchehui?replicaSet=foobar&authSource=wanchehui"
    },
    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.9.4-base',
    },
        // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true,
    deployCheckWaitTime: 600
  },
  proxy: {
    domains: 'p.10000cars.cn',
    ssl: {
      letsEncryptEmail: 'xsqfeather@126.com',
    }
  },

};
