/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateConversationLink = /* GraphQL */ `
  subscription OnCreateConversationLink($conversationLinkUserId: ID!) {
    onCreateConversationLink(conversationLinkUserId: $conversationLinkUserId) {
      id
      user {
        id
        username
        screenName
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      conversationLinkUserId
      conversation {
        id
        messages {
          nextToken
        }
        associated {
          nextToken
        }
        name
        members
        createdAt
        updatedAt
      }
      conversationLinkConversationId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($messageConversationId: ID!) {
    onCreateMessage(messageConversationId: $messageConversationId) {
      id
      author {
        id
        username
        screenName
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      authorId
      content
      conversation {
        id
        messages {
          nextToken
        }
        associated {
          nextToken
        }
        name
        members
        createdAt
        updatedAt
      }
      messageConversationId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserData = /* GraphQL */ `
  subscription OnCreateUserData($owner: String!) {
    onCreateUserData(owner: $owner) {
      id
      username
      screenName
      conversations {
        items {
          id
          conversationLinkUserId
          conversationLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          authorId
          content
          messageConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUserData = /* GraphQL */ `
  subscription OnUpdateUserData($owner: String!) {
    onUpdateUserData(owner: $owner) {
      id
      username
      screenName
      conversations {
        items {
          id
          conversationLinkUserId
          conversationLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          authorId
          content
          messageConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUserData = /* GraphQL */ `
  subscription OnDeleteUserData($owner: String!) {
    onDeleteUserData(owner: $owner) {
      id
      username
      screenName
      conversations {
        items {
          id
          conversationLinkUserId
          conversationLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          authorId
          content
          messageConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
