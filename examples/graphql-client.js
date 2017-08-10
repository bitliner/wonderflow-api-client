const {GraphqlClient, gql} = require('../');


// CREATE THE CLIENT
const uri = 'http://localhost:3000/graphql';
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const productName = 'prodottoWOW';
const client = new GraphqlClient({
  uri,
  email,
  password,
})

// EXAMPLE OF A SIMPLE QUERY
// client
//   .query({
//     query: gql`query {
//     success    
//   }`,
//     variables: {

//     }
//   })
//   .then((result) => {
//     console.log('RESULT', result.data);
//   })
//   .catch((err) => {
//     throw err;
//   });

// EXAMPLE LOGIN
client
  // EXAMPLE OF SIMPLE QUERY
  .query({
    query: gql`query {
        success    
    }`
  })
  // RESULT OF SIMPLE QUERY
  .then((result) => {
    console.log('');
    console.log('');
    console.log('RESULT', result.data.success);
  })
  // EXAMPLE OF LOGIN
  .then(() => {
    return client.mutate({
      mutation: gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            error
            token
            user {
              _id
              active
              company {
                name
              }
              created
              email
            }
          }
        }
      `,
      variables: {
        email,
        password,
      },
    });
  })
  // EXAMPLE OF PARSING LOGIN RESPONSE
  .then((result) => {
    console.log('');
    console.log('');
    console.log('RESULT', 'EXAMPLE PARSING LOGIN RESPONSE', 'TOKEN', result.data.login.token);
    console.log('');
    console.log('');
    console.log('RESULT', 'EXAMPLE PARING LOGIN RESPONSE', 'USER', result.data.login.user);
    return result.data.login.token;
  })
  // EXAMPLE OF AUTHENTICATED REQUEST: "ACCESS RATING BREAKDOWN OF A PRODUCT"
  .then((token) => {
    return client.query({
      query: gql`
        query query($token: String!, $productName: String!) {
            query(token: $token) {
                error
                user {
                    products(where: { name: { _eq: $productName } }) {
                        name
                        brandName
                        quantitativeAnalysis {
                            ratingDistribution {
                                _1
                                _2
                                _3
                                _4
                                _5
                            }
                        }
                    }
                }
            }
            }
      `,
      variables: {
        token,
        productName,
      },
    })
  })
  // EXAMPLE OF PARSING RESPONSE FOR QUERY "ACCESS RATING BREAKDOWN OF A PRODUCT"
  .then((result) => {
    console.log('');
    console.log('');
    console.log('RESULT', 'EXAMPLE PARSING RESPONSE FOR', 'ACCESS RATING BREAKDOWN OF A PRODUCT', result.data.query.user.products[0].quantitativeAnalysis.ratingDistribution)
  })
  .catch((err) => {
    throw err;
  });



  // EXAMPLE OF A MORE COMPLEX QUERY: "Access rating breakdown of a product"
  // client
  //   .query({
  //     query: gql`query {
  //         user {

  //         }
  //   }`,
  //     variables: {

  //     }
  //   })
  //   .then((result) => {
  //     console.log('RESULT', result.data);
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });
