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
    deleteConversation: gql`
      mutation DeleteConversation($conversationId: String!) {
        deleteConversation(conversationId: $conversationId)
      }
    `,
    markConversationAsRead: gql`
      mutation MarkConversationAsRead(
        $userId: String!
        $conversationId: String!
      ) {
        markConversationAsRead(userId: $userId, conversationId: $conversationId)
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
    conversationUpdated: gql`
      subscription ConversationUpdated {
        conversationUpdated {
          conversation {
            ${ConversationFields}
          }
        }
      }
    `,
    conversationDeleted: gql`
      subscription ConversationDeleted {
        conversationDeleted {
          id
        }
      }
    `,
  },
};

export default operations;
