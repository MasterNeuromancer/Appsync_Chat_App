/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateConversationLink = /* GraphQL */ `
  subscription OnCreateConversationLink($conversationLinkUserId: ID!) {
    onCreateConversationLink(conversationLinkUserId: $conversationLinkUserId) {
      _id
      user {
        _id
        name
        avatar
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      conversationLinkUserId
      conversation {
        _id
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
      _id
      user {
        _id
        name
        avatar
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      userId
      text
      image
      video
      audio
      sent
      received
      pending
      conversation {
        _id
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
  subscription OnCreateUserData {
    onCreateUserData {
      _id
      name
      avatar
      conversations {
        items {
          _id
          conversationLinkUserId
          conversationLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          _id
          userId
          text
          image
          video
          audio
          sent
          received
          pending
          messageConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserData = /* GraphQL */ `
  subscription OnUpdateUserData {
    onUpdateUserData {
      _id
      name
      avatar
      conversations {
        items {
          _id
          conversationLinkUserId
          conversationLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          _id
          userId
          text
          image
          video
          audio
          sent
          received
          pending
          messageConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserData = /* GraphQL */ `
  subscription OnDeleteUserData {
    onDeleteUserData {
      _id
      name
      avatar
      conversations {
        items {
          _id
          conversationLinkUserId
          conversationLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          _id
          userId
          text
          image
          video
          audio
          sent
          received
          pending
          messageConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
