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
