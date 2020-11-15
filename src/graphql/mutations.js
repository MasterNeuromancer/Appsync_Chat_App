/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserData = /* GraphQL */ `
  mutation CreateUserData(
    $input: CreateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    createUserData(input: $input, condition: $condition) {
      _id
      name
      avatar
      createdAt
      updatedAt
    }
  }
`;
export const updateUserData = /* GraphQL */ `
  mutation UpdateUserData(
    $input: UpdateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    updateUserData(input: $input, condition: $condition) {
      _id
      name
      avatar
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
export const deleteUserData = /* GraphQL */ `
  mutation DeleteUserData(
    $input: DeleteUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    deleteUserData(input: $input, condition: $condition) {
      _id
      name
      avatar
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
export const createConversation = /* GraphQL */ `
  mutation CreateConversation(
    $input: CreateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    createConversation(input: $input, condition: $condition) {
      _id
      name
      members
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      _id
      user {
        _id
        name
        avatar
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
      messageConversationId
      createdAt
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      _id
      user {
        _id
        name
        avatar
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
      messageConversationId
      createdAt
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createConversationLink = /* GraphQL */ `
  mutation CreateConversationLink(
    $input: CreateConversationLinkInput!
    $condition: ModelConversationLinkConditionInput
  ) {
    createConversationLink(input: $input, condition: $condition) {
      id
      user {
        _id
        name
        avatar
        createdAt
        updatedAt
      }
      conversationLinkUserId
      conversation {
        _id
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
export const updateConversationLink = /* GraphQL */ `
  mutation UpdateConversationLink(
    $input: UpdateConversationLinkInput!
    $condition: ModelConversationLinkConditionInput
  ) {
    updateConversationLink(input: $input, condition: $condition) {
      id
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
