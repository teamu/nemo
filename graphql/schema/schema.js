const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Role {
    role: String!
}

type User {
    _id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    title: String!
    companyName: String!
    companyAddress: String!
    telephone: Float!
    userRole: [Role]
    createdAt: String
    updatedAt: String
    role: [String]
  }

type AuthData {
    _id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    title: String!
    companyName: String!
    companyAddress: String!
    telephone: Int!
    userRole: [Role!]
    createdAt: String!
    updatedAt: String!
    token: String!
    tokenExpiration: Int!
  }

type Item {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    image: String!
    createdAt: String!
    updatedAt: String!
}

type NotificationData {
    message: String!
    link: String!
}

type VerificationData {
    userName: String!
    userId: ID!
}

type PasswordResetData{
    message: String!
}

type RoleUser {
    _id: ID!
    role: String!
}

input UserInput {
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
    title: String!
    companyName: String!
    companyAddress: String!
    telephone: Float!
}

input ItemInput {
    name: String!
    description: String!
    price: Float!
    image: String!
}

input RoleInput {
    role: String!
}

type RootQuery {
    items: [Item!]
    users: [User!]
    tokenVerification(refreshTokenForPassword: String!): VerificationData!
    roles: [RoleUser!],
    userDetail(id: ID!): User
}

type RootMutation {
    login(userName: String!, password: String!): AuthData!
    signup(userInput: UserInput!): User
    createItem(itemInput: ItemInput!): Item
    passwordReset(refreshToken: String!, userId: ID!, newPassword: String!): PasswordResetData!
    forgotPassword(userName: String!): NotificationData!
    createRole(roleInput: RoleInput!): RoleUser
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);
