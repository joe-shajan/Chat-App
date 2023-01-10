import { gql } from "@apollo/client";

const ConversationFields = `
conversations {
  id
  participants {
    user {
      id
      username
    }

    hasSeenLatestMessage
  }
  latestMessage {
    id
    sender {
      id
      username
    }
    body
    createdAt
  }
  updatedAt
}
`;

const operations = {
  //* ---------Queries---------
  Queries: {
    conversations: gql`
      query conversations {
      ${ConversationFields}
      }
    `,
  },

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
