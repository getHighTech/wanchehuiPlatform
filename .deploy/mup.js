module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '139.198.12.188',
      username: 'simon',
      password: 'xsq@519'
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
      ROOT_URL: 'http://p.10000cars.cn',
      MONGO_URL: 'mongodb://wanchehui:Wanchehui112358@139.198.0.131:7017,139.198.0.131:7018,139.198.0.131:7019/wanchehui?replicaSet=foobar&authSource=wanchehui',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true,
    deployCheckWaitTime: 1000,
  },

}
