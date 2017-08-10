const {GraphqlClient, gql} = require('../');


// CREATE THE CLIENT
const uri = 'http://localhost:3000/graphql';
const client = new GraphqlClient({
  uri
})

// RUN A QUERY
client
  .query({
    query: gql`query {
    success    
  }`,
    variables: {

    }
  })
  .then((result) => {
    console.log('RESULT', result.data);
  })
  .catch((err) => {
    throw err;
  });