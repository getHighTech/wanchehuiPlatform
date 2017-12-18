// Definition of the links collection

// import { Mongo } from 'meteor/mongo';
// const Orders = new Mongo.Collection('orders');
// //export const Orders = new Mongo.Collection('orders');
//
// if (Meteor.isServer) {
//   console.log("可以构造orders的api");
//     // Global API configuration
//    var Api = new Restivus({
//      auth: {
//         token: 'auth.apiKey',
//         user: function () {
//           return {
//             userId: this.request.headers['user-id'],
//             token: this.request.headers['login-token']
//           };
//         }
//       },
//      useDefaultAuth: true,
//      prettyJson: true,
//
//    });
//     Api.addCollection(Orders);
// }
//
// export {Orders};

import { Mongo } from 'meteor/mongo';

export const Orders = new Mongo.Collection('orders');
