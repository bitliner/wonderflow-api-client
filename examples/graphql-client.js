const {GraphqlClient, gql} = require('../');

const uri = 'http://localhost:3000/graphql';

let client = new GraphqlClient({
  uri
})
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