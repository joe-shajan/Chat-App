import { gql } from "@apollo/client";

const userOperations = {
  //* ---------Queries---------
  Queries: {},

  //* ---------Mutations---------
  Mutations: {
    createUsername: gql`
      mutation createUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },

  //* ---------Subscriptions---------
  Subscriptions: {},
};

export default userOperations;
