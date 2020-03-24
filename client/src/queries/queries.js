import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`
  mutation($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      _id
      firstName
      lastName
      userRole {
        role
      }
      token
      tokenExpiration
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $password: String!
    $title: String!
    $companyName: String!
    $companyAddress: String!
    $telephone: Float!
  ) {
    signup(
      userInput: {
        firstName: $firstName
        lastName: $lastName
        userName: $userName
        password: $password
        title: $title
        companyName: $companyName
        companyAddress: $companyAddress
        telephone: $telephone
      }
    ) {
      firstName
    }
  }
`;

export const FORGOT_USER = gql`
  mutation($userName: String!) {
    forgotPassword(userName: $userName) {
      message
      link
    }
  }
`;

export const TOKEN_VERIFICATION = gql`
  query($refreshTokenForPassword: String!) {
    tokenVerification(refreshTokenForPassword: $refreshTokenForPassword) {
      userName
      userId
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation($refreshToken: String!, $userId: ID!, $newPassword: String!) {
    passwordReset(refreshToken: $refreshToken, userId: $userId, newPassword: $newPassword) {
      message
    }
  }
`;

export const GET_USER = gql`
  query {
    users {
      _id
      firstName
      lastName
      userName
      title
      companyName
      companyAddress
      telephone
      userRole {
        role
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation($role: String!) {
    createRole(roleInput: { role: $role }) {
      role
    }
  }
`;

export const GET_ROLE = gql`
  query {
    roles {
      _id
      role
    }
  }
`;

export const USER_DETAIL_ROLE = gql`
  query($id: ID!) {
    userDetail(id: $id) {
      _id
      firstName
      lastName
      userName
      title
      companyName
      companyAddress
      telephone
      userRole {
        role
      }
      createdAt
      updatedAt
      role
    }
  }
`;

export const CREATE_NEW_ROLE = gql`
  mutation(
    $roleCategory: String!
    $role: String!
    $createEntry: Boolean!
    $viewEntry: Boolean!
    $editEntry: Boolean!
    $deleteEntry: Boolean!
    $addMedia: Boolean!
    $replaceMedia: Boolean!
    $deleteMedia: Boolean!
    $checkoutEntry: Boolean!
    $accessOpenJudgingSystem: Boolean!
    $voteOpenJudgingSystem: Boolean!
    $commentOpenJudgingSystem: Boolean!
    $accessVerifiedJudgingSystem: Boolean!
    $voteVerifiedJudgingSystem: Boolean!
    $commentVerifiedJudgingSystem: Boolean!
    $accessAssignedJudgingSystem: Boolean!
    $voteAssignedJudgingSystem: Boolean!
    $commentAssignedJudgingSystem: Boolean!
  ) {
    createNewRole(
      newRoleInput: {
        roleCategory: $roleCategory
        role: $role
        access: {
          entrant: {
            createEntry: $createEntry
            viewEntry: $viewEntry
            editEntry: $editEntry
            deleteEntry: $deleteEntry
            addMedia: $addMedia
            replaceMedia: $replaceMedia
            deleteMedia: $deleteMedia
            checkoutEntry: $checkoutEntry
          }
          juror: {
            accessOpenJudgingSystem: $accessOpenJudgingSystem
            voteOpenJudgingSystem: $voteOpenJudgingSystem
            commentOpenJudgingSystem: $commentOpenJudgingSystem
            accessVerifiedJudgingSystem: $accessVerifiedJudgingSystem
            voteVerifiedJudgingSystem: $voteVerifiedJudgingSystem
            commentVerifiedJudgingSystem: $commentVerifiedJudgingSystem
            accessAssignedJudgingSystem: $accessAssignedJudgingSystem
            voteAssignedJudgingSystem: $voteAssignedJudgingSystem
            commentAssignedJudgingSystem: $commentAssignedJudgingSystem
          }
        }
      }
    ) {
      role
      roleCategory
      access {
        entrant {
          createEntry
          viewEntry
          editEntry
          deleteEntry
          addMedia
          replaceMedia
          deleteMedia
          checkoutEntry
        }
      }
    }
  }
`;
