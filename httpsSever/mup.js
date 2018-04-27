module.exports = {

  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: 'carhub.vip',
      username: 'root',
      password: ']Jn9Q?-C)T)G9)_G'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'test_wanchehui_p_https',
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
      ROOT_URL: 'https://carhub.vip',
      MONGO_URL: 'mongodb://wanchehui:Wanchehui112358@139.198.3.158:27017/wanchehui',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true,
    deployCheckWaitTime: 600
    
  },
  proxy: {
    domains: 'carhub.vip',
    ssl: {
      letsEncryptEmail: 'xsqfeather@gmail.com'
    }
  },

};
