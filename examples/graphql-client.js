const {GraphqlClient, gql} = require('../');


// CREATE THE CLIENT
const uri = 'http://localhost:3000/graphql';
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const client = new GraphqlClient({
  uri,
  email,
  password,
})

// EXAMPLE OF A SIMPLE QUERY
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

// EXAMPLE LOGIN
client
  .mutate({
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
  })
  .then((result) => {
    console.log('TOKEN', result.data.login.token);
    console.log('USER', result.data.login.user);
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
