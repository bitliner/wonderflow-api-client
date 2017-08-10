let {ApolloClient, ApolloQueryResult, createNetworkInterface} = require('apollo-client')
let gql = require('graphql-tag')
require('isomorphic-fetch')



module.exports = class WonderflowApiClient {
  constructor(opts) {
    const uri = opts.uri;

    this.client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri,
      }),
    });

  }

  query({query, variables}) {
    return this.client.query({
      query,
      variables
    });
  }

  mutate({mutation, variables}) {
    this.client.mutate({
      mutation,
      variables
    });
  }


}

// let client = new ApolloClient({
//   networkInterface: createNetworkInterface({
//     uri: 'http://localhost:3000/graphql',
//   }),
// })

// let query = gql.default`
//   query {
//     __schema {
//       types{name}
//     }    
//   }
// `

// let vars = {
//   username: process.env.USERNAME,
//   password: process.env.PASSWORD,
// }

// client.query({
//   query
// }).then((results) => {
//   console.log(results)
// //do something useful
// })


