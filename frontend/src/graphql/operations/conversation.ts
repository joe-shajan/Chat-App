import { gql } from "@apollo/client";
import { MessageFields } from "./messages";

const ConversationFields = `
      id
      participants {
        user {
          id
          username
        }

        hasSeenLatestMessage
      }
      latestMessage {
        ${MessageFields}
      }
      updatedAt
`;

const operations = {
  //* ---------Queries---------
  Queries: {
    conversations: gql`
      query conversations {
        conversations{
          ${ConversationFields}
        }
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
  Subscriptions: {
    conversationCreated: gql`
    subscription conversationCreated{
      conversationCreated {
        ${ConversationFields}
      }
    }`,
  },
};

export default operations;
