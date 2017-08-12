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
      ROOT_URL: 'http://platform.cosgoal.com',
      MONGO_URL: "mongodb://simontaosim:7686043104xsq@45.77.20.138:27017/wanchehui"
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
