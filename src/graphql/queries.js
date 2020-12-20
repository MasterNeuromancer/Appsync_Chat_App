/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserData = /* GraphQL */ `
  query GetUserData($name: String!) {
    getUserData(name: $name) {
      _id
      name
      avatar
      createdAt
      updatedAt
    }
  }
`;
export const getUserAndConversationsData = /* GraphQL */ `
  query GetUserData($name: String!) {
    getUserData(name: $name) {
      _id
      name
      avatar
      conversations {
        items {
          id
          conversation {
            id
            name
          }
          conversationLinkUserId
          conversationLinkConversationId
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
export const listUserDatas = /* GraphQL */ `
  query ListUserDatas(
    $name: String
    $filter: ModelUserDataFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserDatas(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        _id
        name
        avatar
        conversations {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      messages (sortDirection: DESC, limit: 100000) {
        items {
          _id
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
          user {
            _id
            name
          }
        }
        nextToken
      }
      associated {
        items {
          id
          conversationLinkUserId
          conversationLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      name
      members
      createdAt
      updatedAt
    }
  }
`;
