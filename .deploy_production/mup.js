module.exports = {
  servers: {
    one: {
      host: '118.190.201.161',
      username: 'root',
      // pem:
      password: '7686043104Xsq@519'
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
      ROOT_URL: 'http://p.cosgoal.com',
      MONGO_URL: "mongodb://120.27.22.78:27017/wanchehui"
    },

    docker: {
     // Change the image to 'kadirahq/meteord' if you
     // are using Meteor 1.3 or older
     image: 'abernix/meteord:base' , // (optional)
     imagePort: 80, // (optional, default: 80)

     // (optional) Only used if using your own ssl certificates.
     // Default is "meteorhacks/mup-frontend-server"
     imageFrontendServer: 'meteorhacks/mup-frontend-server',
     // lets you bind the docker container to a
     // specific network interface (optional)


   },
  },


};
