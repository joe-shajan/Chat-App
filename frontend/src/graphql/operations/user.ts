import { gql } from "@apollo/client";

const userOperations = {
  //* ---------Queries---------
  Queries: {
    searchUsers: gql`
      query SearchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          username
        }
      }
    `,
  },

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
