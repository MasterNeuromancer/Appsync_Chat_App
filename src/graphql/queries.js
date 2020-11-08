/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserData = /* GraphQL */ `
  query GetUserData($username: String!) {
    getUserData(username: $username) {
      id
      username
      screenName
      createdAt
      updatedAt
    }
  }
`;
export const getUserAndConversationsData = /* GraphQL */ `
  query GetUserData($username: String!) {
    getUserData(username: $username) {
      id
      username
      conversations(limit: 10000) {
        items {
          conversation {
            id
            name
            members
            messages {
              items {
                id
                content
                createdAt
                authorId
              }
            }
          }
        }
      }
      screenName
      createdAt
      updatedAt
    }
  }
`;
export const listUserDatas = /* GraphQL */ `
  query ListUserDatas(
    $filter: ModelUserDataFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserDatas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        username
        screenName
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
      messages(limit: 10000) {
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
      name
      members
      createdAt
      updatedAt
    }
  }
`;
