import { gql } from "@apollo/client";

const operations = {
  //* ---------Queries---------
  Queries: {},

  //* ---------Mutations---------
  Mutations: {
    createConversation: gql`
      mutation createConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },

  //* ---------Subscriptions---------
  Subscriptions: {},
};

export default operations;
